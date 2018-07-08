import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';


import { LiftingPage } from '../lifting/lifting';

/**
 * Generated class for the PreviousPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-previous',
  templateUrl: 'previous.html',
})
export class PreviousPage {
  response: any;
  baseUrl='http://clients3.5stardesigners.net/safetyapp/api/web/v1/';
  errors : any ; 
  userid :any;
  user :any;
  userData :any;
  userName :any;
  email: any;
  company: any;
  dept :any;
  token:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage ) {
  }
 goBack(){
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    
        this.storage.get("Session.user_id").then((value1) => {
          
          this.userid = value1;
          
          //alert('User Id: '+ this.userid);  
           //resolve(value);
           //return this.userid;
         
    
         this.storage.get("Session.access_token").then((value2) => {
          
          this.token = value2;
          console.log(this.token);
    
         // console.log(ENV.BASE_URL);
    
    
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
        console.log(this.userid);
            this.user = this.httpClient.get(ENV.BASE_URL +'user-inspections/user/'+this.userid+'/inspection',{headers:headers});
            this.user
            .subscribe(data => {
            //  console.log(headers.get('user_id'));
              console.log(this.token);
              console.log('my data: ', data);
            //  console.log('user: ',data['data']);
              // this.userData = data['data'];
              // console.log('userId: ',this.userData['userId']);
              // this.userName = this.userData['userName'];
              // this.email  = this.userData['userEmail'];
              // this.company = this.userData['userCompany'];
              // this.dept = this.userData['userDepartment'];
              // this.nameOfReceiveReport = this.userData['nameToReceiveReport'];
              // this.emailOfReceiveReport = this.userData['emailToReceiveReport'];
    
              // this.profilePicture = "http://clients3.5stardesigners.net/safetyapp/api/web/uploads/CompanyLogos/_abc.jpg";
            })
          })
        })
        console.log('ionViewDidLoad ProfilePage');
      }
     
buttonClick = function(){this.navCtrl.push(LiftingPage)}
}
