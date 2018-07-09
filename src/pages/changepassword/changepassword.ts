import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  changePasswordForm : FormGroup;
  response: any;
  email:any;
  userid:any;
  token:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage ){
    this.email = navParams.get('userEmail');
    this.response = false;
		this.changePasswordForm = fb.group({
	//  'email' : [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
      'oldPassword': [null, Validators.compose([Validators.required, Validators.minLength(8) ])],
      'newPassword': [null, Validators.compose([Validators.required, Validators.minLength(8) ])],
      
      'confirmPass': [null, Validators.compose([Validators.required, Validators.minLength(8) ])]
      
    });
  }
  changePassword(value: any):void{
    console.log(value.oldPassword);
    console.log(value.oldPassword);
    console.log(value.oldPassword);
    console.log('Forgot Pass clicked');
    console.log(this.email);
    console.log('Form submitted!');
    this.storage.get("Session.user_id").then((value1) => {
      
      this.userid = value1;
      
      //alert('User Id: '+ this.userid);  
       //resolve(value);
       //return this.userid;
     

     this.storage.get("Session.access_token").then((value2) => {
      
      this.token = value2;
      console.log(this.token);




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
    //this.navCtrl.push(ProfilePage)
    const req = this.httpClient.post(ENV.BASE_URL +'users/app/change-password', {
      userPassword: value.oldPassword,
      newPassword: value.newPassword
    },
    {headers:headers})
    .subscribe(
      res => {
        console.log(res);
        // Initializing session information
        // this.storage.set('Session.user_name', res.data.userName);
        // this.storage.set('Session.user_id', res.data.userId);
        // this.storage.set('Session.access_token', res.data.token);
        // this.storage.set('Session.token_expiry', res.data.expiry);
        // this.storage.set('Session.profile_pic', res.data.profilePicture);
        // this.storage.set('Session.company_logo', res.data.companyLogo);
        //this.storage.set('name', 'Max');
        
        this.navCtrl.push(ProfilePage)
      },
      err => {
        this.response = true;
        console.log("Error occurred");
        console.log(err);
        //this.navCtrl.push(VerificationPage)
      }
    );
  })
})
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }
  goBack(){
		this.navCtrl.pop();
  }
  

}
