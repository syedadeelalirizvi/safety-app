import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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


@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
    forgotPasswordForm : FormGroup;
    response: any;

    constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage ){
     
  
    }
    goBack(){
      this.navCtrl.pop();
    }
  
   
}
