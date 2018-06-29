import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';
import { SafetyCatInfoPage} from '../safety-cat-info/safety-cat-info';
import { OwnCatPage} from '../own-cat/own-cat';

/**
 * Generated class for the SafetyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-safety',
  templateUrl: 'safety.html',
})
export class SafetyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
   goBack(){
    this.navCtrl.pop();
  }
profileLoad = function(){this.navCtrl.push(ProfilePage)}
previousLoad = function(){this.navCtrl.push(PreviousPage)}
informationLoad = function(){this.navCtrl.push(InformationPage)}
OwnCatLoad = function(){this.navCtrl.push(OwnCatPage)}
buttonClick = function(){this.navCtrl.push(SafetyCatInfoPage)}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SafetyPage');
  }

}
