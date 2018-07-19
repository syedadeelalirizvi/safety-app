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
							
                  this.navCtrl.push(VerificationPage, {
                    userEmail: value.email
                  });
                },
                err => {
                  this.response = true;
                  console.log("Error occurred");
                  console.log('message',err.error.error.message);
                //    if(err.error.error.message=='This email address does not exist.'){
                //   let alert = this.alertCtrl.create({
                //     title: 'Success',
                //     subTitle: 'This email address does not exist!',
                //     buttons: ['Dismiss']
                //   });
                //  alert.present();
                // }
                // this.navCtrl.pop();
                //else{
                  this.navCtrl.push(VerificationPage, {
                    userEmail: value.email
                  });
               // }
                }
              );
    }
}
