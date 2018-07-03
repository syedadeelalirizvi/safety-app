import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
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
  signUpForm = {}
  

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient) {
  }
   goBack(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signUp(){
    console.log('signup clicked');
    console.log(this.signUpForm);

    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    //headers.append('Access-Control-Allow-Origin' , 'http://localhost:8100');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    headers.append('Accept','application/json');
    headers.append('Content-type','multipart/form-data');

    let body = new FormData();
    //body.append('data',this.signUpForm);
    this.http.post(this.baseUrl+'users', this.signUpForm, {'headers':headers})
    .subscribe(
      data => {
     //console.log(data);
         if(data['status']==400){
           this.errors = data['errors'] 
          
           console.log(this.errors);
           this.errorResponse = this.errors['message'];
         }
      
        // if(data['status']=401){
        //   this.errorResponse = data['message'];
        // //  console.log(data['message']);
        // }
        // if(data['status']=0){
        //   this.errorResponse = "Something went wrong.Try Again";
        // }
        // else{
        //   this.tokenData = data['data'];
        //   console.log(this.tokenData['token']);
        // //  if(this.tokenData['token']!="")
        //  this.navCtrl.push(MainPage, {
        //    token: this.tokenData['token']
        //  })
        //  }
  
      //   if(data['data']!=""){
      //   this.tokenData = data['data'];
      //  // console.log(this.tokenData['token']);
  
  
      //   // if(data['status']==1 && this.tokenData['token']!=""){
      //   // this.navCtrl.push(MainPage)
      //   // }
      // }
      //    else{
      //      console.log(data);
      //   //   if(){
  
      //   //   }
      //    }
      },
      error => {
      
        console.log("Oooops!");
      //  this.sendNotification('Something went wrong!');
    });
  }

}
