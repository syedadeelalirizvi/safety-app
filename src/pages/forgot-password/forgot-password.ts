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
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
    forgotPasswordForm : FormGroup;
    response: any;
	

    constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage ){
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
		(<HTMLInputElement> document.getElementById("forgot-password-submit")).disabled = true;
		(<HTMLInputElement> document.getElementById("forgot-password-submit")).innerHTML = "Please wait..";

        console.log('Forgot Pass clicked');
        console.log(value);
        console.log('Form submitted!')
        console.log(value.email);
        const req = this.httpClient.post(ENV.BASE_URL +'users/app/reset-password-request', {
                userEmail: value.email
              //	userPassword: value.password
              })
              .subscribe(
                res => {
                  console.log(res);
							
                  this.navCtrl.push(VerificationPage, {
                    userEmail: value.email
                  });
                },
                err => {
                  this.response = true;
                  console.log("Error occurred");
				(<HTMLInputElement> document.getElementById("forgot-password-submit")).disabled = false;
				(<HTMLInputElement> document.getElementById("forgot-password-submit")).innerHTML = "Reset password";
	
				});
    }
}
