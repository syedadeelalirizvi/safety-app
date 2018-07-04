import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';
import { WorkPage } from '../work/work';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

  }
  goBack(){
	// clearing up sessions values  
	this.storage.remove('Session.user_name');
	this.storage.remove('Session.user_id');
	this.storage.remove('Session.access_token');
	this.storage.remove('Session.token_expiry');
	this.storage.remove('Session.profile_pic');
	this.storage.remove('Session.company_logo');	
	this.storage.clear();  
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
   console.log('ionViewDidLoad MainPage');
  }

profileLoad = function(){this.navCtrl.push(ProfilePage)}
previousLoad = function(){this.navCtrl.push(PreviousPage)}
informationLoad = function(){this.navCtrl.push(InformationPage)}
workLoad = function(){this.navCtrl.push(WorkPage)}

}
