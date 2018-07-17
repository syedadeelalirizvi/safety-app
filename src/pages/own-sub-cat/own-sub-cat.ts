import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';


@IonicPage()
@Component({
  selector: 'page-own-sub-cat',
  templateUrl: 'own-sub-cat.html',
})
export class OwnSubCatPage {
 

    constructor(public navCtrl: NavController, public navParams: NavParams ){
  
    }
   goBack(){
    this.navCtrl.pop();
  }
profileLoad = function(){this.navCtrl.push(ProfilePage)}
previousLoad = function(){this.navCtrl.push(PreviousPage)}
informationLoad = function(){this.navCtrl.push(InformationPage)}

  ionViewDidLoad() {
    

    console.log('ionViewDidLoad OwnSubCatPage');
  }
  addQuestion(){
   console.log('Add clicked.');
  //  <ion-row class="row"><ion-col col-12 ><ion-input type="text" value="Additional Question" ></ion-input></ion-col></ion-row>
  var dummy = '	<ion-row><ion-col col-12 ><ion-input type="text" value="Additional Question" </ion-input></ion-col></ion-row></br>';
  var div = document.getElementById( 'wrapper' );
  div.insertAdjacentHTML( 'beforeend', dummy );
  //document.getElementById('wrapper').innerHTML += dummy;      
 }
}
