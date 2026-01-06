import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { WebRTCService } from './services/webrtc';
import { CallStateService } from './services/call-state';
import { AuthService } from './services/auth';
import { Signaling } from './services/signaling';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule
  ],
  providers: [
    WebRTCService,
    CallStateService,
    AuthService,
    Signaling,
    AuthGuard
  ]
})
export class VideoCallLibModule {}
