# Library Setup and Architecture

This workspace contains:

1. **video-call-lib** - Reusable Angular library for WebRTC video calling
2. **app** - Demo/test application showcasing the library

## Project Structure

```
ionic-video-call-app/
├── projects/
│   ├── video-call-lib/              ← Reusable library
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── services/        ← WebRTC, Socket, Auth, CallState
│   │   │   │   ├── guards/          ← AuthGuard
│   │   │   │   ├── models/          ← Types/interfaces
│   │   │   │   └── video-call-lib.module.ts
│   │   │   └── public-api.ts        ← Public exports
│   │   ├── ng-package.json
│   │   ├── package.json
│   │   ├── tsconfig.lib.json
│   │   └── README.md
│   └── app/                         ← Demo app (optional)
├── server/                          ← Signaling server
├── src/                             ← Current app (will move to projects/demo-app)
├── angular.json
└── package.json
```

## Library Services

### WebRTCService
- Manages peer connections
- Handles media streams
- Camera/microphone control

### SocketService  
- Socket.IO connection management
- Configurable signaling URL
- Automatic reconnection

### AuthService
- Authentication logic
- Token management

### CallStateService
- Call state management
- RxJS observables

### AuthGuard
- Route protection
- Login checks

## Building the Library

### Development Build
```bash
npm run build:lib
```

### Production Build
```bash
npm run build:lib:prod
```

Output: `dist/video-call-lib/`

## Using the Library Locally

### Install in another Angular project:
```bash
npm install ../path/to/ionic-video-call-app/dist/video-call-lib
```

### Import in your app:
```typescript
import { VideoCallLibModule, WebRTCService, setSignalingUrl } from '@video-call-lib';

@NgModule({
  imports: [VideoCallLibModule]
})
export class AppModule {
  constructor() {
    setSignalingUrl('http://localhost:3000');
  }
}
```

## Publishing to npm

1. **Prepare:**
   ```bash
   npm run build:lib:prod
   ```

2. **Update version** in `projects/video-call-lib/package.json`:
   ```json
   {
     "name": "@your-org/video-call-lib",
     "version": "1.0.0"
   }
   ```

3. **Publish:**
   ```bash
   cd dist/video-call-lib
   npm publish --access public
   ```

## Testing the Library

### Build and Link Locally
```bash
npm run build:lib
npm link dist/video-call-lib
```

### In your test app:
```bash
npm link @video-call-lib
```

### Unlink when done:
```bash
npm unlink @video-call-lib
```

## Demo Application

The `src/` and `projects/app/` folders contain demo apps that showcase library usage.

To run the demo:
```bash
npm install
npm start
```

## Monorepo Structure

This workspace uses monorepo structure with:
- Single `node_modules` at root
- Shared `tsconfig.json`
- Individual project configurations in `angular.json`
- Library configuration in `ng-package.json`

## Contributing to the Library

1. Edit files in `projects/video-call-lib/src/lib/`
2. Update `public-api.ts` for new exports
3. Build with `npm run build:lib`
4. Test in demo app
5. Update version and publish

## Workspace Scripts

```bash
# Library
npm run build:lib           # Build for development
npm run build:lib:prod      # Build for production
npm run lint                # Lint library code
npm run test                # Run library tests

# Demo App
npm start                   # Serve demo app
npm run build               # Build demo app

# All
npm install                 # Install all dependencies
```

## Next Steps

1. Customize library to your needs
2. Build and test: `npm run build:lib`
3. Publish to npm or host privately
4. Create example projects using the library
5. Add TypeScript types and documentation
