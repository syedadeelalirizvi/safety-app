import { DelPreDataProvider } from './../../providers/del-pre-data/del-pre-data';

import { LiftingPage } from './../../pages/lifting/lifting';
import { Component } from '@angular/core';
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

export class PreviousDataComponent {
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
    constructor(public delProvider : DelPreDataProvider ,private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage ) {
        storage.get('Session.access_token').then((val) => {
            this.token = val;
        });
        storage.get('Session.user_id').then((val) => {
            this.userid = val;
        });

        delProvider.loadPreviousData(this.user,this.userid,this.token,this.inspectionData,this.inspectionDate,this.inspections)
      
    }
    goBack(){
        this.navCtrl.pop();
    }

    deleteIns( value:any ):void{
        this.delProvider.deleteInspection(value,this.userid,this.token,this.user);
    }


    
    gotoDetails(id:string){
        console.log('Lifting Clicked'+id); 
        this.navCtrl.push(LiftingPage, {
          inspectionId: id
        }); 
    }

    

}
