import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';


import { LiftingPage } from '../lifting/lifting';

@Component({
  selector: 'page-previous',
  templateUrl: 'previous.html',
})
export class PreviousPage {
    response: any;
  
    errors : any ; 
    userid :any;
    user :any;
    inspectionData :any;
    userName :any;
    email: any;
    company: any;
    dept :any;
    token:string;

    categoryName:any;
    inspectionDescription: any;
    inspectionDate:any;

    inspections = [];
    constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage ) {
        storage.get('Session.access_token').then((val) => {
            this.token = val;
        });
        storage.get('Session.user_id').then((val) => {
            this.userid = val;
        });
    }
    goBack(){
        this.navCtrl.pop();
    }

    ionViewDidLoad() {
    
        this.storage.get("Session.user_id").then((value1) => {
          
            this.userid = value1;

            this.storage.get("Session.access_token").then((value2) => {
          
                this.token = value2;
                console.log(this.token);
                
                const headers = new HttpHeaders()
                    .set("user_id", this.userid.toString()).set("access_token", this.token);

                this.user = this.httpClient.get(ENV.BASE_URL +'user-inspections/user/'+this.userid+'/inspection',{headers:headers});
                this.user
                .subscribe(data => {
           
                    console.log(this.token);
          
                    console.log('inspections: ',data.inspections);
                    this.inspectionData = data.inspections;
					if(data.inspections && data.inspections.length)
					{	
						for(var i = 0; i < data.inspections.length; i++) {
				
							this.inspectionDate = new Date(this.inspectionData[i].inspection.data.createdOn);
							this.inspections.push(
							{
								inspection_id:this.inspectionData[i].inspection.data.inspectionId,
								category_name: this.inspectionData[i].category.data.equipmentCategoryName, 
								inspection_description: this.inspectionData[i].inspection.data.inspectionDescription,
								inspection_date: this.inspectionDate
							});
				 
						}
					}
                    console.log('inspectionsData: ' ,this.inspections);
                })
            })
        })
        console.log('ionViewDidLoad ProfilePage');
    }
     
    gotoDetails(id:string){
        console.log('Lifting Clicked'+id); 
        this.navCtrl.push(LiftingPage, {
          inspectionId: id
        }); 
    }


}
