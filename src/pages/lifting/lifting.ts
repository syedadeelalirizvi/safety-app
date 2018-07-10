import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { SetpasswordPage } from '../setpassword/setpassword';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
/**
 * Generated class for the LiftingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lifting',
  templateUrl: 'lifting.html',
})
export class LiftingPage {
  inspectionId : any;
  userid: any;
  user: any;
  token: any;

  category_name:any;
  inspection_description: any;
  inspection_date:any;
  equipment_image_url:any;
  inspection_id:any;
  count_sub_categories:any;
  
  inspectionsResults = [];
  inspectionRemarks = [];
  subCategories = [];
  reportType : any;
  signatureUrl:any;
  signed: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage ){
  
    this.inspectionId = navParams.get('inspectionId');
    console.log(this.inspectionId);
  }
 goBack(){
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    this.storage.get("Session.access_token").then((value2) => {
      
      this.token = value2;
     // console.log(this.token);
    })
    //console.log('ionViewDidLoad LiftingPage');
    this.storage.get("Session.user_id").then((value1) => {
      this.userid = value1;
      const headers = new HttpHeaders({
    
        'Access-Control-Allow-Headers' : '*, access_token, user_id', 
       'Access-Control-Allow-Origin':'*',
       'Content-Type': 'application/json',
         'user_id':this.userid, 
        'access_token':this.token,
         'Accept':'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS'
        //     'user_id':'15'
      }
      );
      //http://clients3.5stardesigners.net/safetyapp/api/web/v1/user-inspections/user/61/inspection/27
    
      this.user = this.httpClient.get(ENV.BASE_URL +'user-inspections/user/'+this.userid+'/inspection/'+this.inspectionId,{headers:headers});
      this.user
      .subscribe(data => {
      //  console.log(headers.get('user_id'));
       // console.log(this.token);
        //console.log('my data: ', data);
        //console.log('category', data.category);
        //this.category_name = data.category.e
        this.inspection_id=data.inspection.data.inspectionId;
        this.category_name=data.category.data.equipmentCategoryName; 
        this.inspection_description= data.inspection.data.inspectionDescription;
        this.inspection_date= new Date(data.inspection.data.createdOn);
        this.equipment_image_url = data.inspection.data.equipmentInspectedImageUrl;
        this.reportType = data.inspection.report.reportType;
        this.signatureUrl = data.inspection.report.signatureUrl;

        if(data.inspection.data.inspectionStatus=="Completed" || data.inspection.data.inspectionStatus=="Incomplete"){
         this.signed = false;
        }
        else{
          this.signed = true;
          this.signatureUrl = data.inspection.report.signatureUrl;
        }
        for(var i = 0; i < data.category.subCategories.length; i++) {
          // console.log(this.inspectionData[i].inspection.data.inspectionDescription);
          // console.log(this.inspectionData[i].category.data.equipmentCategoryName);
           //console.log(i);
          // console.log(data.category.subCategories[i].equipmentSubCategoryName );
           this.subCategories.push(
             {
             sub_category_id: data.category.subCategories[i].equipmentSubCategoryId,
             sub_category_name: data.category.subCategories[i].equipmentSubCategoryName, 
              // inspection_description: this.inspectionData[i].inspection.data.inspectionDescription,
               //inspection_date: this.inspectionData[i].inspection.data.createdOn
             }
          );
        
         }
         for(var i = 0; i < data.inspection.answers.length; i++) {
          this.inspectionRemarks[i]=[];
          for(var j = 0; j < data.inspection.answers[i].length; j++) {
            
            
            // console.log(this.inspectionData[i].inspection.data.inspectionDescription);
            // console.log(this.inspectionData[i].category.data.equipmentCategoryName);
             //console.log(i);
             //console.log(data.inspection.answers[i][j].inspectionAnswer);
             this.inspectionRemarks[i].push(
               
               {
               remark_question: data.category.questions[i][j].equipmentQuestionTitle,
               remark_answer: data.inspection.answers[i][j].inspectionAnswer, 
                // inspection_description: this.inspectionData[i].inspection.data.inspectionDescription,
                 //inspection_date: this.inspectionData[i].inspection.data.createdOn
               }
              
  
            );
          
           }
          // console.log("hello");
          // console.log(this.inspectionData[i].inspection.data.inspectionDescription);
          // console.log(this.inspectionData[i].category.data.equipmentCategoryName);
           //console.log(i);
          // console.log(data.category.subCategories[i].equipmentSubCategoryName );
         this.inspectionsResults.push(
           {
          category_name:data.category.data.equipmentCategoryName, 
          sub_category_id: data.category.subCategories[i].equipmentSubCategoryId,
          sub_category_name: data.category.subCategories[i].equipmentSubCategoryName, 
            inspection_remarks: this.inspectionRemarks[i]
        }
              // inspection_description: this.inspectionData[i].inspection.data.inspectionDescription,
               //inspection_date: this.inspectionData[i].inspection.data.createdOn
             

         );
        
        }
       console.log(this.inspectionsResults);
         //console.log(this.inspectionsResults);
         



         //console.log(this.subCategories[0]);


      })
     
      })





  }

}
