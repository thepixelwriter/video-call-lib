# WebRTC Video Call Application - Setup Guide

## Server Setup

### Step 1: Install Server Dependencies
```bash
npm install
```

This will install:
- **express** - HTTP server framework
- **socket.io** - Real-time bidirectional communication
- **cors** - Cross-Origin Resource Sharing middleware

### Step 2: Start the Signaling Server
```bash
npm run server
```

You should see:
```
🎥 WebRTC Signaling Server running on http://localhost:3000
Ready for peer-to-peer connections!
```

### Step 3: Start the Ionic App (in a new terminal)
```bash
npm start
```

The app will run on `http://localhost:4200` by default.

## Testing Locally

1. **Open two browser tabs:**
   - Tab 1: `http://localhost:4200`
   - Tab 2: `http://localhost:4200`

2. **Tab 1 - Create/Join Room:**
   - Enter a room ID (e.g., "test-room")
   - Click "Start Call"
   - You should see your local video in the small preview

3. **Tab 2 - Join Same Room:**
   - Enter the same room ID (e.g., "test-room")
   - Click "Start Call"
   - The signaling server will emit `peer-joined` event
   - Both peers will exchange offer/answer
   - You should see Tab 1's video in Tab 2 (as remote)
   - You should see Tab 2's video in Tab 1 (as remote)

## Server Architecture

### WebRTC Signaling Flow:

```
Client 1                          Server                        Client 2
   |                                |                               |
   |--- socket.emit('join') ------->|                               |
   |                                |--- socket.emit('join') ----->| 
   |                                |                               |
   |<--- peer-joined event ---------|                               |
   |                                |<--- peer-joined event --------|
   |                                |                               |
   |--- socket.emit('offer') ------>|                               |
   |                                |--- socket.emit('offer') ----->|
   |                                |                               |
   |<--- socket.emit('answer') -----|<--- socket.emit('answer') ----|
   |                                |                               |
   |--- socket.emit('ice') ------->|                               |
   |                                |--- socket.emit('ice') ------->|
   |<--- socket.emit('ice') --------|<--- socket.emit('ice') --------|
   |                                |                               |
   |========== Connected! ============ Video Exchange ===============|
```

### Socket Events:

- **join** - Client joins a room
- **peer-joined** - Server notifies when a second peer joins
- **offer** - Client sends SDP offer
- **answer** - Client sends SDP answer
- **ice** - Client sends ICE candidate
- **leave** - Client leaves the room
- **peer-left** - Server notifies when peer disconnects

## Troubleshooting

### Remote Video Not Showing

1. **Check server console** - Should show logs like:
   ```
   User {socketId} joining room: {roomId}
   Notifying existing users in {roomId} that a peer joined
   Relaying offer from {socketId} to room {roomId}
   ```

2. **Check browser console (F12)** in both tabs:
   - Look for: "Peer joined the room, creating offer..."
   - Look for: "Remote track received: video"
   - Look for: "Remote track received: audio"

3. **Check firewall** - Ensure port 3000 is not blocked

4. **Check socket connection** - Both tabs should connect:
   - Look for: "Socket connected: {socketId}"

### Server Not Connecting

1. Ensure server is running: `npm run server`
2. Check if port 3000 is in use: `netstat -an | findstr :3000` (Windows) or `lsof -i :3000` (Mac/Linux)
3. Try killing existing processes and restart

## Production Deployment

For production, you'll want to:
1. Use environment variables for configuration
2. Add authentication/authorization
3. Use a TURN server for NAT traversal (currently using STUN only)
4. Implement proper error handling and reconnection logic
5. Add logging/monitoring
6. Use HTTPS/WSS (not HTTP/WS)

## Server Code Location

- Main server: `server.js`
- Configuration: `.env.server`
