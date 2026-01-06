import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { socket } from './socket.service';
import { Capacitor } from '@capacitor/core';

@Injectable({ providedIn: 'root' })
export class WebRTCService {

  private pc!: RTCPeerConnection;
  private localStream!: MediaStream;
  private remoteStream!: MediaStream;
  private currentRoom: string = '';
  private isInitialized = false;
  private remoteVideoElement: HTMLVideoElement | null = null;

  constructor(private http: HttpClient) {}

  private baseUrl() {
    const platform = Capacitor.getPlatform();
    console.log('Platform detected:', platform);
    
    // For Android emulator
    if (platform === 'android') {
      return 'http://10.0.2.2:3000';
    }
    // For iOS and web
    return 'http://localhost:3000';
  }

  async init(room: string, localVideo: HTMLVideoElement, remoteVideo: HTMLVideoElement) {
    try {
      // Prevent re-initialization and remove old listeners
      if (this.isInitialized) {
        console.log('Already initialized, cleaning up...');
        this.cleanup();
      }

      this.currentRoom = room;
      this.remoteVideoElement = remoteVideo;
      this.remoteStream = new MediaStream();
      console.log('Initializing WebRTC for room:', room);

      let iceServers: RTCIceServer[] = [];
      
      try {
        const iceServersResponse = await this.http
          .get<RTCIceServer[]>(`${this.baseUrl()}/ice`)
          .toPromise();
        
        if (Array.isArray(iceServersResponse)) {
          iceServers = iceServersResponse;
        }
      } catch (err) {
        console.warn('Failed to fetch ICE servers, using empty array:', err);
      }

      const peerConfig: RTCConfiguration = { iceServers };
      this.pc = new RTCPeerConnection(peerConfig);

      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: true
      }).catch(err => {
        console.error('Error getting media devices:', err.message);
        throw new Error('Failed to access camera/microphone: ' + err.message);
      });

      console.log('Local stream obtained:', this.localStream.getTracks().map(t => t.kind));
      localVideo.srcObject = this.localStream;

      this.localStream.getTracks().forEach(t =>
        this.pc.addTrack(t, this.localStream)
      );

      this.pc.ontrack = e => {
        console.log('Remote track received:', e.track.kind, 'Track enabled:', e.track.enabled, 'Stream count:', e.streams.length);
        
        // Add the track to the remote stream instead of replacing the entire stream
        // This ensures we keep both audio and video tracks
        const trackExists = this.remoteStream.getTracks().find(t => t.id === e.track.id);
        if (!trackExists) {
          this.remoteStream.addTrack(e.track);
          console.log('Added', e.track.kind, 'track to remote stream. Current tracks:', this.remoteStream.getTracks().map(t => t.kind));
        } else {
          console.log('Track', e.track.id, 'already exists in remote stream');
        }
        
        if (this.remoteVideoElement) {
          // Ensure the video element has the stream
          if (this.remoteVideoElement.srcObject !== this.remoteStream) {
            this.remoteVideoElement.srcObject = this.remoteStream;
            console.log('✓ Remote video srcObject updated');
          }
          console.log('Remote stream tracks:', this.remoteStream.getTracks().map(t => ({ kind: t.kind, enabled: t.enabled, id: t.id })));
        } else {
          console.warn('⚠️ Remote video element not available');
        }
      };

      this.pc.onconnectionstatechange = () => {
        console.log('Peer connection state:', this.pc.connectionState);
        if (this.pc.connectionState === 'failed') {
          console.error('Peer connection failed');
        }
        if (this.pc.connectionState === 'connected') {
          console.log('Peer connection established');
        }
      };

      this.pc.oniceconnectionstatechange = () => {
        console.log('ICE connection state:', this.pc.iceConnectionState);
      };

      this.pc.onicegatheringstatechange = () => {
        console.log('ICE gathering state:', this.pc.iceGatheringState);
      };

      this.pc.onicecandidate = e => {
        if (e.candidate) {
          console.log('Sending ICE candidate');
          socket.emit('ice', { room, candidate: e.candidate });
        }
      };

      // Register socket listeners only once
      this.setupSocketListeners(room);

      console.log('Joining room:', room);
      console.log('📍 Make sure you have 2 peers in the same room for video to work!');
      socket.emit('join', { room });
      
      this.isInitialized = true;
    } catch (err) {
      console.error('Error initializing WebRTC:', err);
      throw err;
    }
  }

  private setupSocketListeners(room: string) {
    // Remove old listeners first
    socket.off('peer-joined');
    socket.off('offer');
    socket.off('answer');
    socket.off('ice');

    socket.on('peer-joined', async () => {
      console.log('🔔 [SIGNALING] Peer joined the room, creating offer...');
      try {
        const offer = await this.pc.createOffer();
        console.log('📤 [SIGNALING] Offer created:', offer.type);
        await this.pc.setLocalDescription(offer);
        console.log('✓ [SIGNALING] Local description set, sending offer');
        socket.emit('offer', { room, offer });
      } catch (err) {
        console.error('❌ [SIGNALING] Error creating offer:', err);
      }
    });

    socket.on('offer', async (data: any) => {
      console.log('📥 [SIGNALING] Received offer from remote peer');
      try {
        const offer = data.offer || data;
        console.log('📥 [SIGNALING] Setting remote description for offer');
        await this.pc.setRemoteDescription(new RTCSessionDescription(offer));
        console.log('✓ [SIGNALING] Remote description set, creating answer...');
        const answer = await this.pc.createAnswer();
        console.log('📤 [SIGNALING] Answer created:', answer.type);
        await this.pc.setLocalDescription(answer);
        console.log('✓ [SIGNALING] Local description set, sending answer');
        socket.emit('answer', { room, answer });
      } catch (err) {
        console.error('❌ [SIGNALING] Error handling offer:', err);
      }
    });

    socket.on('answer', async (data: any) => {
      console.log('📥 [SIGNALING] Received answer from remote peer');
      try {
        const answer = data.answer || data;
        console.log('📥 [SIGNALING] Setting remote description from answer:', answer.type);
        await this.pc.setRemoteDescription(new RTCSessionDescription(answer));
        console.log('✓ [SIGNALING] Remote description set - Connection should be established');
      } catch (err) {
        console.error('❌ [SIGNALING] Error handling answer:', err);
      }
    });

    socket.on('ice', async (data: any) => {
      try {
        const candidate = data.candidate || data;
        if (candidate) {
          console.log('🧊 [ICE] Adding ICE candidate');
          await this.pc.addIceCandidate(new RTCIceCandidate(candidate));
        }
      } catch (err) {
        console.error('❌ [ICE] Error adding ice candidate:', err);
      }
    });
  }

  private cleanup() {
    socket.off('peer-joined');
    socket.off('offer');
    socket.off('answer');
    socket.off('ice');
  }

  async switchCamera() {
    if (!this.localStream) {
      console.warn('Local stream not available');
      return;
    }

    try {
      const videoTracks = this.localStream.getVideoTracks();
      if (videoTracks.length === 0) {
        console.warn('No video tracks available');
        return;
      }

      const videoTrack = videoTracks[0];
      const settings = videoTrack.getSettings();
      const newFacing = settings.facingMode === 'user' ? 'environment' : 'user';

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: newFacing },
        audio: true
      });

      const newTrack = stream.getVideoTracks()[0];
      const sender = this.pc.getSenders().find(s => s.track?.kind === 'video');
      
      if (sender) {
        await sender.replaceTrack(newTrack);
      }

      videoTrack.stop();
      this.localStream.removeTrack(videoTrack);
      this.localStream.addTrack(newTrack);
    } catch (err) {
      console.error('Error switching camera:', err);
    }
  }

  leave() {
    console.log('Leaving call...');
    this.cleanup();
    this.isInitialized = false;
    this.localStream?.getTracks().forEach(t => t.stop());
    this.pc?.close();
    socket.emit('leave', { room: this.currentRoom });
  }

  pause() {
    this.localStream?.getTracks().forEach(t => t.enabled = false);
  }

  resume() {
    this.localStream?.getTracks().forEach(t => t.enabled = true);
  }

  toggleAudio(enabled: boolean) {
    this.localStream?.getAudioTracks().forEach(t => t.enabled = enabled);
  }

  toggleVideo(enabled: boolean) {
    this.localStream?.getVideoTracks().forEach(t => t.enabled = enabled);
  }
}
