import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../main/main';


@Component({
  selector: 'page-information',
  templateUrl: 'information.html',
})
export class InformationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
   goBack(){
    this.navCtrl.push(MainPage).then(() => {
      const index = this.navCtrl.getActive().index;
      this.navCtrl.remove(0,index);
    });
  }



}
