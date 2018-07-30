import { Keyboard } from '@ionic-native/keyboard';

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';
import { WorkPage } from '../work/work';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor(private keyboard:Keyboard,public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
		keyboard.disableScroll(true);
  }
  
  logout(){
	console.log('logout');  
	// clearing up sessions values 
	this.storage.ready().then(() => {
		this.storage.remove('Session.user_name').then(() => { console.log('deleted')});
		this.storage.remove('Session.user_id');
		this.storage.remove('Session.access_token');
		this.storage.remove('Session.token_expiry');
		this.storage.remove('Session.profile_pic');
		this.storage.remove('Session.company_logo');	
		this.storage.clear();  
	});	
	this.navCtrl.pop();
    
  }


//profileLoad = function(){this.navCtrl.push(PassObservationPage); console.log('click');}  
profileLoad = function(){this.navCtrl.push(ProfilePage)}
previousLoad = function(){this.navCtrl.push(PreviousPage)}
informationLoad = function(){this.navCtrl.push(InformationPage)}
workLoad = function(){this.navCtrl.push(WorkPage)}

}
