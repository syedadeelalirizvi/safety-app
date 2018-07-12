import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';
import { RemarksPage} from '../remarks/remarks';
import { OwnSubCatPage} from '../own-sub-cat/own-sub-cat';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';

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
  categoryId : any;
  categoryName : any;
  userid: any;
  user: any;
  token: string;
  sub_category: any;
  subCategories = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage) {
  
    this.categoryId = navParams.get('categoryId');
    this.categoryName = navParams.get('category_name');

    storage.get('Session.access_token').then((val) => {
         this.token = val;
    });
    storage.get('Session.user_id').then((val) => {
        this.userid = val;
    });
    console.log(this.categoryId);
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
    this.storage.get("Session.user_id").then((value1) => {
          
      this.userid = value1;

      this.storage.get("Session.access_token").then((value2) => {
    
          this.token = value2;
          console.log(this.token);
          console.log(ENV.BASE_URL +'equipment-sub-categories/category/'+this.categoryId+'/subcategory');
          const headers = new HttpHeaders()
              .set("user_id", this.userid.toString()).set("access_token", this.token);

          this.sub_category = this.httpClient.get(ENV.BASE_URL +'equipment-sub-categories/category/'+this.categoryId+'/subcategory',{headers:headers});
          this.sub_category
          .subscribe(data => {
     
              console.log(this.token);
    
              console.log('subcategory: ',data);
              // this.categoryData = data.data;
              for(var i = 0; i < data.data.length; i++) {
                  console.log(data.data[i].equipmentCategoryName);
                  //this.inspectionDate = new Date(this.inspectionData[i].inspection.data.createdOn);
                  this.subCategories.push(
                  {
                      sub_category_id:data.data[i].equipmentSubCategoryId,
                      sub_category_name: data.data[i].equipmentSubCategoryName, 
                     
                  });
       
              }
              // console.log('inspectionsData: ' ,this.inspections);
          })
      })
  })
    console.log('ionViewDidLoad SafetyCatInfoPage');
  }

}
