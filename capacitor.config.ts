import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.videocall',
  appName: 'CallApp',
  webDir: 'www',
  server: {
    cleartext: true,
    androidScheme: 'http',
    hostname: 'localhost'
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
    Camera: {
      permissions: ['camera']
    },
    Microphone: {
      permissions: ['microphone']
    }
  }
};

export default config;


