import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { VerificationPage } from '../verification/verification';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  signupLoad(){this.navCtrl.push(SignupPage)}
  verificationLoad(){this.navCtrl.push(VerificationPage)}


  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }
  goBack(){
		this.navCtrl.pop();
	}
}
