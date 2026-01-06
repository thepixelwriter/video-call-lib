# 🚀 Publishing Video Call Library to npm - Quick Guide

## ✅ What's Already Done

- ✅ Library built successfully
- ✅ Package.json updated with metadata
- ✅ Production build configured
- ✅ Publishing guide created

## 🎯 Next Steps (3 Simple Steps)

### Step 1: Create npm Account & Login

```bash
# Create account at: https://www.npmjs.com/signup

# Login to npm
npm login

# Enter:
# - Username: your_npm_username
# - Password: your_npm_password
# - Email: your_email@example.com
```

### Step 2: Build for Production

```bash
npm run build:lib:prod
```

Expected output:
```
✔ Built video-call-lib
Built Angular Package
- from: .../projects/video-call-lib
- to:   .../projects/video-call-lib/dist
```

### Step 3: Publish to npm

**Option A: Automatic (Easiest)**

Windows:
```bash
publish.bat
```

Mac/Linux:
```bash
bash publish.sh
```

**Option B: Manual**

```bash
cd projects/video-call-lib/dist
npm publish --access public
```

---

## ✨ Success Indicator

When publishing is complete, you'll see:

```
✔ published
```

And your package will be available at:
```
https://www.npmjs.com/package/video-call-lib
```

---

## 🎁 Users Can Then Install With

```bash
npm install video-call-lib socket.io-client
```

---

## 📋 Optional: Customize Package Name

Before publishing, you can change the name in `projects/video-call-lib/package.json`:

### Option 1: Scoped (Recommended)
```json
"name": "@your-username/video-call-lib"
```

Users install with:
```bash
npm install @your-username/video-call-lib
```

### Option 2: Plain Name
```json
"name": "video-call-lib"
```

Users install with:
```bash
npm install video-call-lib
```

---

## 📦 Current Package Settings

**File:** `projects/video-call-lib/package.json`

```json
{
  "name": "video-call-lib",
  "version": "1.0.0",
  "description": "Reusable Angular/Ionic library for WebRTC video calling",
  "author": "Your Name",
  "license": "MIT",
  "keywords": [
    "webrtc",
    "video-call",
    "angular",
    "ionic",
    "socket.io"
  ]
}
```

**Update these before publishing:**
- `name` - Package name (optional)
- `author` - Your name
- `version` - If making changes (use semantic versioning)

---

## 🔄 Update & Republish Later

To update your package:

1. Make changes to library code
2. Update version: `1.0.0` → `1.0.1` (or `1.1.0`, `2.0.0`)
3. Build: `npm run build:lib:prod`
4. Publish: `cd projects/video-call-lib/dist && npm publish`

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "need auth" | Run `npm login` first |
| "402 Payment Required" | Use plain name, not @scope |
| "409 Conflict" | Version already exists, increment it |
| "403 Forbidden" | Package name taken, try different name |
| Build fails | Check `npm run build:lib` works first |

---

## 📚 For More Details

See: **[NPM_PUBLISHING_GUIDE.md](NPM_PUBLISHING_GUIDE.md)**

---

## 🎉 Ready to Publish?

**Run this now:**

**Windows:**
```bash
publish.bat
```

**Mac/Linux:**
```bash
bash publish.sh
```

**Or manually:**
```bash
npm login
npm run build:lib:prod
cd projects/video-call-lib/dist
npm publish --access public
```

---

**Questions? See NPM_PUBLISHING_GUIDE.md for complete documentation**

Good luck! 🚀
