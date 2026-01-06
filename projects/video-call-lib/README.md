# Video Call Library (@video-call-lib)

A reusable Angular/Ionic library for WebRTC peer-to-peer video calling functionality. This library provides all the necessary services, guards, and utilities to integrate video calling into any Angular or Ionic application.

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

### Prerequisites

- Angular 20+
- RxJS 7.8+
- Socket.IO Client 4.8+
- Capacitor 8+ (optional, for mobile)

### Install from npm

```bash
npm install @video-call-lib socket.io-client
```

### Install from Local

If developing locally:

```bash
npm install ../path/to/video-call-lib
```

## Usage

### 1. Import the Module

In your app module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { VideoCallLibModule } from '@video-call-lib';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    VideoCallLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 2. Configure Signaling Server

Set the signaling server URL (do this early in your app initialization):

```typescript
import { setSignalingUrl } from '@video-call-lib';

export class AppComponent implements OnInit {
  constructor() {
    // Configure for development
    setSignalingUrl('http://localhost:3000');
    
    // Or for production
    // setSignalingUrl('https://your-signaling-server.com');
  }
}
```

### 3. Use WebRTC Service in a Component

```typescript
import { Component, ViewChild, ElementRef } from '@angular/core';
import { WebRTCService } from '@video-call-lib';

@Component({
  selector: 'app-call',
  template: `
    <div>
      <input [(ngModel)]="roomId" placeholder="Room ID">
      <button (click)="startCall()">Start Call</button>
      <button (click)="endCall()">End Call</button>
      
      <video #localVideo autoplay muted playsinline></video>
      <video #remoteVideo autoplay playsinline></video>
      
      <button (click)="toggleAudio()">Toggle Audio</button>
      <button (click)="toggleVideo()">Toggle Video</button>
      <button (click)="switchCamera()">Switch Camera</button>
    </div>
  `
})
export class CallComponent {
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;

  roomId = 'test-room';

  constructor(private webrtc: WebRTCService) {}

  async startCall() {
    try {
      await this.webrtc.init(
        this.roomId,
        this.localVideo.nativeElement,
        this.remoteVideo.nativeElement
      );
    } catch (error) {
      console.error('Failed to start call:', error);
    }
  }

  endCall() {
    this.webrtc.leave();
  }

  toggleAudio() {
    // Toggle audio mute
  }

  toggleVideo() {
    // Toggle video
  }

  switchCamera() {
    this.webrtc.switchCamera();
  }
}
```

## API Reference

### WebRTCService

#### Methods

```typescript
// Initialize a call
async init(room: string, localVideoElement: HTMLVideoElement, remoteVideoElement: HTMLVideoElement): Promise<void>

// Leave the call
leave(): void

// Switch between front and rear camera
async switchCamera(): Promise<void>

// Pause all tracks
pause(): void

// Resume all tracks
resume(): void

// Toggle audio track
toggleAudio(enabled: boolean): void

// Toggle video track
toggleVideo(enabled: boolean): void
```

### CallStateService

```typescript
// Set the current room ID
setRoom(id: string): void

// Get room ID as observable
getRoom(): Observable<string | null>
```

### AuthService

```typescript
// Login (dummy implementation)
login(): void

// Logout
logout(): void

// Check if logged in
isLoggedIn(): boolean
```

### Socket Functions

```typescript
// Get current signaling URL
getSignalingUrl(): string

// Set signaling server URL
setSignalingUrl(url: string): void

// Socket instance
export const socket: Socket
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

## Configuration for Different Platforms

### Web Development

```typescript
setSignalingUrl('http://localhost:3000');
```

### Android Emulator

```typescript
setSignalingUrl('http://10.0.2.2:3000');
```

### Production

```typescript
setSignalingUrl('https://your-signaling-server.com');
```

### Environment-based Configuration

```typescript
import { environment } from './environments/environment';
import { setSignalingUrl } from '@video-call-lib';

@NgModule({})
export class AppModule {
  constructor() {
    setSignalingUrl(environment.signalingUrl);
  }
}
```

## Running the Signaling Server

The library requires a separate WebRTC signaling server. See [server/README.md](../../server/README.md) for setup instructions.

Quick start:

```bash
cd server
npm install
npm start
```

## Building the Library

### Development Build

```bash
npm run build:lib
```

### Production Build

```bash
npm run build:lib:prod
```

Output will be in `dist/video-call-lib/`.

## Publishing to npm

1. Update version in [package.json](package.json):
   ```json
   {
     "name": "@your-org/video-call-lib",
     "version": "1.0.0"
   }
   ```

2. Build the library:
   ```bash
   npm run build:lib:prod
   ```

3. Navigate to dist folder:
   ```bash
   cd dist/video-call-lib
   ```

4. Publish:
   ```bash
   npm publish --access public
   ```

## Browser Support

- Chrome/Edge 90+
- Firefox 87+
- Safari 14.1+
- Android Chrome 90+
- iOS Safari 14.5+

## Troubleshooting

### Camera/Microphone Not Accessible

Ensure HTTPS is used in production (WebRTC requires secure context):

```typescript
// Check if secure context
if (!window.isSecureContext) {
  console.error('Camera access requires HTTPS');
}
```

### Connection Issues

1. Verify signaling server is running
2. Check that `SIGNALING_URL` is correctly configured
3. Ensure firewall allows WebSocket connections
4. Check browser console for specific errors

### No Remote Video

1. Ensure both peers are in the same room
2. Check ICE server availability
3. Verify peer connection state in console logs
4. Check for CORS issues with ICE server endpoint

## Example Project

See the demo application in [src/](../../src) for a complete working example.

## Contributing

Contributions welcome! Please ensure:
- TypeScript strict mode compliance
- TSLint passes
- Tests are written
- Documentation is updated

## License

MIT

## Support

For issues, questions, or feature requests, please open an issue on GitHub.
