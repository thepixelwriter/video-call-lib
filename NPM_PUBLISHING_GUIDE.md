# Publishing Video Call Library to npm

## Prerequisites

1. **npm account** - Create at [npmjs.com](https://www.npmjs.com)
2. **Node.js installed** - Check with `node --version` and `npm --version`

## Publishing Steps

### 1. Update Library Package.json

Edit `projects/video-call-lib/package.json`:

```json
{
  "name": "video-call-lib",  // or "@your-username/video-call-lib" for scoped
  "version": "1.0.0",
  "description": "Reusable Angular/Ionic WebRTC video call library",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "homepage": "https://github.com/your-username/video-call-lib",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/video-call-lib.git"
  },
  "keywords": [
    "webrtc",
    "video-call",
    "angular",
    "ionic",
    "peer-to-peer",
    "socket.io"
  ]
}
```

### 2. Login to npm

```bash
npm login
```

Enter your:
- Username
- Password
- Email

### 3. Build for Production

```bash
npm run build:lib:prod
```

This generates optimized dist/ folder.

### 4. Create .npmignore (Optional but Recommended)

In `projects/video-call-lib/dist/.npmignore`:

```
*.spec.ts
*.d.ts.map
src/
.git/
.gitignore
README.md
SETUP.md
```

### 5. Publish to npm

Navigate to dist folder:

```bash
cd projects/video-call-lib/dist
```

Then publish:

```bash
npm publish --access public
```

**For scoped packages (@username/package-name):**

```bash
npm publish --access public
```

### 6. Verify Publishing

Check it's live:

```bash
npm view video-call-lib
# or
npm search video-call-lib
```

Or visit: https://www.npmjs.com/package/video-call-lib

---

## Update & Republish

When you make changes:

1. Increment version in package.json (1.0.0 → 1.0.1)
2. Build: `npm run build:lib:prod`
3. Publish: `cd projects/video-call-lib/dist && npm publish`

### Semantic Versioning
- **Patch (1.0.0 → 1.0.1)** - Bug fixes
- **Minor (1.0.0 → 1.1.0)** - New features
- **Major (1.0.0 → 2.0.0)** - Breaking changes

---

## Users Can Install Your Library

### From npm:
```bash
npm install video-call-lib
```

### From GitHub (if you push to GitHub):
```bash
npm install github:your-username/video-call-lib
```

### From GitHub Releases:
```bash
npm install your-username/video-call-lib#v1.0.0
```

---

## After Publishing

### Tell the World! 🚀

1. Create GitHub repo
2. Add README with usage examples
3. Share on Twitter, Reddit, dev.to
4. Add to awesome-lists

### Sample README for npm:

```markdown
# Video Call Library

A reusable Angular/Ionic WebRTC video calling library with Socket.IO signaling.

## Installation

```bash
npm install video-call-lib socket.io-client
```

## Quick Start

```typescript
import { VideoCallLibModule, setSignalingUrl, WebRTCService } from 'video-call-lib';

@NgModule({
  imports: [VideoCallLibModule]
})
export class AppModule {
  constructor() {
    setSignalingUrl('http://localhost:3000');
  }
}
```

## Features

- ✅ WebRTC peer-to-peer calling
- ✅ Socket.IO signaling
- ✅ Multi-platform (Web, iOS, Android)
- ✅ Camera switching
- ✅ Audio/video controls
- ✅ Full TypeScript support

## Documentation

See [GitHub README](https://github.com/your-username/video-call-lib) for full docs.
```

---

## Troubleshooting

### "npm ERR! need auth"
```bash
npm login
# Then retry publish
```

### "npm ERR! 402 Payment Required"
- Scoped packages (@scope/name) might require npm Pro
- Use plain name (video-call-lib) instead

### "npm ERR! 403 Forbidden"
- Check package name isn't taken
- Try adding version suffix: video-call-lib-v2

### "npm ERR! 409 Conflict"
- Package version already exists
- Increment version (1.0.0 → 1.0.1)

### View All Your Published Packages
```bash
npm profile get
npm access list packages
```

---

## Commands Cheat Sheet

```bash
# Login to npm
npm login

# Check if logged in
npm whoami

# Build library
npm run build:lib:prod

# Navigate to dist
cd projects/video-call-lib/dist

# Publish
npm publish --access public

# View package on npm
npm view video-call-lib

# Search npm registry
npm search video-call-lib

# Check version
npm view video-call-lib version

# List all versions
npm view video-call-lib versions

# Install locally (for testing)
npm install video-call-lib
```

---

## Next Steps After Publishing

1. ✅ Announce on Twitter/LinkedIn
2. ✅ Create comprehensive GitHub repo
3. ✅ Write blog post about it
4. ✅ Submit to awesome-lists
5. ✅ Add examples to GitHub
6. ✅ Encourage community contributions
7. ✅ Maintain and update regularly

---

**🎉 Congratulations! Your library is now available to the world!**
