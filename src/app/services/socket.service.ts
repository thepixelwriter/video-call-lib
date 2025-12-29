import { io, Socket } from 'socket.io-client';
import { Capacitor } from '@capacitor/core';

const SIGNALING_URL =
  Capacitor.getPlatform() === 'android'
    ? 'http://10.0.2.2:3000'   // Android Emulator
    : 'http://localhost:3000'; // Browser

export const socket: Socket = io(SIGNALING_URL, {
  transports: ['websocket'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
});

socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});

socket.on('disconnect', () => {
  console.log('Socket disconnected');
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

socket.on('error', (error) => {
  console.error('Socket error:', error);});