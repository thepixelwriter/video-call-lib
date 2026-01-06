# Integrating Video Call Library

This guide shows how to integrate the `@video-call-lib` package into an existing Angular or Ionic application.

## Prerequisites

- Angular 20+
- Node.js 18+
- npm or yarn

## Installation Steps

### 1. Install the Library

From npm registry:
```bash
npm install @your-org/video-call-lib socket.io-client
```

Or from local build:
```bash
npm install ../path/to/video-call-lib/dist/video-call-lib
```

### 2. Import the Module

In your main app module (`app.module.ts`):

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { VideoCallLibModule, setSignalingUrl } from '@video-call-lib';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    VideoCallLibModule  // ← Add this
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Configure the signaling server URL
    setSignalingUrl('http://localhost:3000');
  }
}
```

### 3. Protect Routes with AuthGuard

In your routing module:

```typescript
import { Routes } from '@angular/router';
import { AuthGuard } from '@video-call-lib';
import { CallComponent } from './pages/call/call.component';

const routes: Routes = [
  // Public routes
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  
  // Protected routes
  {
    path: 'call',
    component: CallComponent,
    canActivate: [AuthGuard]
  },
  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### 4. Create a Call Component

```typescript
import { Component, ViewChild, ElementRef } from '@angular/core';
import { WebRTCService } from '@video-call-lib';

@Component({
  selector: 'app-call',
  template: `
    <div class="call-container">
      <div class="room-input">
        <input 
          [(ngModel)]="roomId" 
          placeholder="Enter room ID"
          [disabled]="isInCall"
        >
        <button (click)="startCall()" [disabled]="isInCall">Start Call</button>
        <button (click)="endCall()" [disabled]="!isInCall">End Call</button>
      </div>

      <div class="videos">
        <div class="local-video">
          <video 
            #localVideo 
            autoplay 
            muted 
            playsinline
          ></video>
          <span>You</span>
        </div>
        <div class="remote-video">
          <video 
            #remoteVideo 
            autoplay 
            playsinline
          ></video>
          <span>Peer</span>
        </div>
      </div>

      <div class="controls">
        <button (click)="toggleAudio()" [class.active]="audioEnabled">
          {{ audioEnabled ? '🔊 Audio On' : '🔇 Audio Off' }}
        </button>
        <button (click)="toggleVideo()" [class.active]="videoEnabled">
          {{ videoEnabled ? '📹 Video On' : '📹 Video Off' }}
        </button>
        <button (click)="switchCamera()">🔄 Switch Camera</button>
      </div>

      <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
  `,
  styles: [`
    .call-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      padding: 20px;
    }

    .room-input {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .room-input input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .room-input button {
      padding: 10px 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .room-input button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .videos {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      flex: 1;
      margin-bottom: 20px;
    }

    .local-video, .remote-video {
      position: relative;
      background: #000;
      border-radius: 8px;
      overflow: hidden;
    }

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .local-video span, .remote-video span {
      position: absolute;
      bottom: 10px;
      left: 10px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
    }

    .controls {
      display: flex;
      gap: 10px;
      justify-content: center;
    }

    .controls button {
      padding: 10px 20px;
      background: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .controls button.active {
      background: #28a745;
    }

    .error {
      color: red;
      padding: 10px;
      background: #ffe6e6;
      border-radius: 4px;
      margin-top: 10px;
    }
  `]
})
export class CallComponent {
  @ViewChild('localVideo') localVideoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideoRef!: ElementRef<HTMLVideoElement>;

  roomId = '';
  isInCall = false;
  audioEnabled = true;
  videoEnabled = true;
  errorMessage = '';

  constructor(private webrtc: WebRTCService) {}

  async startCall() {
    if (!this.roomId.trim()) {
      this.errorMessage = 'Please enter a room ID';
      return;
    }

    try {
      this.errorMessage = '';
      await this.webrtc.init(
        this.roomId,
        this.localVideoRef.nativeElement,
        this.remoteVideoRef.nativeElement
      );
      this.isInCall = true;
    } catch (error: any) {
      this.errorMessage = error.message || 'Failed to start call';
      console.error('Call error:', error);
    }
  }

  endCall() {
    this.webrtc.leave();
    this.isInCall = false;
    this.audioEnabled = true;
    this.videoEnabled = true;
  }

  toggleAudio() {
    this.audioEnabled = !this.audioEnabled;
    this.webrtc.toggleAudio(this.audioEnabled);
  }

  toggleVideo() {
    this.videoEnabled = !this.videoEnabled;
    this.webrtc.toggleVideo(this.videoEnabled);
  }

  switchCamera() {
    this.webrtc.switchCamera();
  }
}
```

### 5. Create Authentication

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@video-call-lib';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <h1>Login</h1>
      <button (click)="login()">Login with Demo Account</button>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    button {
      padding: 12px 24px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
  `]
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.auth.login();
    this.router.navigate(['/call']);
  }
}
```

## Environment Configuration

Create `environment.ts` files:

```typescript
// environment.ts (development)
export const environment = {
  production: false,
  signalingUrl: 'http://localhost:3000'
};

// environment.prod.ts (production)
export const environment = {
  production: true,
  signalingUrl: 'https://your-signaling-server.com'
};
```

Then in `app.module.ts`:

```typescript
import { environment } from './environments/environment';
import { setSignalingUrl } from '@video-call-lib';

@NgModule({...})
export class AppModule {
  constructor() {
    setSignalingUrl(environment.signalingUrl);
  }
}
```

## Mobile (Ionic/Capacitor)

For Capacitor/Ionic apps, the library automatically detects the platform:

```typescript
// Android Emulator
setSignalingUrl('http://10.0.2.2:3000');

// iOS
setSignalingUrl('http://192.168.1.10:3000');

// Production
setSignalingUrl('https://your-signaling-server.com');
```

## Troubleshooting

### Library not found
```bash
npm install @your-org/video-call-lib
npm install socket.io-client
```

### Module errors
Ensure `HttpClientModule` is imported in your app module.

### Camera access denied
- HTTPS required in production
- Check permissions on mobile devices
- User must grant camera/microphone access

### Connection refused
- Verify signaling server is running
- Check correct `signalingUrl` is set
- Firewall may be blocking WebSocket

## Best Practices

1. **Always import HttpClientModule** before VideoCallLibModule
2. **Set signaling URL early** in app initialization
3. **Handle errors gracefully** with try-catch blocks
4. **Stop tracks** when leaving calls to free resources
5. **Use environment-based URLs** for different deployments
6. **Add loading states** during connection initialization
7. **Test on actual devices** for mobile apps

## Next Steps

- Check [projects/video-call-lib/README.md](./projects/video-call-lib/README.md) for API reference
- Review demo app in [src/](./src/) for complete example
- Set up signaling server from [server/README.md](./server/README.md)
- Customize components and styling for your use case
