import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-pass-safe',
  templateUrl: 'pass-safe.html',
})
export class PassSafePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController ) {
  }

presentAlert() {
  let alert = this.alertCtrl.create({
    //title: 'Low battery',
    subTitle: 'Your Report Has Been Sent Successfully',
    buttons: ['Dismiss']
  });
  alert.present();
}



   goBack(){
    this.navCtrl.pop();
  }

  profileLoad = function(){this.navCtrl.push(ProfilePage)}
previousLoad = function(){this.navCtrl.push(PreviousPage)}
informationLoad = function(){this.navCtrl.push(InformationPage)}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PassSafePage');
  }

}
