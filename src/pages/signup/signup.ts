import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  errorResponse: any;
  baseUrl='http://clients3.5stardesigners.net/safetyapp/api/web/v1/';
  errors : any ; 
  //signUpForm = {};
  signupForm : FormGroup;
	response: any;

  

  constructor(public navCtrl: NavController, public navParams: NavParams,private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage) {
  
    this.response = false;
		this.signupForm = fb.group({
		  'email' : [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
      'department' : [],
      'nameToReceiveReport' : [null, Validators.compose([Validators.required])],
      'emailToReceiveReport' : [null, Validators.compose([Validators.required,])],
      'company' : [],
      'username' : [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9._-]{2,}') ])],
      'confirmPass': [null, Validators.compose([Validators.required, Validators.minLength(8) ])],
      
       'password': [null, Validators.compose([Validators.required, Validators.minLength(8) ])]
		});
  
  }
   goBack(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signUp(value: any):void{
        console.log('signup clicked');
        console.log(value.email);
   
        const headers = new HttpHeaders({
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin' : 'http://localhost:8100',
   
            'Accept':'application/json',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
         }
    );
        const req = this.httpClient.post('http://clients3.5stardesigners.net/safetyapp/api/web/v1/users', {
            userEmail: value.email,
            userPassword: value.password,
            userName: value.username,
            userDepartment: value.department,
            userCompany: value.company,
            nameToReceiveReport: value.nameToReceiveReport,
            emailToReceiveReport: value.emailToReceiveReport
        },
            {headers:headers} 
  )
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
        this.navCtrl.pop();
      },
      err => {
        this.response = true;
        console.log("Error occurred");
        console.log(err);
      }
    );		


    // let body = new FormData();
    //body.append('data',this.signUpForm);
    // this.http.post(this.baseUrl+'users', this.signupForm, {'headers':headers} )
    // .subscribe(
    //   data => {
    //  //console.log(data);
    //      if(data['status']==400){
    //        this.errors = data['errors'] 
          
    //        console.log(this.errors);
    //        this.errorResponse = this.errors['message'];
    //      }
      
     
    //   },
    //   error => {
      
    //     console.log("Oooops!");
    //   //  this.sendNotification('Something went wrong!');
    // });
  }

}
