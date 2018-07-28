import { MainPage } from './../main/main';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import firebase from 'firebase';
import { Storage } from "@ionic/storage";
import { Keyboard } from "@ionic-native/keyboard";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



	//res.data:any;
	
	constructor(private keyboard : Keyboard , public storage : Storage , public navCtrl : NavController) {
		keyboard.disableScroll(true);
	}

}