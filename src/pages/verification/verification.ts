import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { SetpasswordPage } from '../setpassword/setpassword';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
/**
 * Generated class for the VerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})
export class VerificationPage {
  verifyCodeForm : FormGroup;
  response: any;
  email:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage ){
    this.email = navParams.get('userEmail');
    console.log(this.email);
    this.response = false;
		this.verifyCodeForm = fb.group({
	//	  'email' : [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
		  'code': [null, Validators.compose([Validators.required, Validators.maxLength(6) ])]
		});
 
  }
  signupLoad(){this.navCtrl.push(SignupPage)}
  setpasswordLoad(){this.navCtrl.push(SetpasswordPage)}

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationPage');
    this.email = this.navParams.get('userEmail');
    console.log(this.email);
  }
  goBack(){
		this.navCtrl.pop();
  }
  verifyCode(value: any):void{
    console.log('Forgot Pass clicked');
    console.log(this.email);
    console.log('Form submitted!')
	//	console.log(value.email);
		const req = this.httpClient.post(ENV.BASE_URL +'users/app/verify-code', {
						userEmail: this.email,
						resetCode: value.code
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
							
              this.navCtrl.push(SetpasswordPage, {
                userEmail: this.email
          });
						},
						err => {
							this.response = true;
							console.log("Error occurred");
              console.log(err);
              //this.navCtrl.push(VerificationPage)
						}
					);
  }
}
