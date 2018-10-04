import { MainPage } from './../main/main';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
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

	ionViewCanEnter() {
		this.storage.get('Session.Offline.inspections').then(Offlineinspections => {
			console.log(Offlineinspections)
		})
		this.storage.ready().then(() => {
		this.storage.get('Session.access_token').then((val) => {
			//console.log(val + "ionViewWillEnter")
			if (val !== null){
				this.navCtrl.push(MainPage);
			}
		})
		});
        console.log('page loaded');
    }

}