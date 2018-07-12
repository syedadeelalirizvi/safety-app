import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';
import { InspectionRemarksPage } from '../inspection-remarks/inspection-remarks';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl,FormArray,FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-remarks',
  templateUrl: 'remarks.html',
})
export class RemarksPage {
  categoryId : any;
  categoryName : any;
  subdata: any = {};
  userid: any;
  user: any;
  token: string;
  sub_category: any;
  subCategories = [];
  checkedList = [];
  response :any;
  subcategoryForm
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage) {
    this.subdata = navParams.get('data');
    console.log('my data', this.subdata.data);
  }    
   goBack(){
    this.navCtrl.pop();
  }
profileLoad = function(){this.navCtrl.push(ProfilePage)}
previousLoad = function(){this.navCtrl.push(PreviousPage)}
informationLoad = function(){this.navCtrl.push(InformationPage)}
informationremarksLoad = function(){this.navCtrl.push(InspectionRemarksPage)}

  ionViewDidLoad() {
    this.storage.get("Session.access_token").then((value2) => {
      
        this.token = value2;
    })

    this.storage.get("Session.user_id").then((value1) => {
        this.userid = value1;
        console.log(this.userid);
        console.log(this.token);
        


    //  for(var i = 0; i < this.data.inspectionSubcategories.length; i++) {
    //    console.log(this.data.inspectionSubcategories[i].subCategoryId)
  //     this.inspectionRemarks[i]=[];
      
  //     for(var j = 0; j < data.inspection.answers[i].length; j++) {

  //         this.inspectionRemarks[i].push(
  //         {
  //             remark_question: data.category.questions[i][j].equipmentQuestionTitle,
  //             remark_answer: data.inspection.answers[i][j].inspectionAnswer, 
      
  //         });

  //     }

  //     this.inspectionsResults.push(
  //     {
  //         category_name:data.category.data.equipmentCategoryName, 
  //         sub_category_id: data.category.subCategories[i].equipmentSubCategoryId,
  //         sub_category_name: data.category.subCategories[i].equipmentSubCategoryName, 
  //         inspection_remarks: this.inspectionRemarks[i]
  //     });

 // }
  //  console.log(this.inspectionsResults);
    })
    

    console.log('ionViewDidLoad RemarksPage');
  }

}
