#!/bin/bash
# Publishing script for video-call-lib

echo "📦 Video Call Library - npm Publishing Script"
echo "=============================================="
echo ""

# Check if logged in to npm
echo "Checking npm login status..."
if ! npm whoami > /dev/null 2>&1; then
    echo "❌ Not logged in to npm"
    echo "Running: npm login"
    npm login
fi

# Check if logged in successfully
if npm whoami > /dev/null 2>&1; then
    USERNAME=$(npm whoami)
    echo "✅ Logged in as: $USERNAME"
else
    echo "❌ Failed to login"
    exit 1
fi

echo ""
echo "Building library for production..."
npm run build:lib:prod

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "Publishing to npm..."
cd projects/video-call-lib/dist

if npm publish --access public; then
    echo ""
    echo "✅ PUBLISHED SUCCESSFULLY!"
    echo ""
    echo "Your package is now live on npm:"
    echo "https://www.npmjs.com/package/video-call-lib"
    echo ""
    echo "Users can install with:"
    echo "npm install video-call-lib"
    echo ""
else
    echo "❌ Publishing failed"
    exit 1
fi
