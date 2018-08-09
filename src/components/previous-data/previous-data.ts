
import { PreviousPage } from './../../pages/previous/previous';
import { DelPreDataProvider } from './../../providers/del-pre-data/del-pre-data';

import { LiftingPage } from './../../pages/lifting/lifting';
import { Component ,OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'previous-data',
  templateUrl: 'previous-data.html',
  providers: [DelPreDataProvider]
})

export class PreviousDataComponent implements OnInit {
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
   inspectionUU : any;
    categoryName:any;
    inspectionDescription: any;
    inspectionDate:any;

    inspections = [];
    constructor(public delProvider : DelPreDataProvider ,private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage ) {
        storage.get('Session.access_token').then((val) => {
            this.token = val;
        });
        storage.get('Session.user_id').then((val) => {
            this.userid = val;
        });
// Calling the service to load data
      
    }
    ngOnInit(){
     
      this.storage.get("Session.user_id").then((value1) => {
     
        this.userid = value1;
  
        this.storage.get("Session.access_token").then((value2) => {
      
           this.token = value2;
            console.log(this.token);
            
            const headers = new HttpHeaders()
                .set("user_id", this.userid.toString()).set("access_token", this.token);
            this.delProvider.loadInspectionData(this.userid,headers).subscribe(data => {
              console.log(this.token);
      console.log();
                
              console.log('inspections: ',data);
              this.inspectionData = data;
              this.inspectionUU = data;
    if(this.inspectionUU.inspections && this.inspectionUU.inspections.length)
    {	
      console.log(this.inspectionUU.inspections);
      for(var i = 0; i < this.inspectionUU.inspections.length; i++) {
        console.log(this.inspectionUU.length)
        console.log(this.inspectionUU.inspections[i].inspection.data.createdOn);

        this.inspectionDate = new Date(this.inspectionData.inspections[i].inspection.data.createdOn);
        console.log(this.inspectionData.inspections[i].inspection.data.inspectionId);
        this.inspections.push(
        {
        
          inspection_id:this.inspectionData.inspections[i].inspection.data.inspectionId,
          category_name: this.inspectionData.inspections[i].category.data.equipmentCategoryName, 
          inspection_description:this.inspectionData.inspections[i].inspection.data.inspectionDescription,
          inspection_date:this.inspectionDate
        });
   
      }
    }
   console.log('inspectionsData: ' ,this.inspections);
  })
           
        })
    })
    console.log('ionViewDidLoad ProfilePage');
       
        
    }

  //   deleteIns( value:any ):void{
  //     console.log('Lifting Clicked'+id); 
  //     this.navCtrl.push(LiftingPage, {
  //       inspectionId: id
  //     }); 
  // }

  deleteIns( value:any ):void{
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
          console.log('Delete clicked '+value.inspection_id+" "+this.userid);
          const headers = new HttpHeaders()
          .set("user_id", this.userid.toString())
          .set("access_token", this.token);

  this.user = this.httpClient.delete(ENV.BASE_URL +'user-inspections/inspection/'+value.inspection_id,{headers:headers});
  this.user.subscribe(data => 
  {
    console.log(data);
    this.navCtrl.push(PreviousPage).then(() => {
      const index = this.navCtrl.getActive().index;
			this.navCtrl.remove(0,index);
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
    


    
    gotoDetails(id:string){
        console.log('Lifting Clicked'+id); 
        this.navCtrl.push(LiftingPage, {
          inspectionId: id
        }).then(() => {
          const index = this.navCtrl.getActive().index;
          this.navCtrl.remove(0,index);
        }); 
    }

    

}
