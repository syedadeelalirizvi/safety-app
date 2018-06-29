import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MainPage} from '../main/main';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
mainPage= MainPage;
  constructor(public navCtrl: NavController) {
  }

load(){this.navCtrl.push(MainPage)}
forgotPasswordLoad(){this.navCtrl.push(ForgotPasswordPage)}
signupLoad(){this.navCtrl.push(SignupPage)}

  


}