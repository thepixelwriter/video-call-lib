@echo off
REM Publishing script for video-call-lib (Windows)

echo.
echo 📦 Video Call Library - npm Publishing Script
echo ============================================
echo.

REM Check if logged in to npm
echo Checking npm login status...
npm whoami >nul 2>&1
if errorlevel 1 (
    echo ❌ Not logged in to npm
    echo Running: npm login
    call npm login
)

REM Check if logged in successfully
npm whoami >nul 2>&1
if errorlevel 1 (
    echo ❌ Failed to login
    exit /b 1
) else (
    echo ✅ Logged in to npm
)

echo.
echo Building library for production...
call npm run build:lib:prod

if errorlevel 1 (
    echo ❌ Build failed
    exit /b 1
)

echo ✅ Build successful!
echo.
echo Publishing to npm...
cd projects\video-call-lib\dist

call npm publish --access public

if errorlevel 1 (
    echo ❌ Publishing failed
    exit /b 1
)

echo.
echo ✅ PUBLISHED SUCCESSFULLY!
echo.
echo Your package is now live on npm:
echo https://www.npmjs.com/package/video-call-lib
echo.
echo Users can install with:
echo npm install video-call-lib
echo.

pause
