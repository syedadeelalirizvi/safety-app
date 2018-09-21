import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { SignupPage } from './../../pages/signup/signup';
import { VerificationPage } from './../../pages/verification/verification';
import { HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { Keyboard } from "@ionic-native/keyboard";
@Component({
  selector: 'forgot-password-form',
  templateUrl: 'forgot-password-form.html'
})
export class ForgotPasswordFormComponent {

  forgotPasswordForm : FormGroup;
  response: any;
  constructor(private keyboard: Keyboard,private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage) {
    this.response = false;
    this.forgotPasswordForm = fb.group({
        'email' : [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
    });
    this.keyboard.disableScroll(true);
  }


  signupLoad(){this.navCtrl.push(SignupPage)}
  verificationLoad(){this.navCtrl.push(VerificationPage)}

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
              }).then(() => {
                const index = this.navCtrl.getActive().index;
                this.navCtrl.remove(0,index);
              });
            },
            err => {
              this.response = true;
              console.log("Error occurred");
              console.log('message',err.error.error.message);
               if(err.error.error.message=='This email address does not exist.'){
              let alert = this.alertCtrl.create({
                title: 'Success',
                subTitle: 'This email address does not exist!',
                buttons: ['Dismiss']
              });
             alert.present();
            }
            // this.navCtrl.pop();
            else{
              this.navCtrl.push(VerificationPage, {
                userEmail: value.email
              });
            }
            }
          );
}

}
