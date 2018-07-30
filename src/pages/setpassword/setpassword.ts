import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { Keyboard } from "@ionic-native/keyboard";
@Component({
  selector: 'page-setpassword',
  templateUrl: 'setpassword.html',
})
export class SetpasswordPage {
		setPasswordForm : FormGroup;
		response: any;
		email:any;
		constructor(private Keyboard: Keyboard,public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage ){
				this.email = navParams.get('userEmail');
				this.response = false;
				this.setPasswordForm = fb.group({
			//	  'email' : [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
					'password': [null, Validators.compose([Validators.required, Validators.minLength(8) ])],
					'confirmPass': [null, Validators.compose([Validators.required, Validators.minLength(8) ])]
					
				});
				Keyboard.disableScroll(true);
		}
		setPassword(value: any):void{
				console.log(value.password);
				console.log('Forgot Pass clicked');
				console.log(this.email);
				console.log('Form submitted!')
			//	console.log(value.email);
				const req = this.httpClient.post(ENV.BASE_URL +'users/app/code-change-password', {
								userEmail: this.email,
								newPassword: value.password
							})
							.subscribe(
								res => {
									console.log(res);
									this.navCtrl.push(HomePage);
								},
								err => {
									this.response = true;
									console.log("Error occurred");
									console.log(err);
									//this.navCtrl.push(VerificationPage)
								}
							);
		}
		signupLoad(){this.navCtrl.push(SignupPage)}
		homeLoad(){this.navCtrl.push(HomePage)}

		ionViewDidLoad() {
			console.log('ionViewDidLoad SetpasswordPage');
		}
		goBack(){
			this.navCtrl.pop();
		}

}
