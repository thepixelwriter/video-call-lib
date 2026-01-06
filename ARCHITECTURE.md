# Architecture Overview

## Project Structure

```
ionic-video-call-app/
│
├─ 📦 projects/
│  ├─ 🎁 video-call-lib/          [REUSABLE LIBRARY]
│  │  ├─ src/
│  │  │  ├─ lib/
│  │  │  │  ├─ services/
│  │  │  │  │  ├─ webrtc.ts                 (Peer connection management)
│  │  │  │  │  ├─ socket.service.ts         (Socket.IO signaling)
│  │  │  │  │  ├─ auth.ts                   (Authentication service)
│  │  │  │  │  ├─ call-state.ts             (RxJS call state)
│  │  │  │  │  └─ signaling.ts              (Signaling placeholder)
│  │  │  │  ├─ guards/
│  │  │  │  │  └─ auth.guard.ts             (Route protection)
│  │  │  │  ├─ models/                      (Types/Interfaces)
│  │  │  │  └─ video-call-lib.module.ts     (Main module)
│  │  │  └─ public-api.ts                   (Public exports)
│  │  ├─ dist/                              (Built output)
│  │  ├─ ng-package.json                    (Build config)
│  │  ├─ package.json
│  │  ├─ tsconfig.lib.json
│  │  ├─ tsconfig.lib.prod.json
│  │  └─ README.md
│  │
│  └─ 📱 demo-app/                 (OPTIONAL: Move current src/ here)
│     └─ [Demo application]
│
├─ 🖥️  server/                     [SEPARATE SIGNALING SERVER]
│  ├─ server.js
│  ├─ package.json
│  └─ README.md
│
├─ 📂 src/                         [CURRENT APP - Can stay as demo]
│  ├─ app/
│  │  ├─ services/                 (Will use library services)
│  │  ├─ components/
│  │  ├─ guards/
│  │  ├─ pages/
│  │  └─ ...
│  └─ ...
│
├─ 📄 angular.json                 (Updated for monorepo)
├─ 📄 package.json                 (Main workspace)
├─ 📄 tsconfig.json                (Root TypeScript config)
│
├─ 📚 INTEGRATION.md               (How to integrate library)
├─ 📚 LIBRARY_CONVERSION.md        (Conversion summary)
├─ 📚 QUICK_REFERENCE.md           (Quick lookup)
└─ 📚 SETUP.md                     (Project setup)
```

## Data Flow Diagram

```
┌────────────────────────────────────────────────────────────┐
│                    ANY ANGULAR/IONIC APP                   │
├────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           Your Application Component                │   │
│  │  (Call Component, Home Component, etc.)             │   │
│  └──────────────────┬──────────────────────────────────┘   │
│                     │ uses                                   │
│  ┌──────────────────▼──────────────────┐                    │
│  │    @video-call-lib (LIBRARY)        │                    │
│  ├──────────────────────────────────────┤                    │
│  │ • WebRTCService                      │                    │
│  │ • SocketService                      │                    │
│  │ • AuthService                        │                    │
│  │ • CallStateService                   │                    │
│  │ • AuthGuard                          │                    │
│  │ • VideoCallLibModule                 │                    │
│  └──────────────────┬──────────────────┘                    │
│                     │                                        │
│                     ├─ emits/listens via socket             │
│                     └─ requests media devices               │
│                                                              │
└────────────────────┬───────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
    ┌────────┐  ┌────────┐  ┌──────────┐
    │Signaling│  │ICE     │  │Media     │
    │Server   │  │Servers │  │Devices   │
    │(Socket) │  │(STUN)  │  │(Cam/Mic) │
    └────────┘  └────────┘  └──────────┘
```

## Component Interaction

```
Application Module
│
├─ imports VideoCallLibModule
│
├─ setSignalingUrl('http://localhost:3000')
│
└─ provides WebRTCService
   │
   ├─ on init():
   │  ├─ getUserMedia() → camera/mic
   │  ├─ createPeerConnection()
   │  ├─ fetch ICE servers
   │  └─ socket.emit('join')
   │
   ├─ on peer-joined:
   │  ├─ createOffer()
   │  └─ socket.emit('offer')
   │
   ├─ on answer:
   │  └─ setRemoteDescription()
   │
   └─ on leave():
      ├─ stop all tracks
      ├─ close peer connection
      └─ socket.emit('leave')
```

## Service Dependencies

```
VideoCallLibModule (Main Entry Point)
│
├─── WebRTCService
│    ├─ depends on: HttpClient
│    └─ uses: socket (from socket.service)
│
├─── SocketService
│    ├─ creates: Socket.IO connection
│    └─ exports: socket, setSignalingUrl()
│
├─── AuthService
│    └─ manages: localStorage token
│
├─── CallStateService
│    └─ manages: RxJS BehaviorSubject
│
└─── AuthGuard
     └─ checks: AuthService.isLoggedIn()
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Your Angular/Ionic App                 │
│             (Built with video-call-lib)                 │
│  http://your-app.com or https://your-app.com           │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ WebSocket
                     ▼
┌──────────────────────────────────┐
│  WebRTC Signaling Server         │
│  (Socket.IO Server)              │
│  https://signaling.your-server   │
└────────────────────┬─────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
    ┌────────┐  ┌────────┐  ┌──────────┐
    │  User  │  │  User  │  │  STUN    │
    │Browser │  │Browser │  │ Servers  │
    │        │  │        │  │(Google)  │
    └────────┘  └────────┘  └──────────┘
        │            │
        └────────┬───┘
                 │ P2P WebRTC Connection
                 │ (Direct video/audio)
                 └─ (no server involved)
```

## Publishing Flow

```
┌─────────────────────────────┐
│ projects/video-call-lib/src │
│ (Source code)               │
└────────────┬────────────────┘
             │
             │ npm run build:lib:prod
             ▼
┌──────────────────────────────┐
│ projects/video-call-lib/dist │
│ (Built library)              │
│ - UMD bundle                 │
│ - ESM bundles                │
│ - Type definitions (.d.ts)   │
└────────────┬─────────────────┘
             │
             │ npm publish
             ▼
┌──────────────────────────────┐
│  npm Registry                │
│  @your-org/video-call-lib    │
│  Published & available       │
└────────────┬─────────────────┘
             │
             │ npm install @your-org/video-call-lib
             ▼
┌──────────────────────────────┐
│  Any Angular Project         │
│  Uses the library            │
└──────────────────────────────┘
```

## Library vs App Separation

### Before (Monolithic)
```
One App
├─ WebRTC logic (stuck in app)
├─ Socket logic (stuck in app)
├─ Auth logic (stuck in app)
└─ Can't reuse in other projects ❌
```

### After (Modular)
```
Reusable Library
├─ WebRTC logic ✅
├─ Socket logic ✅
├─ Auth logic ✅
└─ Can install in any Angular project ✅

Multiple Apps (can import library)
├─ App 1 (web)
├─ App 2 (Ionic)
├─ App 3 (desktop)
└─ App 4 (any other Angular project)
```

## Key Benefits

```
┌──────────────────────────────┐
│      Code Organization       │
│  One source, many consumers  │
└──────────────────────────────┘
                │
        ┌───────┼───────┐
        │       │       │
        ▼       ▼       ▼
   Reusable  Testable  Publishable
   Library   Services  to npm
```

---

This modular architecture allows you to:
1. ✅ Publish library to npm
2. ✅ Install in multiple projects
3. ✅ Maintain single source of truth
4. ✅ Easily update all consumers
5. ✅ Build different applications (web, mobile, desktop)
