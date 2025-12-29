import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { CallPage } from './call.page';
import { CallPageRoutingModule } from './call-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CallPage],
  imports: [
    CommonModule,
    IonicModule,
    CallPageRoutingModule,
    HttpClientModule
  ]
})
export class CallPageModule {}
