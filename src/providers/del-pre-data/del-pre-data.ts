import { PreviousDataComponent } from './../../components/previous-data/previous-data';
import { AlertController, NavController } from 'ionic-angular';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant as ENV } from '../../configs/constant';
import { Storage } from "@ionic/storage";
@Injectable()
export class DelPreDataProvider {

 
  constructor(public storage : Storage,public alertCtrl : AlertController,public httpClient : HttpClient,public navCtrl : NavController) {
  


    
  }
 

  loadPreviousData(user,userid,token,inspectionData,inspectionDate,inspections){
    this.storage.get("Session.user_id").then((value1) => {
     
      userid = value1;

      this.storage.get("Session.access_token").then((value2) => {
    
         token = value2;
          console.log(token);
          
          const headers = new HttpHeaders()
              .set("user_id", userid.toString()).set("access_token", token);

          user = this.httpClient.get(ENV.BASE_URL +'user-inspections/user/'+userid+'/inspection',{headers:headers});
          user
          .subscribe(data => {
     
              console.log(token);
    
              console.log('inspections: ',data.inspections);
              inspectionData = data.inspections;
    if(data.inspections && data.inspections.length)
    {	
      for(var i = 0; i < data.inspections.length; i++) {
  
        inspectionDate = new Date(inspectionData[i].inspection.data.createdOn);
        inspections.push(
        {
          inspection_id:inspectionData[i].inspection.data.inspectionId,
          category_name: inspectionData[i].category.data.equipmentCategoryName, 
          inspection_description:inspectionData[i].inspection.data.inspectionDescription,
          inspection_date:inspectionDate
        });
   
      }
    }
              console.log('inspectionsData: ' ,inspections);
          })
      })
  })
  console.log('ionViewDidLoad ProfilePage');
  }



  deleteInspection( value , userid ,token, user){
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
        
        console.log('Delete clicked '+value.inspection_id+" "+ userid);
        const headers = new HttpHeaders()
        .set("user_id", userid.toString())
        .set("access_token", token);

user = this.httpClient.delete(ENV.BASE_URL +'user-inspections/inspection/'+value.inspection_id,{headers:headers});
user.subscribe(data => 
{
  console.log(data);
  return this.navCtrl.push(PreviousDataComponent); 
}),
err => {				
   console.log("Error occurred");
   return console.log(err);
}

      }
    }
  ]
});
alert.present();
}
 

}
