import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnCatPage } from './own-cat';

@NgModule({
  declarations: [
    OwnCatPage,
  ],
  imports: [
    IonicPageModule.forChild(OwnCatPage),
  ],
})
export class OwnCatPageModule {}
