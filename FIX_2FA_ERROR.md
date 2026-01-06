# 🔐 Fixing 2FA Error - npm Publishing

## The Problem

```
403 Forbidden - Two-factor authentication or granular access token 
with bypass 2fa enabled is required to publish packages.
```

Your npm account has **2FA (Two-Factor Authentication)** enabled, which prevents publishing without proper credentials.

---

## ✅ Solution: Create Granular Access Token

### Step 1: Go to npm Token Settings

Visit: https://www.npmjs.com/settings/tokens

Or if you have a custom username:
```
https://www.npmjs.com/settings/YOUR_USERNAME/tokens
```

### Step 2: Generate New Token

1. Click **"Generate New Token"** button
2. Choose: **"Granular Access Token"** (NOT "Classic Token")
3. Set options:
   - **Expiration:** 90 days (or as you prefer)
   - **Token name:** "CLI Publish Token" (or anything meaningful)
   - **Scopes:** Check **"Publish packages"**
   - ☑️ **CHECK: "Bypass 2FA when using this token"**

4. Click **"Generate token"**

5. **COPY THE TOKEN** (you won't see it again!)
   - It will look like: `npm_xxxxxxxxxxxxxxxxxxxxxxxx`

### Step 3: Configure npm with Your Token

In your terminal, run:

```bash
npm config set //registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE
```

Replace `YOUR_TOKEN_HERE` with the actual token you copied.

**Example:**
```bash
npm config set //registry.npmjs.org/:_authToken=npm_abc123def456...
```

### Step 4: Verify It Works

Test that you're authenticated:

```bash
npm whoami
```

Should output your npm username.

### Step 5: Publish

Now you can publish:

```bash
cd projects/video-call-lib/dist
npm publish --access public
```

---

## Expected Success Output

When it works, you'll see:

```
npm notice
npm notice 📦  video-call-lib@1.0.0
npm notice ...
npm notice Publishing to https://registry.npmjs.org/
+ video-call-lib@1.0.0
```

Then check it's live:
```
https://www.npmjs.com/package/video-call-lib
```

---

## 🆘 Alternative: Browser Login Method

If the token method doesn't work, try:

```bash
npm adduser
```

This opens an interactive login in your browser which might handle 2FA differently.

Then try publishing again.

---

## 🔒 Security Note

- **Granular tokens** are more secure than classic tokens
- **Bypass 2FA** is needed only for automation (like this publish)
- You can revoke tokens anytime at https://www.npmjs.com/settings/tokens
- Keep your token private - it acts like a password!

---

## Quick Summary

1. **Get token:** https://www.npmjs.com/settings/tokens
2. **Set token:** `npm config set //registry.npmjs.org/:_authToken=YOUR_TOKEN`
3. **Verify:** `npm whoami`
4. **Publish:** `npm publish --access public` (from dist folder)

---

**Done!** Your package will then be published to npm! 🎉
