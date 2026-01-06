const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;

// CORS middleware
app.use(cors());

// Basic route
app.get('/', (req, res) => {
  res.send('WebRTC Signaling Server is running');
});

// ICE servers endpoint
app.get('/ice-servers', (req, res) => {
  res.json([
    {
      urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302']
    }
  ]);
});

// Backward compatibility - also support /ice endpoint
app.get('/ice', (req, res) => {
  res.json([
    {
      urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302']
    }
  ]);
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('✓ New user connected:', socket.id);

  socket.on('join', ({ room }) => {
    console.log(`📍 User ${socket.id} attempting to join room: ${room}`);
    
    // Get the number of users in the room before joining
    const roomMembers = io.sockets.adapter.rooms.get(room);
    const usersInRoom = roomMembers ? roomMembers.size : 0;
    
    console.log(`   Users in room "${room}" BEFORE this join: ${usersInRoom}`);
    
    // Join the room
    socket.join(room);
    console.log(`   ✓ User ${socket.id} successfully joined room "${room}"`);
    
    // Get updated count
    const updatedRoomMembers = io.sockets.adapter.rooms.get(room);
    const updatedCount = updatedRoomMembers ? updatedRoomMembers.size : 0;
    console.log(`   Users in room "${room}" AFTER this join: ${updatedCount}`);
    
    // If there's already a user in the room, notify the existing user that a peer joined
    if (usersInRoom > 0) {
      console.log(`   🔔 Notifying existing users in "${room}" that a peer joined`);
      socket.to(room).emit('peer-joined');
      console.log(`   ✓ "peer-joined" event sent to other users in "${room}"`);
    } else {
      console.log(`   ℹ️  No existing users in "${room}" to notify`);
    }
  });

  socket.on('offer', ({ room, offer }) => {
    console.log(`📤 Relaying offer from ${socket.id} to room "${room}"`);
    console.log(`   Offer type: ${offer.type}`);
    socket.to(room).emit('offer', { offer, from: socket.id });
    console.log(`   ✓ Offer relayed`);
  });

  socket.on('answer', ({ room, answer }) => {
    console.log(`📤 Relaying answer from ${socket.id} to room "${room}"`);
    console.log(`   Answer type: ${answer.type}`);
    socket.to(room).emit('answer', { answer, from: socket.id });
    console.log(`   ✓ Answer relayed`);
  });

  socket.on('ice', ({ room, candidate }) => {
    console.log(`🧊 Relaying ICE candidate from ${socket.id} to room "${room}"`);
    socket.to(room).emit('ice', { candidate, from: socket.id });
  });

  socket.on('leave', ({ room }) => {
    console.log(`👋 User ${socket.id} leaving room: "${room}"`);
    socket.leave(room);
    socket.to(room).emit('peer-left');
    console.log(`   ✓ "peer-left" event sent to other users in "${room}"`);
  });

  socket.on('disconnect', () => {
    console.log('✗ User disconnected:', socket.id);
  });

  socket.on('error', (error) => {
    console.error('❌ Socket error:', error);
  });
});

server.listen(PORT, () => {
  console.log(`🎥 WebRTC Signaling Server running on http://localhost:${PORT}`);
  console.log('Ready for peer-to-peer connections!');
});
