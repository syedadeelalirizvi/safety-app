import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { VerificationPage } from '../verification/verification';
//import { Component } from '@angular/core';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';

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
  forgotPasswordForm : FormGroup;
  response: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage ){
    this.response = false;
    this.forgotPasswordForm = fb.group({
      'email' : [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
    });
  
  
  }
  signupLoad(){this.navCtrl.push(SignupPage)}
  verificationLoad(){this.navCtrl.push(VerificationPage)}


  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }
  goBack(){
		this.navCtrl.pop();
  }
  
  requestPass(value: any):void{
    console.log('Forgot Pass clicked');
    console.log(value.email);
    console.log('Form submitted!')
		console.log(value.email);
		const req = this.httpClient.post(ENV.BASE_URL +'users/app/reset-password-request', {
						userEmail: value.email
					//	userPassword: value.password
					})
					.subscribe(
						res => {
							console.log(res);
							// Initializing session information
							// this.storage.set('Session.user_name', res.data.userName);
							// this.storage.set('Session.user_id', res.data.userId);
							// this.storage.set('Session.access_token', res.data.token);
							// this.storage.set('Session.token_expiry', res.data.expiry);
							// this.storage.set('Session.profile_pic', res.data.profilePicture);
							// this.storage.set('Session.company_logo', res.data.companyLogo);
							//this.storage.set('name', 'Max');
							
              this.navCtrl.push(VerificationPage, {
                userEmail: value.email
          });
						},
						err => {
							this.response = true;
							console.log("Error occurred");
              console.log(err);
              this.navCtrl.push(VerificationPage, {
                userEmail: value.email
          });
						}
					);
  }
}
