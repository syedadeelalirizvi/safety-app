import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';
import { RemarksPage} from '../remarks/remarks';
import { OwnSubCatPage} from '../own-sub-cat/own-sub-cat';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl,FormArray,FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-safety-cat-info',
  templateUrl: 'safety-cat-info.html',
})
export class SafetyCatInfoPage {
  categoryId : any;
  categoryName : any;
  inspection_desc: any;
  equipment_image: any;
  userid: any;
  user: any;
  token: string;
  sub_category: any;
  subCategories = [];
  checkedList = [];
  response :any;
  subcategoryForm
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage) {
  
    this.categoryId = navParams.get('categoryId');
    this.categoryName = navParams.get('category_name');
    this.inspection_desc = navParams.get('inspectionDescription');
    this.equipment_image = navParams.get('imageData');
    storage.get('Session.access_token').then((val) => {
         this.token = val;
    });
    storage.get('Session.user_id').then((val) => {
        this.userid = val;
    });
    console.log(this.categoryId);


    this.subcategoryForm = this.fb.group({
      subcategories: this.fb.array([])
    });
  }
     goBack(){
    this.navCtrl.pop();
  }
profileLoad = function(){this.navCtrl.push(ProfilePage)}
previousLoad = function(){this.navCtrl.push(PreviousPage)}
informationLoad = function(){this.navCtrl.push(InformationPage)}
//remarksLoad = function(){this.navCtrl.push(RemarksPage)}
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
                  //console.log(data.data[i].equipmentCategoryName);
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

  clickSelectBox(subcategory:any){
    console.log(subcategory);
     const foundAt = this.checkedList.indexOf(subcategory.sub_category_id);
     console.log(foundAt);
     if (foundAt >= 0) {
        this.checkedList.splice(foundAt, 1);
     } else {
        this.checkedList.push(subcategory.sub_category_id);
    }
    console.log(this.checkedList);

}
list(value: any):void{
  console.log('Next clicked');
  console.log(this.checkedList);
  console.log(this.inspection_desc+" "+this.equipment_image);

  const headers =  new HttpHeaders()
  .set("user_id", this.userid.toString()).set("access_token", this.token);
 // http://clients3.5stardesigners.net/safetyapp/api/web/v1/user-inspections/user/16/category/50/inspection
  const req = this.httpClient.post(ENV.BASE_URL +'user-inspections/user/'+this.userid+'/category/'+this.categoryId+'/inspection', {
     equipmentInspectedImageUrl: this.equipment_image,
     inspectionDescription :this.inspection_desc,
     subCategory: this.checkedList
      //newPassword: value.newPassword
  },
  {headers:headers})
  .subscribe(data => {
      //console.log(data.data.inspection);
      console.log(data);
	  
      this.navCtrl.push(RemarksPage, {
        // inspectionDescription: this.inspection_desc,
        // imageData:this.equipment_image
        data:data
      });
    },
    err => {
      this.response = true;
      console.log("Error occurred");
      console.log(err);

    }
 );

}


}
