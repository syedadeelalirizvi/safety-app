
import { PreviousPage } from './../previous/previous';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { SetpasswordPage } from '../setpassword/setpassword';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { SocialSharing } from "@ionic-native/social-sharing";
import { EmailComposer } from "@ionic-native/email-composer";
@Component({
  selector: 'page-lifting',
  templateUrl: 'lifting.html',
})
export class LiftingPage {
    inspectionId : any;
    userid: any;
    user: any;
    token: string;

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
    fault_image_url: any;
    shareLinkOfReports : any;
    constructor(private emailComp: EmailComposer,public alertCtrl : AlertController,public socialShare :  SocialSharing,public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage ){
  
        this.inspectionId = navParams.get('inspectionId');

        storage.get('Session.access_token').then((val) => {
             this.token = val;
        });
        storage.get('Session.user_id').then((val) => {
            this.userid = val;
        });
        console.log(this.inspectionId);
    }
    goBack(){
        this.navCtrl.push(PreviousPage).then(() => {
            const index = this.navCtrl.getActive().index;
			this.navCtrl.remove(0,index);
        });
    }

    ionViewDidLoad() {
        this.storage.get("Session.access_token").then((value2) => {
          
            this.token = value2;
        })
    
        this.storage.get("Session.user_id").then((value1) => {
            this.userid = value1;
                
            const headers =  new HttpHeaders()
                .set("user_id", this.userid.toString()).set("access_token", this.token);
                
                this.user = this.httpClient.get(ENV.BASE_URL +'user-inspections/user/'+this.userid+'/inspection/'+this.inspectionId,{headers:headers});
                this.user
                .subscribe((data:any) => {
					    console.log("Response Data");
                        console.log(data.inspection.report.reportUrl);
                        this.shareLinkOfReports = data.inspection.report.reportUrl;
                      this.inspection_id=data.inspection.data.inspectionId;
                      this.category_name=data.category.data.equipmentCategoryName; 
                      this.inspection_description= data.inspection.data.inspectionDescription;
                      this.inspection_date= new Date(data.inspection.data.createdOn);
                      this.equipment_image_url = data.inspection.data.equipmentInspectedImageUrl;
                      
						if (data.inspection.report !== null)
						{  
							this.reportType = data.inspection.report.reportType;
                            this.signatureUrl = data.inspection.report.signatureUrl;
                            this.fault_image_url = data.inspection.report.mediaUrl;
                            console.log(this.fault_image_url);
                            
						}
						else
						{
							this.reportType = null;
                            this.signatureUrl = null;
                            this.fault_image_url =null;
						}	
                      if(data.inspection.data.inspectionStatus=="Completed" || data.inspection.data.inspectionStatus=="Incomplete"){
                          this.signed = false;
                      }
                      else{
                          this.signed = true;
                          this.signatureUrl = data.inspection.report.signatureUrl;
                      }
                      for(var i = 0; i < data.category.subCategories.length; i++) {
                       
                          this.subCategories.push(
                          {
                              sub_category_id: data.category.subCategories[i].equipmentSubCategoryId,
                              sub_category_name: data.category.subCategories[i].equipmentSubCategoryName, 
                          
                          });
                      
                      }

                      for(var i = 0; i < data.inspection.answers.length; i++) {
                          this.inspectionRemarks[i]=[];
                          
                          for(var j = 0; j < data.inspection.answers[i].length; j++) {
            
                              this.inspectionRemarks[i].push(
                              {
                                  remark_question: data.category.questions[i][j].equipmentQuestionTitle,
                                  remark_answer: data.inspection.answers[i][j].inspectionAnswer, 
                          
                              });
                    
                          }
                  
                          this.inspectionsResults.push(
                          {
                              category_name:data.category.data.equipmentCategoryName, 
                              sub_category_id: data.category.subCategories[i].equipmentSubCategoryId,
                              sub_category_name: data.category.subCategories[i].equipmentSubCategoryName, 
                              inspection_remarks: this.inspectionRemarks[i]
                          });
                  
                      }
                       console.log(this.inspectionsResults);
                })
        })
    }
    // sharing on others
    shareThisRepo(){
        // const email = {
        //     to: '',
        //     cc: '',
        //     bcc: ['', ''],
        //     attachments: [
        //       `${this.shareLinkOfReports}.pdf`
        //     ],
        //     subject: '"Chief safety inspection report',
        //     body: 'Please click on this link to see inspection file',
        //     isHtml: true
        // }
        // this.emailComp.open(email);
        this.socialShare.shareViaEmail('Please click on this link to see inspection file','Chief safety inspection report',[],[],[],[`http://${this.shareLinkOfReports}.pdf`]).catch(err => console.log())
        // this.socialShare.shareWithOptions({
        //     message: "Please click on this link to see inspection file",
        //     subject: "Chief safety inspection report",
        //     files: `${this.shareLinkOfReports}.pdf`,
        //     url : `${this.shareLinkOfReports}.pdf`,
        //     chooserTitle : ''
        // }).catch(err => {
        //     this.alertCtrl.create({
        //         message : 'Your message is not send due to some reasons'
        //     }).present();
        // })
    }
}
