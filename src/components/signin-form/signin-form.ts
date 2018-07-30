import { HomePage } from './../../pages/home/home';

import { Component, ReflectiveInjector } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MainPage} from './../../pages/main/main';
import { SignupPage } from './../../pages/signup/signup';
import { ForgotPasswordPage } from './../../pages/forgot-password/forgot-password';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import  firebase  from "firebase";
@Component({
  selector: 'signin-form',
  templateUrl: 'signin-form.html'
})
export class SigninFormComponent {
	mainPage= MainPage;
  loginForm = {};
	authForm : FormGroup;
	response: any;

  constructor(public navCtrl: NavController,  private httpClient: HttpClient,  public navParams: NavParams, private fb: FormBuilder, private storage: Storage) {
  // Test API call (https://ionicacademy.com/http-calls-ionic/)
      // for form validations (https://kamleshcode.com/form-validation-ionic3/)
      /*
      this.films = this.httpClient.get('https://swapi.co/api/films');
      this.films
      .subscribe(data => {
        console.log('my data: ', data);
      })
      */
		//  this.auth.getUser().then(user =>{
		// 		this.navCtrl.push(MainPage)
		// })
		console.log(ENV.BASE_URL);
		this.response = false;
		this.authForm = fb.group({
		  'email' : [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
		  'password': [null, Validators.compose([Validators.required, Validators.minLength(8) ])]
		});





	
	}


 
  	//load(){}
	forgotPasswordLoad(){this.navCtrl.push(ForgotPasswordPage)}
  signupLoad(){this.navCtrl.push(SignupPage)}
  

  submitForm(value: any):void{
		console.log('Form submitted!')
		console.log(value.email);
		const req = this.httpClient.post(ENV.BASE_URL + 'users/app/login', {
						userEmail: value.email,
						userPassword: value.password
					})
					.subscribe((res: any) => {
							
									console.log(res);
									this.storage.set('Session.userEmail', value.email);
									this.storage.set('Session.user_name', res.data.userName);
									this.storage.set('Session.user_id', res.data.userId);
									this.storage.set('Session.access_token', res.data.token);
									this.storage.set('Session.token_expiry', res.data.expiry);
									this.storage.set('Session.profile_pic', res.data.profilePicture);
									this.storage.set('Session.company_logo', res.data.companyLogo);
						
										this.navCtrl.push(MainPage);
														
						
				},err => {
							this.response = true;
							console.log("Error occurred");
							console.log(err);
						
						}
					);		
  }	
  



}

