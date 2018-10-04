
import { ChiefSfetyApiProvider } from './../../providers/chief-sfety-api/chief-sfety-api';

import { PreviousPage } from './../../pages/previous/previous';

import { LiftingPage } from './../../pages/lifting/lifting';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { AlertController } from 'ionic-angular';
import { Network } from "@ionic-native/network";
@Component({
  selector: 'previous-data',
  templateUrl: 'previous-data.html',
  providers: [ChiefSfetyApiProvider]
})

export class PreviousDataComponent implements OnInit {
  response: any;

  errors: any;
  userid: any;
  user: any;
  inspectionData: any;
  userName: any;
  email: any;
  company: any;
  dept: any;
  token: string;
  inspectionUU: any;
  categoryName: any;
  inspectionDescription: any;
  inspectionDate: any;
  networkStatus : boolean;
  inspections = [];
  inspectionRemarks = [];
  inspectionResults = [];
  reportType : any;
  reportTypeText : any;
  signatureUrl:any;
  signed: any;
  fault_image_url: any;
  

  // sample
  inpspectionId  :any;
  constructor(private network : Network,private ChiefSfetyApiProvider: ChiefSfetyApiProvider, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient, private fb: FormBuilder, private storage: Storage) {
    storage.get('Session.access_token').then((val) => {
      this.token = val;
    });
    storage.get('Session.user_id').then((val) => {
      this.userid = val;
    });
    // Calling the service to load data

  }
  ngOnInit() {
    if(this.network.type == 'none' || this.network.type == 'unknown'){
      this.networkStatus = false;
      console.log("connection off "+this.network.type);
    }
    else{
      this.networkStatus = true;
    }
    console.log("connection on "+this.network.type);
    this.storage.get("Session.user_id").then((value1) => {

      this.userid = value1;

      this.storage.get("Session.access_token").then((value2) => {

        this.token = value2;
        console.log(this.token);

        const headers = new HttpHeaders()
          .set("user_id", this.userid.toString()).set("access_token", this.token);
        this.ChiefSfetyApiProvider.userPreviousInspections(this.userid, headers).subscribe(data => {
          console.log('inspections: ', data);
          this.inspectionData = data;
          this.inspectionUU = data;
          if (this.inspectionUU.inspections && this.inspectionUU.inspections.length) {
            console.log(this.inspectionUU.inspections);
            for (var i = 0; i < this.inspectionUU.inspections.length; i++) {
              console.log(this.inspectionUU.length)
              console.log(this.inspectionUU.inspections[i].inspection.data.createdOn);

              this.inspectionDate = new Date(this.inspectionData.inspections[i].inspection.data.createdOn);
              console.log(this.inspectionData.inspections[i].inspection.data.inspectionId);
              this.inspections.push(
                {
                  inspection_id: this.inspectionData.inspections[i].inspection.data.inspectionId,
                  category_name: this.inspectionData.inspections[i].category.data.equipmentCategoryName,
                  inspection_description: this.inspectionData.inspections[i].inspection.data.inspectionDescription,
                  inspection_date: this.inspectionDate
                });

            }
          }
          console.log('inspectionsData: ', this.inspections);
        }, err => {
          console.log(err);
          this.storage.get(`Session.Offline.previousInspections`).then(data => {
            // Todo : Offline Inspections Not Showing
            // this.storage.get('Session.Offline.inspections').then(OfflineInspections => {
            //   if(OfflineInspections){
            //     console.log(OfflineInspections);
            //   }
            // })
            if (data) {
              console.log('inspections: ', data);
              this.inspectionData =data;
              this.inspectionUU= data;
              if (this.inspectionUU.inspections && this.inspectionUU.inspections.length) {
                //console.log(this.inspectionUU.inspections);
                for (var i = 0; i < this.inspectionUU.inspections.length; i++) {
                  this.inspectionResults[i]=[];
                 // console.log(this.inspectionUU.inspections.length)
                  //console.log(this.inspectionData.inspections[i].category);
                  //console.log(this.inspectionUU.inspections[i].inspection);
                  this.inspectionDate = new Date(this.inspectionData.inspections[i].inspection.data.createdOn);
//                  console.log(this.inspectionData.inspections[i].inspection.data.inspectionId);
                  if (this.inspectionData.inspections[i].inspection.report != null)
                  {  
                                  this.reportType = this.inspectionData.inspections[i].inspection.report.reportType;
                                //  console.log(this.reportType);
                                  if(this.reportType == 'critical'){
                                      this.reportTypeText = 'Fail due to safety critical issue'
                                  }else if(this.reportType == 'observation'){
                                      this.reportTypeText = 'Pass but with an observation'
                                  }else if(this.reportType == 'safe'){
                                      this.reportTypeText = 'Passed and is safe to use'
                                  }                       
                                  this.signatureUrl = this.inspectionData.inspections[i].inspection.report.OfflineSignatureUrl;
                                  this.fault_image_url = this.inspectionData.inspections[i].inspection.report.OfflineMediaUrl;
                                //  console.log("hello fault image "+this.fault_image_url);
                                  
                  }
                  else
                  {
                    this.reportType = null;
                                  this.signatureUrl = null;
                                  this.fault_image_url =null;
                  }	
                            if(this.inspectionData.inspections[i].inspection.data.inspectionStatus=="Completed" || this.inspectionData.inspections[i].inspection.data.inspectionStatus=="Incomplete"){
                                this.signed = false;
                            }
                            else{
                                this.signed = true;
                                this.signatureUrl = this.inspectionData.inspections[i].inspection.report.OfflineSignatureUrl;
                            }
                            //.inspectionData.inspections[i].inspection.data.inspectionId
                            for(var j = 0; j < this.inspectionData.inspections[i].inspection.answers.length; j++) {
                              this.inspectionRemarks[j]=[];

                              //.log("length"+ this.inspectionData.inspections[i].inspection.answers[j].length);
                              
                               for(var k = 0; k < this.inspectionData.inspections[i].inspection.answers[j].length; k++) {
                             // console.log( this.inspectionData.inspections[i].category.subCategories[j].equipmentSubCategoryName);
                               // console.log("hello");
                                   this.inspectionRemarks[j].push(
                                  {
                                      remark_question: this.inspectionData.inspections[i].category.questions[j][k].equipmentQuestionTitle,
                                      remark_answer: this.inspectionData.inspections[i].inspection.answers[j][k].inspectionAnswer, 
                              
                                  });
                        
                               }
                      
                              this.inspectionResults[i].push(
                              {
                                  category_name:this.inspectionData.inspections[i].category.data.equipmentCategoryName, 
                                  sub_category_id: this.inspectionData.inspections[i].category.subCategories[j].equipmentSubCategoryId,
                                  sub_category_name: this.inspectionData.inspections[i].category.subCategories[j].equipmentSubCategoryName, 
                                  inspection_remarks: this.inspectionRemarks[j],
                                  signed : this.signed
                              });
                      
                          }
                  this.inspections.push(
                  
                     {
                     
                          inspection_id: this.inspectionData.inspections[i].inspection.data.inspectionId,
                          category_name: this.inspectionData.inspections[i].category.data.equipmentCategoryName,
                          inspection_description: this.inspectionData.inspections[i].inspection.data.inspectionDescription,
                          inspection_date: this.inspectionDate,
                          shareLinkOfReports : this.inspectionData.inspections[i].inspection.report.reportUrl,
                          equipment_image_url : this.inspectionData.inspections[i].inspection.data.OfflineEquipmentInspectedImageUrl,
                          reportTypeText:  this.reportTypeText,
                          signatureUrl: this.signatureUrl,
                          fault_image_url: this.fault_image_url,
                          subcategories: this.inspectionResults[i], 
                          signed : this.signed
                   
                   
                    }
                  );

                }
              }
              console.log('inspectionsData: ', this.inspections);


              


            } else {
              console.log(`data is not available`);
            }
          })
        })

      })
    }, err => {

    })
    console.log('ionViewDidLoad ProfilePage');


  }

  //   deleteIns( value:any ):void{
  //     console.log('Lifting Clicked'+id); 
  //     this.navCtrl.push(LiftingPage, {
  //       inspectionId: id
  //     }); 
  // }


  deleteIns(value: any): void {
    let alert = this.alertCtrl.create({
      title: 'Confirm delete inspection',
      message: 'Are you sure you want to permanently delete this inspection alongwith its data?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Delete clicked ' + value.inspection_id + " " + this.userid);
            const headers = new HttpHeaders()
              .set("user_id", this.userid.toString())
              .set("access_token", this.token);
            this.ChiefSfetyApiProvider.userPreviousInspectionsDelete(value.inspection_id, headers).subscribe(data => {
              console.log(data);
              this.navCtrl.push(PreviousPage).then(() => {
                const index = this.navCtrl.getActive().index;
                this.navCtrl.remove(0, index);
              });
            }),
              err => {
                console.log("Error occurred");
                console.log(err);
              }

          }
        }
      ]
    });
    alert.present();
  }




  gotoDetails(value:any,id:string) {
    // if(this.networkStatus == false){
      

    // }else{
     
    //   // this.gettingAcurateSpecficDataIfOffline(id);
    
    // }

     console.log( value);
      this.navCtrl.push(LiftingPage, {
        inspectionId: id,
        inpectionDetail : value
      }).then(() => {
        const index = this.navCtrl.getActive().index;
        this.navCtrl.remove(0, index);
      });
   
  }
  gettingAcurateSpecficDataIfOffline(id){
    this.storage.get('Session.Offline.previousInspections').then(responseAllData => {
      console.log(responseAllData);
      // for(var i = 0; responseAllData.inspections.length; i++){
      //     // this.inpspectionId = responseAllData.inspections[i].
      // }
    })
  }


}
