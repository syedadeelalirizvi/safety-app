import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassObservationPage } from './pass-observation';

@NgModule({
  declarations: [
    PassObservationPage,
  ],
  imports: [
    IonicPageModule.forChild(PassObservationPage),
  ],
})
export class PassObservationPageModule {}
