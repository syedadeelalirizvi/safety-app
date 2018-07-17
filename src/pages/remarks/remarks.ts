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
    inspectionQuestions = [];
    allQuestions = [];
    categories:any;
    subcategories:any;
    questions:any;
    token: string;
    sub_id:any;
    sub_category: any;
    category_id: any;
    public sub_category_name ="false";
    public category_name = "false";
    checkedList = [];
    response :any;
    subcategoryForm
    constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage) {
      this.subdata = navParams.get('data');
      
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

            const headers = new HttpHeaders()
            .set("user_id", this.userid.toString()).set("access_token", this.token);
           
          
            // console.log(this.userid);
            // console.log(this.token);
              
            //  console.log('my data', this.subdata.data);
            this.category_id = this.subdata.data.inspection.categoryId;
            this.categories = this.httpClient.get(ENV.BASE_URL +'equipment-categories/user/'+this.userid+'/category/'+this.category_id,{headers:headers});
            this.categories
            .subscribe(datacategory => {
            //  console.log('category: ',data.data);
              this.category_name = datacategory.data[0].equipmentCategoryName;


          
          // console.log(this.category_id);
                for(var i = 0; i < this.subdata.data.inspectionSubcategories.length; i++) {
                  console.log(i);
                    console.log(this.subdata.data.inspectionSubcategories[i].subCategoryId);
                    
                     this.sub_id = this.subdata.data.inspectionSubcategories[i].subCategoryId;
                    this.subcategories= this.httpClient.get(ENV.BASE_URL +'equipment-sub-categories/category/'+this.category_id+'/subcategory/'+this.sub_id,{headers:headers});
                    this.subcategories
                      .subscribe(datasubcategory => {
                       
                        console.log('subcategory', datasubcategory);
                         this.sub_category_name = datasubcategory.data[0].equipmentSubCategoryName;
                        
                     
            //         // const headers = new HttpHeaders()
            //         // .set("user_id", this.userid.toString()).set("access_token", this.token);
                    
                     this.questions = this.httpClient.get(ENV.BASE_URL +'equipment-questions/subcategory/'+this.sub_id+'/questions',{headers:headers});
                    this.questions
                         .subscribe(dataquestions => {
                           this.inspectionQuestions[i]=[];
                            console.log('questions: ',dataquestions);
            //                for(var j = 0; j < dataquestions.data.length; j++) {
                           
            //               // console.log(data.data[j].equipmentQuestionId);
            //                   this.inspectionQuestions[i].push(
            //                   {
            //                     question_id: dataquestions.data[j].equipmentQuestionId,
            //                     question_title: dataquestions.data[j].equipmentQuestionTitle, 
                      
            //                   });
            //               }
            //               console.log(this.inspectionQuestions[i]);
                        
            // // console.log('subcategoryquestions', this.inspectionQuestions[i].length);  
            //               this.allQuestions.push(
            //               {
            //                   category_name:datacategory.data[0].equipmentCategoryName,
            //                 // sub_category_id: data.category.subCategories[i].equipmentSubCategoryId,
            //                   sub_category_name:datasubcategory.data[0].equipmentSubCategoryName, 
            //                   inspection_questions: this.inspectionQuestions[i]
            //             });    
            //             console.log('subcategoryname',this.sub_category_name);
            //              console.log('categoryname',this.category_name);
                         })
                         
                         })
                        }
                        console.log('all questions', this.allQuestions);
              })
                //console.log('all questions', this.allQuestions);
                //console.log('categoryname',this.category_name);
             })
      console.log('ionViewDidLoad RemarksPage');
    }

}
