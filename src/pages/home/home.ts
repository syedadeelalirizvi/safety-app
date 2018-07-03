import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MainPage} from '../main/main';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	mainPage= MainPage;
	loginForm = {}
	user:any;
	constructor(public navCtrl: NavController,  private httpClient: HttpClient) {
		// Test API call
		this.user = this.httpClient.get('https://swapi.co/api/films');
		this.user
		.subscribe(data => {
		  console.log('my data: ', data);
		})
	}
	
	

	//load(){}
	forgotPasswordLoad(){this.navCtrl.push(ForgotPasswordPage)}
	signupLoad(){this.navCtrl.push(SignupPage)}

	logForm() {
		console.log(this.loginForm)
		this.navCtrl.push(MainPage)
	}
  


}