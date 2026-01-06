import { io, Socket } from 'socket.io-client';
import { Capacitor } from '@capacitor/core';

let SIGNALING_URL = 'http://localhost:3000';

export const getSignalingUrl = () => SIGNALING_URL;

export const setSignalingUrl = (url: string) => {
  SIGNALING_URL = url;
  console.log('✓ Signaling URL updated to:', SIGNALING_URL);
};

// Initialize based on platform
const initializeSignalingUrl = () => {
  const platform = Capacitor.getPlatform();
  if (platform === 'android') {
    SIGNALING_URL = 'http://192.168.1.10:3000'; // Android Emulator - update as needed
  }
};

initializeSignalingUrl();

export const socket: Socket = io(SIGNALING_URL, {
  transports: ['websocket'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
});

socket.on('connect', () => {
  console.log('✓ Socket connected to server at', SIGNALING_URL);
  console.log('  Socket ID:', socket.id);
});

socket.on('disconnect', () => {
  console.log('✗ Socket disconnected from server');
});

socket.on('connect_error', (error) => {
  console.error('❌ Socket connection error:', error);
});

socket.on('error', (error) => {
  console.error('❌ Socket error:', error);
});
