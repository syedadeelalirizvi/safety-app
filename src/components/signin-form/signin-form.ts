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
	ionViewCanEnter(){
	
		firebase.auth().onAuthStateChanged(user => {
		if(!user){
		 return	console.log('user isnt login')
		}else{
			firebase.database().ref(`profile/${user.uid}`).once('value').then(snapshot => {
				this.storage.set('Session.user_name', snapshot.val().userName);
				this.storage.set('Session.user_id', snapshot.val().userId);
				this.storage.set('Session.access_token', snapshot.val().token);
				this.storage.set('Session.token_expiry', snapshot.val().expiry);
				this.storage.set('Session.profile_pic', snapshot.val().profilePicture);
				this.storage.set('Session.company_logo',snapshot.val().companyLogo);
				console.log(snapshot.val());
			})
		
		}	return this.navCtrl.push(this.mainPage);
	})

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
							firebase.auth().signInWithEmailAndPassword(value.email,value.password).then(afAuth => {
								console.log
								firebase.database().ref(`profile/${afAuth.uid}/signAuthdataForSession/`).set({
									accessToken : res.data.token.toString(),
									expiryToken:  res.data.expiry.toString(),
								}).then(afdb => {
									console.log(res);
									// Initializing session information
									this.storage.set('Session.user_name', res.data.userName);
									this.storage.set('Session.user_id', res.data.userId);
									this.storage.set('Session.access_token', res.data.token);
									this.storage.set('Session.token_expiry', res.data.expiry);
									this.storage.set('Session.profile_pic', res.data.profilePicture);
									this.storage.set('Session.company_logo', res.data.companyLogo);
									// for firebase app
										this.navCtrl.push(MainPage);
								})
									
								})
						
				},err => {
							this.response = true;
							console.log("Error occurred");
							console.log(err);
						
						}
					);		
  }	
  



}

