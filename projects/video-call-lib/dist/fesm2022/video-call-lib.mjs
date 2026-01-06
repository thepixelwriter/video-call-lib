import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { io } from 'socket.io-client';
import { Capacitor } from '@capacitor/core';
import * as i1 from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import * as i2 from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

let SIGNALING_URL = 'http://localhost:3000';
const getSignalingUrl = () => SIGNALING_URL;
const setSignalingUrl = (url) => {
    SIGNALING_URL = url;
    console.log('✓ Signaling URL updated to:', SIGNALING_URL);
};
// Initialize based on platform
const initializeSignalingUrl = () => {
    const platform = Capacitor.getPlatform();
    if (platform === 'android') {
        SIGNALING_URL = 'http://192.168.1.10:3000'; // Android Emulator - update as needed
    }
};
initializeSignalingUrl();
const socket = io(SIGNALING_URL, {
    transports: ['websocket'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5
});
socket.on('connect', () => {
    console.log('✓ Socket connected to server at', SIGNALING_URL);
    console.log('  Socket ID:', socket.id);
});
socket.on('disconnect', () => {
    console.log('✗ Socket disconnected from server');
});
socket.on('connect_error', (error) => {
    console.error('❌ Socket connection error:', error);
});
socket.on('error', (error) => {
    console.error('❌ Socket error:', error);
});

class WebRTCService {
    constructor(http) {
        this.http = http;
        this.currentRoom = '';
        this.isInitialized = false;
        this.remoteVideoElement = null;
    }
    baseUrl() {
        const platform = Capacitor.getPlatform();
        console.log('Platform detected:', platform);
        // For Android emulator
        if (platform === 'android') {
            return 'http://10.0.2.2:3000';
        }
        // For iOS and web
        return 'http://localhost:3000';
    }
    async init(room, localVideo, remoteVideo) {
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
            let iceServers = [];
            try {
                const iceServersResponse = await this.http
                    .get(`${this.baseUrl()}/ice`)
                    .toPromise();
                if (Array.isArray(iceServersResponse)) {
                    iceServers = iceServersResponse;
                }
            }
            catch (err) {
                console.warn('Failed to fetch ICE servers, using empty array:', err);
            }
            const peerConfig = { iceServers };
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
            this.localStream.getTracks().forEach(t => this.pc.addTrack(t, this.localStream));
            this.pc.ontrack = e => {
                console.log('Remote track received:', e.track.kind, 'Track enabled:', e.track.enabled, 'Stream count:', e.streams.length);
                // Add the track to the remote stream instead of replacing the entire stream
                // This ensures we keep both audio and video tracks
                const trackExists = this.remoteStream.getTracks().find(t => t.id === e.track.id);
                if (!trackExists) {
                    this.remoteStream.addTrack(e.track);
                    console.log('Added', e.track.kind, 'track to remote stream. Current tracks:', this.remoteStream.getTracks().map(t => t.kind));
                }
                else {
                    console.log('Track', e.track.id, 'already exists in remote stream');
                }
                if (this.remoteVideoElement) {
                    // Ensure the video element has the stream
                    if (this.remoteVideoElement.srcObject !== this.remoteStream) {
                        this.remoteVideoElement.srcObject = this.remoteStream;
                        console.log('✓ Remote video srcObject updated');
                    }
                    console.log('Remote stream tracks:', this.remoteStream.getTracks().map(t => ({ kind: t.kind, enabled: t.enabled, id: t.id })));
                }
                else {
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
        }
        catch (err) {
            console.error('Error initializing WebRTC:', err);
            throw err;
        }
    }
    setupSocketListeners(room) {
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
            }
            catch (err) {
                console.error('❌ [SIGNALING] Error creating offer:', err);
            }
        });
        socket.on('offer', async (data) => {
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
            }
            catch (err) {
                console.error('❌ [SIGNALING] Error handling offer:', err);
            }
        });
        socket.on('answer', async (data) => {
            console.log('📥 [SIGNALING] Received answer from remote peer');
            try {
                const answer = data.answer || data;
                console.log('📥 [SIGNALING] Setting remote description from answer:', answer.type);
                await this.pc.setRemoteDescription(new RTCSessionDescription(answer));
                console.log('✓ [SIGNALING] Remote description set - Connection should be established');
            }
            catch (err) {
                console.error('❌ [SIGNALING] Error handling answer:', err);
            }
        });
        socket.on('ice', async (data) => {
            try {
                const candidate = data.candidate || data;
                if (candidate) {
                    console.log('🧊 [ICE] Adding ICE candidate');
                    await this.pc.addIceCandidate(new RTCIceCandidate(candidate));
                }
            }
            catch (err) {
                console.error('❌ [ICE] Error adding ice candidate:', err);
            }
        });
    }
    cleanup() {
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
        }
        catch (err) {
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
    toggleAudio(enabled) {
        this.localStream?.getAudioTracks().forEach(t => t.enabled = enabled);
    }
    toggleVideo(enabled) {
        this.localStream?.getVideoTracks().forEach(t => t.enabled = enabled);
    }
    static { this.ɵfac = function WebRTCService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WebRTCService)(i0.ɵɵinject(i1.HttpClient)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: WebRTCService, factory: WebRTCService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WebRTCService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();

class AuthService {
    login() {
        localStorage.setItem('token', 'dummy-token');
    }
    logout() {
        localStorage.removeItem('token');
    }
    isLoggedIn() {
        return !!localStorage.getItem('token');
    }
    static { this.ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();

class CallStateService {
    constructor() {
        this.roomId$ = new BehaviorSubject(null);
    }
    setRoom(id) {
        this.roomId$.next(id);
    }
    getRoom() {
        return this.roomId$.asObservable();
    }
    static { this.ɵfac = function CallStateService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CallStateService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CallStateService, factory: CallStateService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CallStateService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();

class Signaling {
    static { this.ɵfac = function Signaling_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Signaling)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Signaling, factory: Signaling.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Signaling, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();

class AuthGuard {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    canActivate() {
        if (this.auth.isLoggedIn())
            return true;
        this.router.navigate(['/']);
        return false;
    }
    static { this.ɵfac = function AuthGuard_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthGuard)(i0.ɵɵinject(AuthService), i0.ɵɵinject(i2.Router)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthGuard, factory: AuthGuard.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthGuard, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: AuthService }, { type: i2.Router }], null); })();

class VideoCallLibModule {
    static { this.ɵfac = function VideoCallLibModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || VideoCallLibModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: VideoCallLibModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
            WebRTCService,
            CallStateService,
            AuthService,
            Signaling,
            AuthGuard
        ], imports: [CommonModule,
            HttpClientModule,
            IonicModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VideoCallLibModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    HttpClientModule,
                    IonicModule
                ],
                providers: [
                    WebRTCService,
                    CallStateService,
                    AuthService,
                    Signaling,
                    AuthGuard
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(VideoCallLibModule, { imports: [CommonModule,
        HttpClientModule,
        IonicModule] }); })();

/*
 * Public API Surface of video-call-lib
 */
// Services

/**
 * Generated bundle index. Do not edit.
 */

export { AuthGuard, AuthService, CallStateService, Signaling, VideoCallLibModule, WebRTCService, getSignalingUrl, setSignalingUrl, socket };
//# sourceMappingURL=video-call-lib.mjs.map
