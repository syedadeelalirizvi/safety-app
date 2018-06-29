import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LiftingPage } from '../lifting/lifting';

/**
 * Generated class for the PreviousPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-previous',
  templateUrl: 'previous.html',
})
export class PreviousPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
 goBack(){
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PreviousPage');
  }
buttonClick = function(){this.navCtrl.push(LiftingPage)}
}
