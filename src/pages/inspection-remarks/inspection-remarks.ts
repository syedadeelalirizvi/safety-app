import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';
import { PassSafePage} from '../pass-safe/pass-safe';
import { PassObservationPage} from '../pass-observation/pass-observation';
import { FailDuePage} from '../fail-due/fail-due';

/**
 * Generated class for the InspectionRemarksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inspection-remarks',
  templateUrl: 'inspection-remarks.html',
})
export class InspectionRemarksPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
   goBack(){
    this.navCtrl.pop();
  }

  profileLoad = function(){this.navCtrl.push(ProfilePage)}
previousLoad = function(){this.navCtrl.push(PreviousPage)}
informationLoad = function(){this.navCtrl.push(InformationPage)}
passSafeLoad = function(){this.navCtrl.push(PassSafePage)}
passObservationLoad = function(){this.navCtrl.push(PassObservationPage)}
failDueLoad = function(){this.navCtrl.push(FailDuePage)}

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectionRemarksPage');
  }

}
