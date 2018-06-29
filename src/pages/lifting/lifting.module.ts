import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiftingPage } from './lifting';

@NgModule({
  declarations: [
    LiftingPage,
  ],
  imports: [
    IonicPageModule.forChild(LiftingPage),
  ],
})
export class LiftingPageModule {}
