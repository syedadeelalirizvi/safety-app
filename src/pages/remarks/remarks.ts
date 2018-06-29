import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';
import { InspectionRemarksPage } from '../inspection-remarks/inspection-remarks';

/**
 * Generated class for the RemarksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-remarks',
  templateUrl: 'remarks.html',
})
export class RemarksPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }    
   goBack(){
    this.navCtrl.pop();
  }
profileLoad = function(){this.navCtrl.push(ProfilePage)}
previousLoad = function(){this.navCtrl.push(PreviousPage)}
informationLoad = function(){this.navCtrl.push(InformationPage)}
informationremarksLoad = function(){this.navCtrl.push(InspectionRemarksPage)}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemarksPage');
  }

}
