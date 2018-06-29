import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';
import { RemarksPage} from '../remarks/remarks';
import { OwnSubCatPage} from '../own-sub-cat/own-sub-cat';


/**
 * Generated class for the SafetyCatInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-safety-cat-info',
  templateUrl: 'safety-cat-info.html',
})
export class SafetyCatInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
     goBack(){
    this.navCtrl.pop();
  }
profileLoad = function(){this.navCtrl.push(ProfilePage)}
previousLoad = function(){this.navCtrl.push(PreviousPage)}
informationLoad = function(){this.navCtrl.push(InformationPage)}
remarksLoad = function(){this.navCtrl.push(RemarksPage)}
OwnCatLoad = function(){this.navCtrl.push(OwnSubCatPage)}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SafetyCatInfoPage');
  }

}
