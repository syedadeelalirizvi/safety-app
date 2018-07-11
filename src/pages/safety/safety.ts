import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';
import { SafetyCatInfoPage} from '../safety-cat-info/safety-cat-info';
import { OwnCatPage} from '../own-cat/own-cat';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-safety',
  templateUrl: 'safety.html',
})
export class SafetyPage {
    inspection_desc: any;
    equipment_image: any;
    constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage,private camera: Camera ) {
      this.inspection_desc = navParams.get('inspectionDescription');
      this.equipment_image = navParams.get('imageData');
      console.log(this.inspection_desc+" ");   
    }
   goBack(){
    this.navCtrl.pop();
  }
profileLoad = function(){this.navCtrl.push(ProfilePage)}
previousLoad = function(){this.navCtrl.push(PreviousPage)}
informationLoad = function(){this.navCtrl.push(InformationPage)}
OwnCatLoad = function(){
  this.navCtrl.push(OwnCatPage, {
    inspectionDescription: this.inspection_desc,
    imageData:this.equipment_image
  });
}
buttonClick = function(){this.navCtrl.push(SafetyCatInfoPage)}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SafetyPage');
  }

}
