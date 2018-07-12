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
    userid: any;
    token: any;
    category: any;
    categories = [];
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
    this.storage.get("Session.user_id").then((value1) => {
          
      this.userid = value1;

      this.storage.get("Session.access_token").then((value2) => {
    
          this.token = value2;
          console.log(this.token);
          
          const headers = new HttpHeaders()
              .set("user_id", this.userid.toString()).set("access_token", this.token);

          this.category = this.httpClient.get(ENV.BASE_URL +'equipment-categories/user/'+this.userid+'/category',{headers:headers});
          this.category
          .subscribe(data => {
     
              console.log(this.token);
    
              console.log('category: ',data);
              // this.categoryData = data.data;
              for(var i = 0; i < data.data.length; i++) {
                  console.log(data.data[i].equipmentCategoryName);
                  //this.inspectionDate = new Date(this.inspectionData[i].inspection.data.createdOn);
                  this.categories.push(
                  {
                      category_id:data.data[i].equipmentCategoryId,
                      category_name: data.data[i].equipmentCategoryName, 
                     
                  });
       
              }
              // console.log('inspectionsData: ' ,this.inspections);
          })
      })
  })
    console.log('ionViewDidLoad SafetyPage');
  }
  gotoDetails(id:string,name:string){
    console.log('Lifting Clicked'+id); 
    this.navCtrl.push(SafetyCatInfoPage, {
      categoryId: id,
      category_name: name,
      inspectionDescription: this.inspection_desc,
      imageData:this.equipment_image
    }); 
}
}
