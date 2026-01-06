# Quick Reference: Video Call Library

## 📦 Build & Publish

```bash
# Build for development
npm run build:lib

# Build for production
npm run build:lib:prod

# Output location
projects/video-call-lib/dist/
```

## 🚀 Install in Your App

### From local build:
```bash
npm install ../path/to/dist/video-call-lib
```

### From npm (after publishing):
```bash
npm install @your-org/video-call-lib
```

## 💻 Usage (Basic)

```typescript
// 1. Import module
import { VideoCallLibModule, setSignalingUrl, WebRTCService } from '@video-call-lib';

@NgModule({
  imports: [VideoCallLibModule, HttpClientModule]
})
export class AppModule {
  constructor() {
    // 2. Set server URL
    setSignalingUrl('http://localhost:3000');
  }
}

// 3. Use in component
@Component({...})
export class CallComponent {
  constructor(private webrtc: WebRTCService) {}

  async startCall() {
    // Get video elements
    const localVid = this.localVideoRef.nativeElement;
    const remoteVid = this.remoteVideoRef.nativeElement;
    
    // Initialize call
    await this.webrtc.init('room-id', localVid, remoteVid);
  }

  endCall() {
    this.webrtc.leave();
  }

  toggleAudio() {
    this.webrtc.toggleAudio(true);
  }

  toggleVideo() {
    this.webrtc.toggleVideo(true);
  }

  async switchCamera() {
    await this.webrtc.switchCamera();
  }
}
```

## 🔌 Socket Configuration

```typescript
import { setSignalingUrl } from '@video-call-lib';

// Web
setSignalingUrl('http://localhost:3000');

// Production
setSignalingUrl('https://your-server.com');

// Android Emulator
setSignalingUrl('http://10.0.2.2:3000');

// iOS Emulator
setSignalingUrl('http://192.168.1.10:3000');
```

## 🔐 Route Protection

```typescript
import { AuthGuard } from '@video-call-lib';

const routes: Routes = [
  {
    path: 'call',
    component: CallComponent,
    canActivate: [AuthGuard]
  }
];
```

## 🎯 Services Available

| Service | Purpose |
|---------|---------|
| `WebRTCService` | Peer connections, media streams |
| `AuthService` | Login/logout, token management |
| `CallStateService` | Observable call state |
| `socket` | Socket.IO instance |

## 📱 HTML Template

```html
<!-- Input room ID -->
<input [(ngModel)]="roomId" placeholder="Room ID">

<!-- Start/End call -->
<button (click)="startCall()" [disabled]="inCall">Start</button>
<button (click)="endCall()" [disabled]="!inCall">End</button>

<!-- Video elements -->
<video #localVideo autoplay muted playsinline></video>
<video #remoteVideo autoplay playsinline></video>

<!-- Controls -->
<button (click)="toggleAudio()">🔊 Audio</button>
<button (click)="toggleVideo()">📹 Video</button>
<button (click)="switchCamera()">🔄 Switch</button>
```

## 🧪 Test Locally

```bash
# Terminal 1: Start signaling server
cd server
npm start

# Terminal 2: Start demo app
npm start

# Open http://localhost:4200 in two browser tabs
# Enter same room ID in both
# Click "Start Call"
```

## 📚 Documentation

- **[projects/video-call-lib/README.md](projects/video-call-lib/README.md)** - Full API docs
- **[INTEGRATION.md](INTEGRATION.md)** - Integration guide
- **[LIBRARY_CONVERSION.md](LIBRARY_CONVERSION.md)** - Conversion overview
- **[server/README.md](server/README.md)** - Server setup
- **[SETUP.md](SETUP.md)** - Project setup

## 🔍 Troubleshooting

**Library not building:**
```bash
npm install ng-packagr --save-dev --legacy-peer-deps
npm run build:lib
```

**Camera not accessible:**
- Use HTTPS in production
- Check browser permissions
- Try `http://localhost:3000` not `127.0.0.1`

**Socket connection failed:**
- Verify server running: `cd server && npm start`
- Check `setSignalingUrl()` called correctly
- Check firewall/port access

**Import errors:**
```bash
npm install socket.io-client @capacitor/core
npm install @angular/common @angular/router
```

## 📦 Publishing Checklist

- [ ] Update package.json version
- [ ] Run `npm run build:lib:prod`
- [ ] Test in another project: `npm install ../dist/video-call-lib`
- [ ] Create npm account
- [ ] Login: `npm login`
- [ ] Publish: `npm publish --access public` (in dist folder)
- [ ] Verify: `npm search @your-org/video-call-lib`

## 🎁 What You Get

✅ Reusable Angular/Ionic library
✅ WebRTC video calling functionality
✅ Socket.IO signaling
✅ Authentication guards
✅ Built-in type definitions
✅ Comprehensive documentation
✅ Ready for npm publishing
✅ Multi-platform support (Web, iOS, Android)

---

**Created:** January 6, 2026
**Status:** Ready for Use ✅
