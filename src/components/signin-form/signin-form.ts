import { ChiefSfetyApiProvider } from './../../providers/chief-sfety-api/chief-sfety-api';

import { Keyboard } from '@ionic-native/keyboard';
import { Component, ReflectiveInjector } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { MainPage} from './../../pages/main/main';
import { SignupPage } from './../../pages/signup/signup';
import { ForgotPasswordPage } from './../../pages/forgot-password/forgot-password';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { DeviceAccounts } from "@ionic-native/device-accounts";
import { GooglePlus } from "@ionic-native/google-plus";

@Component({
  selector: 'signin-form',
  templateUrl: 'signin-form.html',
  providers : [ChiefSfetyApiProvider]
})
export class SigninFormComponent {
	mainPage= MainPage;
  loginForm = {};
	authForm : FormGroup;
	response: any;
	categories : any;
	categories_info ="";
	VirtualCategories : any;
  constructor(private chiefSfetyApi: ChiefSfetyApiProvider,private alrtCtrl : AlertController,private keyboard: Keyboard,public googlePlus : GooglePlus,public loadCtrl : LoadingController,public navCtrl: NavController,  private httpClient: HttpClient,  public navParams: NavParams, private fb: FormBuilder, private storage: Storage) {

		console.log(ENV.BASE_URL);
		this.response = false;
		this.authForm = fb.group({
		  'email' : [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
		  'password': [null, Validators.compose([Validators.required, Validators.minLength(8) ])]
		});

		this.keyboard.disableScroll(true);



	
	}


 
  	//load(){}
	forgotPasswordLoad(){this.navCtrl.push(ForgotPasswordPage)}
  signupLoad(){this.navCtrl.push(SignupPage)}
  

  submitForm(value: any):void{
		const loadCtrlStart = this.loadCtrl.create({
			content: 'Please wait...'
		});
		loadCtrlStart.present();
		console.log('Form submitted!')
		console.log(value.email);
	
					this.chiefSfetyApi.authenticationLogin(value.email,value.password).subscribe((res:any) => {
						loadCtrlStart.dismiss();
									//console.log(res);
									if(res.error){
										this.alrtCtrl.create({
											title : 'Your account is inactive',
											message : 'Your account has been deactivated. Please check your email of invoice to activate your account',
											buttons :[
												{ text : 'Ok', }
											]
										}).present();
									}else{
										const headers = new HttpHeaders()
        									    .set("user_id", res.data.userId.toString()).set("access_token",res.data.token);
											this.chiefSfetyApi.getUserProfileData(res.data.userId,headers).subscribe(profileData => {
												this.storage.set('Session.Offline.userProfile',profileData);
											})
											this.chiefSfetyApi.userPreviousInspections(res.data.userId,headers).subscribe(previousInspections =>{
												this.storage.set('Session.Offline.previousInspections',previousInspections);
											})
											this.chiefSfetyApi.getSpecificUserCategory(res.data.userId,headers).subscribe((userCategory : any) => {
												
												this.categories = userCategory;
		
												 for(var i = 0; i < userCategory.data.length; i ++) {
													 this.categories_info +=  userCategory.data[i].equipmentCategoryId+',';
													
													this.VirtualCategories  = userCategory
										
												 }
												 this.categories_info = this.categories_info.substring(0, this.categories_info.length - 1);
												 console.log(this.categories_info);
												 this.chiefSfetyApi.testChiefSfety(this.categories_info,headers).subscribe(resp => {
													console.log(resp);
													this.storage.set(`Session.Offline.userCategory`,resp);
												})
												 //	console.log(this.categories_info);
											})
										
										
										this.storage.set('Session.userEmail', value.email);
										this.storage.set('Session.user_name', res.data.userName);
										this.storage.set('Session.user_id', res.data.userId);
										this.storage.set('Session.access_token', res.data.token);
										this.storage.set('Session.token_expiry', res.data.expiry);
										this.storage.set('Session.profile_pic', res.data.profilePicture);
										this.storage.set('Session.company_logo', res.data.companyLogo);
							
											this.navCtrl.push(MainPage).then(() => {
												const index = this.navCtrl.getActive().index;
												this.navCtrl.remove(0,index);
											});
									}
								
														
						
				},err => {
					loadCtrlStart.dismiss();
							this.response = true;
							console.log("Error occurred");
							console.log(err);
						
						}
					);		
  }	
	
	// getEmail(){	
	// 	this.googlePlus.login({}).then(res => {
	// 		console.log(res);
	// 	}).catch(err => console.log(err));
	// }


}

