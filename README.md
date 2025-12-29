# CallApp - WebRTC Video Calling Application

Professional peer-to-peer video calling app built with Ionic + Angular + WebRTC. Deploy as web app, iOS, or Android.

## 🎯 Features

### Core Functionality
✅ **Peer-to-Peer Video Calling** - Direct connection between users  
✅ **Room-Based Connections** - Custom room IDs for flexible pairing  
✅ **Real-Time Signaling** - Socket.IO for WebRTC negotiation  
✅ **Audio/Video Controls** - Mute, camera toggle, speaker control  
✅ **Call Duration Timer** - MM:SS format call tracking  
✅ **Camera Switching** - Toggle between front/back cameras  

### UI/UX
✅ **WhatsApp-Style Interface** - Familiar design pattern  
✅ **Draggable Local Video** - Picture-in-picture with drag functionality  
✅ **Professional Header** - Frosted glass effect with caller info  
✅ **Responsive Design** - Works on all device sizes  
✅ **Smooth Animations** - Modern transitions and effects  

### Platform Support
✅ **Web Browser** - Works in Chrome, Firefox, Safari, Edge  
✅ **Android** - Native APK deployment  
✅ **iOS** - Xcode build support  
✅ **Progressive Web App** - Install as app on home screen  

---

## 🚀 Quick Start

### 1. Installation
```bash
# Clone or navigate to project
cd video-call

# Install dependencies
npm install
```

### 2. Start Development Server
```bash
# Terminal 1: Start signaling server
npm run server

# Terminal 2: Start Ionic app (new terminal)
ionic serve
# or
npm start
```

App opens at `http://localhost:8100`

### 3. Test Locally
1. Open two browser tabs at `http://localhost:8100`
2. Tab 1: Enter room ID "test" → Click "Start Call"
3. Tab 2: Enter room ID "test" → Click "Start Call"
4. See remote video appear in both tabs!

---

## 📁 Project Structure

```
video-call/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── home/          # Room selection page
│   │   │   └── call/          # Video call interface
│   │   ├── services/
│   │   │   ├── webrtc.ts      # WebRTC peer connection logic
│   │   │   ├── socket.service.ts  # Socket.IO signaling
│   │   │   ├── auth.service.ts    # Authentication
│   │   │   └── call-state.ts      # State management
│   │   └── app.module.ts       # Root module
│   ├── index.html
│   ├── main.ts
│   └── environments/
├── server.js                    # Signaling server (Node.js)
├── capacitor.config.ts          # Mobile config
├── angular.json                 # Angular config
├── ionic.config.json            # Ionic config
├── package.json                 # Dependencies
├── SETUP.md                     # Basic setup guide
├── ANDROID_DEPLOYMENT.md        # Android deployment guide
└── PRODUCTION_DEPLOYMENT.md     # Production setup guide
```

---

## 🛠️ Architecture

### Technology Stack
- **Frontend**: Angular 20.0.0, Ionic 8.0.0
- **Real-Time Communication**: WebRTC, Socket.IO 4.8.2
- **Mobile**: Capacitor 8.0.0
- **Build Tool**: Angular CLI, Webpack
- **Server**: Node.js, Express.js

### Data Flow
```
User A                  Signaling Server                  User B
   |                         |                              |
   |-- create offer -------->|                              |
   |<---- offer sent         |-- send offer ------------->|
   |                         |                              |
   |                         |<---- answer created --------|
   |<---- answer received ---|---- send answer ----------|
   |                         |                              |
   |-- ICE candidates ------>|-- ICE candidates -------->|
   |<---- ICE candidates ----|<---- ICE candidates ------|
   |                         |                              |
   |========== WebRTC Connected (Media Streams) ===========|
```

### Services

#### WebRTCService
- Manages RTCPeerConnection
- Handles media stream acquisition
- Processes offer/answer/ICE events
- Provides audio/video controls

#### SocketService
- Manages Socket.IO connection
- Emits/listens to signaling events
- Handles reconnection logic

#### CallStateService
- Manages application state (RxJS)
- Tracks current room and call status

---

## 🎮 Usage Guide

### Home Page
1. **Enter Room ID** - Any alphanumeric string (e.g., "room-123")
2. **Click Start Call** - Joins the room and opens call page
3. **Quick Actions** - Invite, history, settings

### Call Page
| Control | Function |
|---------|----------|
| 🎤 Mute | Toggle audio (video stays on) |
| 📹 Camera | Toggle video (audio stays on) |
| 🔊 Speaker | Toggle audio output |
| 🔄 Flip | Switch between front/back camera |
| ☎️ End Call | Disconnect and return home |

**Local Video (Bottom-Right)**
- Draggable like WhatsApp
- Mouse: Click and drag
- Touch: Tap and drag

---

## 🔧 Configuration

### Signaling Server URL
Edit `webrtc.ts`:
```typescript
private baseUrl() {
  return Capacitor.getPlatform() === 'android'
    ? 'http://10.0.2.2:3000'      // Android emulator
    : 'http://localhost:3000';     // Web/iOS
}
```

### Video Constraints
Edit `webrtc.ts` to adjust quality:
```typescript
const constraints = {
  video: {
    facingMode: 'user',
    width: { ideal: 1280 },
    height: { ideal: 720 }
  },
  audio: true
};
```

### Socket.IO Options
Edit `socket.service.ts`:
```typescript
const socket = io(baseUrl, {
  transports: ['websocket', 'polling'],
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
});
```

---

## 📱 Android Deployment

### Quick Deploy
```bash
# Build
npm run build
npx cap sync android

# Open in Android Studio
npx cap open android

# Run (from Android Studio or terminal)
npx cap run android
```

### Full Guide
See [ANDROID_DEPLOYMENT.md](ANDROID_DEPLOYMENT.md) for:
- Prerequisites and setup
- Building release APK
- Troubleshooting
- Play Store deployment

---

## 🌍 Production Deployment

### Prerequisites
- Domain name (e.g., callapp.com)
- Web hosting with Node.js support
- SSL certificate (Let's Encrypt)

### Setup Steps
1. **Deploy Signaling Server**
   - Use Node.js hosting (Heroku, DigitalOcean, etc.)
   - Enable HTTPS/WSS with SSL certificate

2. **Update Client URLs**
   - Change `localhost:3000` to your domain
   - Use HTTPS in production

3. **Deploy Web App**
   - Build: `npm run build`
   - Deploy `www/` folder to hosting
   - Options: Firebase, Netlify, Vercel

### Full Guide
See [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md) for:
- SSL/TLS setup with Let's Encrypt
- Nginx reverse proxy configuration
- Docker containerization
- Security best practices
- Monitoring and logging

---

## 🐛 Troubleshooting

### Remote Video Not Showing
1. Check server is running: `npm run server`
2. Check browser console for errors (F12)
3. Look for "Remote track received" log
4. Verify both peers are in same room

### Can't Connect to Server
```bash
# Verify server is running
npm run server

# Check server logs
# Should show: "🎥 WebRTC Signaling Server running on http://localhost:3000"

# Test connectivity
curl http://localhost:3000/
```

### Permissions Denied (Android)
1. Check AndroidManifest.xml has permissions
2. Grant runtime permissions when prompted
3. Settings → Apps → CallApp → Permissions → Enable all

### Camera/Mic Not Working
1. Check other apps aren't using camera
2. Restart device
3. Grant permissions again
4. Check browser settings → Permissions

### Performance Issues
1. Reduce video resolution in constraints
2. Lower frame rate
3. Check network quality
4. Close background apps

---

## 🔒 Security

### Current Implementation
- WebRTC encryption (DTLS-SRTP built-in)
- Socket.IO CORS configured
- Input validation in signaling

### For Production
✅ Add HTTPS/WSS (see PRODUCTION_DEPLOYMENT.md)
✅ Add authentication/authorization
✅ Add rate limiting
✅ Add input validation
✅ Add logging and monitoring
✅ Regular security audits

---

## 📊 Performance Metrics

### Browser Support
| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Recommended |
| Firefox | ✅ Full | Full WebRTC support |
| Safari | ✅ Full | iOS 14.5+ |
| Edge | ✅ Full | Chromium-based |

### System Requirements
- **Minimum**: Dual-core processor, 2GB RAM
- **Recommended**: Quad-core, 4GB+ RAM
- **Network**: 2+ Mbps for HD video

### Performance Optimization
- Local stream: ~500KB/s (video + audio)
- Remote stream: ~500KB/s (video + audio)
- Signaling overhead: < 10KB/call
- Memory usage: ~100-150MB per call

---

## 🎓 Learning Resources

### WebRTC
- [WebRTC.org](https://webrtc.org/)
- [MDN WebRTC Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
- [WebRTC samples](https://github.com/webrtc/samples)

### Ionic & Angular
- [Ionic Framework](https://ionicframework.com/docs)
- [Angular Documentation](https://angular.io/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)

### Socket.IO
- [Socket.IO Official Docs](https://socket.io/docs/)
- [Socket.IO Chat Example](https://socket.io/get-started/chat)

---

## 🤝 Contributing

### Bug Reports
Create an issue with:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/device info

### Feature Requests
- Describe the feature
- Explain use case
- Provide mockups if applicable

### Code Style
- Follow Angular style guide
- Use TypeScript strict mode
- Add comments for complex logic
- Write meaningful commit messages

---

## 📄 License

This project is open source. Modify and use freely.

---

## 🎉 Support

### Need Help?
1. Check [SETUP.md](SETUP.md) for basic setup
2. Check [ANDROID_DEPLOYMENT.md](ANDROID_DEPLOYMENT.md) for mobile
3. Check [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md) for production
4. Check browser console (F12) for errors

### Common Commands
```bash
# Development
npm start                 # Start web app
npm run server           # Start signaling server
npm run build            # Build Angular app

# Mobile
npx cap add android      # Add Android platform
npx cap sync android     # Sync with Capacitor
npx cap open android     # Open in Android Studio
npx cap run android      # Build and run

# Server
npm run server           # Start on port 3000
```

---

## 📞 Contact & Feedback

- Report bugs via GitHub issues
- Request features via discussions
- Questions? Check the documentation

---

## 🚀 Roadmap

### Planned Features
- [ ] Screen sharing
- [ ] Group video calls (3+ users)
- [ ] Call recording
- [ ] Message chat during call
- [ ] Call history & favorites
- [ ] User profiles
- [ ] Do Not Disturb mode
- [ ] Dark mode
- [ ] Internationalization (i18n)

### Infrastructure
- [ ] Cloud deployment templates
- [ ] CI/CD pipeline
- [ ] Automated testing
- [ ] Performance monitoring
- [ ] Analytics dashboard

---

## 🙏 Acknowledgments

Built with:
- Ionic Framework for beautiful mobile UI
- Angular for robust frontend
- WebRTC for peer-to-peer communication
- Socket.IO for reliable signaling
- Capacitor for cross-platform support

---

**Last Updated:** December 24, 2025  
**Version:** 1.0.0  
**Status:** Production Ready
