# Video Call Library

A reusable Angular/Ionic library for WebRTC peer-to-peer video calling functionality. This library provides all the necessary services and utilities to integrate video calling into any Angular or Ionic application.

## Features

- ✅ **WebRTC Services** - Complete peer connection management
- ✅ **Socket.IO Signaling** - Real-time signaling for connection negotiation
- ✅ **Call State Management** - Observable-based call state tracking
- ✅ **Authentication Guard** - Route protection for authenticated calls
- ✅ **Multi-platform** - Works on Web, iOS, and Android (via Capacitor)
- ✅ **Camera Switching** - Support for front/rear camera switching
- ✅ **Audio/Video Controls** - Toggle audio/video tracks
- ✅ **ICE Servers** - Automatic ICE server configuration

## Installation

```bash
npm install video-call-lib socket.io-client
```

## Quick Start

### 1. Import the Module

```typescript
import { NgModule } from '@angular/core';
import { VideoCallLibModule } from 'video-call-lib';

@NgModule({
  imports: [VideoCallLibModule]
})
export class AppModule { }
```

### 2. Configure Signaling Server

```typescript
import { setSignalingUrl } from 'video-call-lib';

// In your app initialization (app.component.ts or main.ts)
setSignalingUrl('http://localhost:3000');

// For production
// setSignalingUrl('https://your-signaling-server.com');
```

### 3. Use WebRTC Service

```typescript
import { Component, ViewChild, ElementRef } from '@angular/core';
import { WebRTCService } from 'video-call-lib';

@Component({
  selector: 'app-call',
  template: `
    <div>
      <input [(ngModel)]="roomId" placeholder="Room ID">
      <button (click)="startCall()">Start Call</button>
      <button (click)="endCall()">End Call</button>
      
      <video #localVideo autoplay muted playsinline></video>
      <video #remoteVideo autoplay playsinline></video>
    </div>
  `
})
export class CallComponent {
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;

  roomId = 'test-room';

  constructor(private webrtc: WebRTCService) {}

  async startCall() {
    await this.webrtc.init(
      this.roomId,
      this.localVideo.nativeElement,
      this.remoteVideo.nativeElement
    );
  }

  endCall() {
    this.webrtc.leave();
  }
}
```

## API Reference

### WebRTCService

```typescript
// Initialize a call
async init(room: string, localVideoElement: HTMLVideoElement, remoteVideoElement: HTMLVideoElement): Promise<void>

// Leave the call
leave(): void

// Switch between front and rear camera
async switchCamera(): Promise<void>

// Toggle audio track
toggleAudio(enabled: boolean): void

// Toggle video track
toggleVideo(enabled: boolean): void

// Pause all tracks
pause(): void

// Resume all tracks
resume(): void
```

### CallStateService

```typescript
// Set the current room ID
setRoom(id: string): void

// Get room ID as observable
getRoom(): Observable<string | null>
```

### AuthGuard

Protect routes that require authentication:

```typescript
const routes: Routes = [
  {
    path: 'call',
    component: CallComponent,
    canActivate: [AuthGuard]
  }
];
```

## Signaling Server

The library requires a WebRTC signaling server for connection negotiation.

### Quick Start

```bash
# Start the signaling server
node server.js

# Server runs on http://localhost:3000
```

### Server Configuration

Configure your signaling server URL based on your environment:

```typescript
// Development
setSignalingUrl('http://localhost:3000');

// Android Emulator
setSignalingUrl('http://10.0.2.2:3000');

// Production
setSignalingUrl('https://your-signaling-server.com');
```

### Environment-based Configuration

```typescript
import { environment } from './environments/environment';
import { setSignalingUrl } from 'video-call-lib';

@NgModule({})
export class AppModule {
  constructor() {
    setSignalingUrl(environment.signalingUrl);
  }
}
```

## Browser Support

- Chrome/Edge 90+
- Firefox 87+
- Safari 14.1+
- Android Chrome 90+
- iOS Safari 14.5+

## Requirements

- Angular 20+
- RxJS 7.8+
- Socket.IO Client 4.8+
- Capacitor 8+ (optional, for mobile)

## License

MIT
