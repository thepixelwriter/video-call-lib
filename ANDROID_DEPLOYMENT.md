# Android Deployment Guide for CallApp

## Prerequisites

### Required Software
1. **Android Studio** - [Download](https://developer.android.com/studio)
2. **Java Development Kit (JDK)** - Version 11 or higher
3. **Android SDK** - API level 24 or higher (automatically installed with Android Studio)
4. **Node.js** - Version 16 or higher (already installed)

### Android Device or Emulator
- Physical Android device with USB debugging enabled, OR
- Android emulator configured in Android Studio

---

## Step-by-Step Deployment

### Step 1: Prepare the Project
```bash
cd d:\gaurav-ts\know\video-call

# Install dependencies
npm install

# Build the Angular app
npm run build
```

### Step 2: Add Android Platform
```bash
# Sync with Capacitor (creates/updates android folder)
npx cap sync android

# Or if you want to add fresh:
npx cap add android
```

### Step 3: Configure Android Project

#### Update App ID (Optional but recommended)
Edit `capacitor.config.ts` - already updated to:
- `appId: 'io.ionic.videocall'`
- `appName: 'CallApp'`

Then sync again:
```bash
npx cap sync android
```

### Step 4: Open in Android Studio
```bash
npx cap open android
```

### Step 5: Build and Run

#### Method A: Using Android Studio GUI
1. Click the green **"Run 'app'"** button at the top
2. Select your device/emulator from the popup
3. Wait for the build to complete (2-5 minutes first time)
4. App will auto-launch on your device

#### Method B: Using Command Line
```bash
# Build and run on connected device
npx cap run android

# Or use gradle directly
cd android
./gradlew build
./gradlew installDebug
```

---

## Testing the App

### Prerequisites for Testing
1. **Signaling Server Running** - Must be accessible from your device:
   ```bash
   # In another terminal
   npm run server
   ```

2. **Network Configuration**:
   - **Emulator**: Uses `http://10.0.2.2:3000` (already configured)
   - **Physical Device**: Use your PC's IP address
     ```bash
     ipconfig getifaddr en0  # Mac
     ipconfig               # Windows (look for IPv4 Address)
     ```
     Update WebRTC service with your IP if needed

### Test Scenarios

#### Scenario 1: Local Testing (Same PC)
1. Run signaling server: `npm run server`
2. Run Android app
3. Create room ID: "test-room"
4. Open second instance of app (on same or different emulator)
5. Join same room
6. Verify video, audio, controls work

#### Scenario 2: Physical Device + Emulator
1. Connect physical device via USB
2. Run app on both device and emulator
3. Use same room ID
4. Test bidirectional video call

---

## Android Permissions

### Permissions Included
✅ Camera - `android.permission.CAMERA`
✅ Microphone - `android.permission.RECORD_AUDIO`
✅ Internet - `android.permission.INTERNET`
✅ Network State - `android.permission.ACCESS_NETWORK_STATE`
✅ Modify Audio - `android.permission.MODIFY_AUDIO_SETTINGS`

### Runtime Permission Handling
The app automatically requests permissions when you start a call. Users will see a permission dialog on first use.

---

## Troubleshooting

### Issue: App won't build
**Solution:**
```bash
# Clean build
cd android
./gradlew clean
./gradlew build
```

### Issue: Permissions denied on Android 6.0+
**Cause:** Android requires runtime permissions in addition to manifest permissions
**Solution:** Grant permissions when prompted, or check:
- Settings → Apps → CallApp → Permissions → Enable Camera & Microphone

### Issue: Can't connect to signaling server
**Cause:** Network configuration issue
**Check:**
```bash
# Verify server is running
npm run server

# Verify network connectivity
# From Android device terminal:
ping 10.0.2.2:3000  # For emulator
ping YOUR_PC_IP:3000  # For physical device
```

### Issue: Camera/Microphone not working
**Cause:** Permission denied or device not compatible
**Solution:**
1. Check manifest permissions in `android/app/src/main/AndroidManifest.xml`
2. Verify device has camera/mic: Settings → Camera/Sound
3. Restart app and grant permissions
4. Check Chrome DevTools (if using web view) → Overrides

### Issue: Video quality poor
**Solution:** Adjust WebRTC constraints in `webrtc.ts`:
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

### Issue: App crashes on call start
**Cause:** Media devices not available
**Solution:**
1. Check device permissions
2. Ensure no other app is using camera
3. Restart device
4. Check logcat: `./gradlew logcat`

---

## Building Release APK

### Prerequisites
- Keystore file (for signing)
- Release configuration

### Build Steps
```bash
cd android

# Generate keystore (one time)
keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias

# Build release APK
./gradlew assembleRelease

# Signed APK location:
# android/app/build/outputs/apk/release/app-release.apk
```

### Install Release APK
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

---

## Firebase Deployment (Optional)

### Step 1: Set up Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project
3. Add Android app
4. Download `google-services.json`
5. Place in `android/app/`

### Step 2: Configure Build
Edit `android/app/build.gradle`:
```gradle
apply plugin: 'com.google.gms.google-services'
```

### Step 3: Deploy
```bash
# Build APK as above
./gradlew assembleRelease

# Upload to Firebase App Distribution:
firebase appdistribution:distribute android/app/build/outputs/apk/release/app-release.apk
```

---

## Device-Specific Configuration

### For Physical Devices
1. Enable USB Debugging:
   - Settings → Developer Options → USB Debugging (toggle ON)
   - Connect via USB cable

2. Configure Network:
   - Get device IP: `adb shell ip addr show wlan0`
   - Update server IP in WebRTC service if needed

3. Verify Connection:
   ```bash
   adb devices
   # Should list your device
   ```

### For Emulator
- Configuration already handles `http://10.0.2.2:3000`
- Ensure adequate RAM allocation (2GB+ recommended)
- GPU acceleration enabled for better performance

---

## Performance Optimization

### For Smoother Video Call
1. **Reduce Quality**:
   ```typescript
   video: {
     width: { max: 640 },
     height: { max: 480 }
   }
   ```

2. **Optimize Battery**:
   - Reduce frame rate
   - Disable unused audio when muted

3. **Network Optimization**:
   - Ensure WiFi connection
   - Close other apps using network

---

## Common Commands Reference

```bash
# Build app
npm run build

# Sync Capacitor
npx cap sync android

# Open Android Studio
npx cap open android

# Run on device
npx cap run android

# View logs
adb logcat

# List connected devices
adb devices

# Install APK
adb install app.apk

# Clear app data
adb shell pm clear io.ionic.videocall

# View app files
adb shell
cd /data/data/io.ionic.videocall
```

---

## Support & Next Steps

### If Something Goes Wrong
1. **Check Logs**: `adb logcat | grep -i videocall`
2. **Clean Build**: `./gradlew clean && ./gradlew build`
3. **Reset Environment**: `npx cap sync android`
4. **Check Android Studio**: Build → Clean Project

### Production Readiness Checklist
- [ ] App ID configured properly
- [ ] All permissions requested and granted
- [ ] Signaling server deployed with HTTPS/WSS
- [ ] App tested on multiple Android devices
- [ ] Crash reporting configured
- [ ] Version number updated
- [ ] App signed with release keystore
- [ ] Play Store account created
- [ ] App listing created on Play Store

### Deployment to Play Store
1. Build release APK (as above)
2. Go to Google Play Console
3. Create new app
4. Fill in app details
5. Upload APK to internal testing
6. Test thoroughly
7. Promote to production

---

## Resources
- [Capacitor Android Documentation](https://capacitorjs.com/docs/android)
- [Android Developer Guide](https://developer.android.com/docs)
- [WebRTC Documentation](https://webrtc.org/)
- [Ionic Framework Docs](https://ionicframework.com/docs)
