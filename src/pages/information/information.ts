import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MainPage } from '../main/main';
import { constant as ENV } from '../../configs/constant';
import { InAppBrowser } from "@ionic-native/in-app-browser";
@Component({
  selector: 'page-information',
  templateUrl: 'information.html',

})
export class InformationPage {
  token:any;
  userid:any;
  data : any;
  constructor(public inAppBrowser:InAppBrowser,public alertCtrl : AlertController,public httpClient : HttpClient,public navCtrl: NavController, public navParams: NavParams,private storage: Storage ) {
  }
   goBack(){
    this.navCtrl.push(MainPage);
  }

  paymentOption(){

  this.storage.get("Session.access_token").then((value2) => {
          
      this.token = value2;
  })
  this.storage.get("Session.user_id").then((value1) => {
    this.userid = value1;
 console.log(this.userid);
 console.log(this.token);
    const headers =  new HttpHeaders()
                .set("user_id", this.userid.toString()).set("access_token", this.token);
		 this.httpClient.get(ENV.BASE_URL + 'users/viewinvoice ',{headers:headers}).subscribe(resp => {
      this.data = resp
        this.inAppBrowser.create(this.data.data).show();
        },err => {
          if(err => 400){
            this.alertCtrl.create({
              title : 'Your invoice is being generated..',
              subTitle : 'Your invoice is being generated. You will get an email shortly over the email address you used to create this account. Thank you for patience. ',
              buttons : [
                {
                  text : 'Okay',
                }
              ]
            }).present();
          }
        })
      })
  }


}
