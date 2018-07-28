import { MainPage } from './../main/main';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from "firebase";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	
	constructor(private keyboard : Keyboard, public storage : Storage,public navCtrl : NavController) {
		keyboard.disableScroll(true);
	}

		
		ionViewWillEnter() {
			firebase.auth().onAuthStateChanged(user => {
				if(user){
					firebase.database().ref(`profile/${user.uid}`).once('value').then(snapshot => {
						this.storage.set('Session.user_name', snapshot.val().userName);
						this.storage.set('Session.user_id', snapshot.val().userId);
						this.storage.set('Session.access_token', snapshot.val().token);
						this.storage.set('Session.token_expiry', snapshot.val().expiry);
						this.storage.set('Session.profile_pic', snapshot.val().profilePicture);
						this.storage.set('Session.company_logo',snapshot.val().companyLogo);
						console.log(snapshot.val());
					})
					this.navCtrl.push(MainPage);
				}
			})
	}

}