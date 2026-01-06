import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { WebRTCService } from 'src/app/services/webrtc';
import { Router, ActivatedRoute } from '@angular/router';
import { CallStateService } from 'src/app/services/call-state';

@Component({
  selector: 'app-call',
  templateUrl: './call.page.html',
  styleUrls: ['./call.page.scss'],
  standalone: false
})
export class CallPage implements OnInit, OnDestroy {

  @ViewChild('local', { static: true }) local!: ElementRef<HTMLVideoElement>;
  @ViewChild('remote', { static: true }) remote!: ElementRef<HTMLVideoElement>;
  @ViewChild('localVideoWrapper') localVideoWrapper!: ElementRef<HTMLDivElement>;

  isMuted = false;
  isSpeakerOn = true;
  isVideoCameraOn = true;
  callDuration = '00:00';
  private callStartTime = 0;
  private durationInterval: any;
  remoteUserName = 'Incoming Call';
  roomId: string = '';
  private isDragging = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private videoStartX = 0;
  private videoStartY = 0;

  constructor(
    private rtc: WebRTCService, 
    private router: Router,
    private route: ActivatedRoute,
    private callState: CallStateService
  ) {}

  ngOnInit() {
    // Get room ID from route params or call state
    this.route.params.subscribe(params => {
      this.roomId = params['roomId'] || '';
      if (!this.roomId) {
        this.callState.getRoom().subscribe(room => {
          this.roomId = room || 'Unknown Room';
          this.initializeCall();
        });
      } else {
        this.initializeCall();
      }
    });
  }

  private initializeCall() {
    console.log('Initializing call for room:', this.roomId);
    this.requestPermissions().then(() => {
      this.rtc.init(this.roomId, this.local.nativeElement, this.remote.nativeElement);
      this.startCallTimer();
      setTimeout(() => this.setupLocalVideoDrag(), 100);
    }).catch(err => {
      console.error('Error initializing call:', err);
      alert('Failed to initialize call. Please ensure camera/microphone permissions are enabled.');
    });
  }

  private async requestPermissions() {
    try {
      // Browser automatically prompts for permissions when getUserMedia is called
      // For native (Android/iOS), permissions are handled by the app manifest
      console.log('Permissions will be requested by getUserMedia');
      return Promise.resolve();
    } catch (error) {
      console.warn('Error with permissions:', error);
      return Promise.reject(error);
    }
  }

  private setupLocalVideoDrag() {
    if (!this.localVideoWrapper) return;
    const element = this.localVideoWrapper.nativeElement;
    
    element.addEventListener('mousedown', (e: MouseEvent) => this.onDragStart(e));
    document.addEventListener('mousemove', (e: MouseEvent) => this.onDrag(e));
    document.addEventListener('mouseup', () => this.onDragEnd());
    
    // Touch support with passive: false for touchstart (allows preventDefault)
    element.addEventListener('touchstart', (e: TouchEvent) => this.onDragStartTouch(e), { passive: false });
    document.addEventListener('touchmove', (e: TouchEvent) => this.onDragTouch(e), { passive: false });
    document.addEventListener('touchend', () => this.onDragEnd());
  }

  private onDragStart(e: MouseEvent) {
    this.isDragging = true;
    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;
    const element = this.localVideoWrapper.nativeElement;
    this.videoStartX = element.offsetLeft;
    this.videoStartY = element.offsetTop;
  }

  private onDragStartTouch(e: TouchEvent) {
    this.isDragging = true;
    this.dragStartX = e.touches[0].clientX;
    this.dragStartY = e.touches[0].clientY;
    const element = this.localVideoWrapper.nativeElement;
    this.videoStartX = element.offsetLeft;
    this.videoStartY = element.offsetTop;
  }

  private onDrag(e: MouseEvent) {
    if (!this.isDragging) return;
    e.preventDefault();
    this.updateVideoPosition(e.clientX, e.clientY);
  }

  private onDragTouch(e: TouchEvent) {
    if (!this.isDragging) return;
    e.preventDefault();
    this.updateVideoPosition(e.touches[0].clientX, e.touches[0].clientY);
  }

  private updateVideoPosition(clientX: number, clientY: number) {
    const element = this.localVideoWrapper.nativeElement;
    const deltaX = clientX - this.dragStartX;
    const deltaY = clientY - this.dragStartY;
    
    const newX = this.videoStartX + deltaX;
    const newY = this.videoStartY + deltaY;
    
    element.style.left = newX + 'px';
    element.style.top = newY + 'px';
  }

  private onDragEnd() {
    this.isDragging = false;
  }

  private startCallTimer() {
    this.callStartTime = Date.now();
    this.durationInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.callStartTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      this.callDuration = `${this.pad(minutes)}:${this.pad(seconds)}`;
    }, 1000);
  }

  private pad(num: number): string {
    return num.toString().padStart(2, '0');
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.rtc.toggleAudio(!this.isMuted);
  }

  toggleSpeaker() {
    this.isSpeakerOn = !this.isSpeakerOn;
  }

  toggleVideoCamera() {
    this.isVideoCameraOn = !this.isVideoCameraOn;
    this.rtc.toggleVideo(this.isVideoCameraOn);
  }

  switchCamera() {
    this.rtc.switchCamera();
  }

  leave() {
    clearInterval(this.durationInterval);
    this.rtc.leave();
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    if (this.durationInterval) {
      clearInterval(this.durationInterval);
    }
  }
}
