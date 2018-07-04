import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MainPage} from '../main/main';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	mainPage= MainPage;

	loginForm = {};
	authForm : FormGroup;
	response: any;
	//res.data:any;
	constructor(public navCtrl: NavController,  private httpClient: HttpClient,  public navParams: NavParams, private fb: FormBuilder, private storage: Storage) {
		// Test API call (https://ionicacademy.com/http-calls-ionic/)
		// for form validations (https://kamleshcode.com/form-validation-ionic3/)
		/*
		this.films = this.httpClient.get('https://swapi.co/api/films');
		this.films
>>>>>>> a7fb9d6b45ec0907c2e764426bd3cf3a1c2f57df
		.subscribe(data => {
		  console.log('my data: ', data);
		})
		*/
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
		const req = this.httpClient.post('http://clients3.5stardesigners.net/safetyapp/api/web/v1/users/app/login', {
						userEmail: value.email,
						userPassword: value.password
					})
					.subscribe(
						res => {
							console.log(res);
							// Initializing session information
							this.storage.set('Session.user_name', res.data.userName);
							this.storage.set('Session.user_id', res.data.userId);
							this.storage.set('Session.access_token', res.data.token);
							this.storage.set('Session.token_expiry', res.data.expiry);
							this.storage.set('Session.profile_pic', res.data.profilePicture);
							this.storage.set('Session.company_logo', res.data.companyLogo);
							this.navCtrl.push(MainPage);
						},
						err => {
							this.response = true;
							console.log("Error occurred");
							console.log(err);
						}
					);		
	}	
}