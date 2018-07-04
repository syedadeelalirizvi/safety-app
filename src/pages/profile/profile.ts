import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
      errorResponse: any;
      baseUrl='http://clients3.5stardesigners.net/safetyapp/api/web/v1/';
      errors : any ; 
      userid = 15;
      user :any;
      userData :any;
      userName :any;
      dept :any;
      nameOfReceiveReport :any;
      emailOfReceiveReport :any;
      profilePicture: any;
      updateForm = {}

      token = 'bTxCvrFmoJmWf_NyzlgTfHhx8-PvNHYC';
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder ) {
  


  }

  update(){
    const headers = new HttpHeaders({
      'user_id':'15',
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json', 
      'access_token':'bTxCvrFmoJmWf_NyzlgTfHhx8-PvNHYC',
      //     'Access-Control-Allow-Origin' : '*', 
       'Accept':'application/json',
       'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
      //     'user_id':'15'
    }
    );
    this.user = this.httpClient.post(this.baseUrl+'users/'+this.userid,this.updateForm,{headers:headers});
		this.user
		.subscribe(data => {
    //  console.log(headers.get('user_id'));
      console.log(this.token);
      //console.log('my data: ', data);
      console.log('user: ',data['data']);
      this.userData = data['data'];
      console.log('userId: ',this.userData['userId']);
      setTimeout(() => {
      //this.userName = this.userData['userName'];
    }, 0);
     // this.dept = this.userData['userDepartment'];
      //this.nameOfReceiveReport = this.userData['nameToReceiveReport'];
      //this.emailOfReceiveReport = this.userData['emailToReceiveReport'];
      this.profilePicture = "http://clients3.5stardesigners.net/safetyapp/api/web/uploads/CompanyLogos/_abc.jpg";
		})
    console.log("Update clicked");
  }
  goBack(){
    this.navCtrl.pop();
  }


  ionViewDidLoad() {
    const headers = new HttpHeaders({
      'user_id':'15',
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json', 
      'access_token':'bTxCvrFmoJmWf_NyzlgTfHhx8-PvNHYC',
      //     'Access-Control-Allow-Origin' : '*', 
       'Accept':'application/json',
       'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
      //     'user_id':'15'
    }
    );
        this.user = this.httpClient.get(this.baseUrl+'users/'+this.userid,{headers:headers});
        this.user
        .subscribe(data => {
        //  console.log(headers.get('user_id'));
          console.log(this.token);
          //console.log('my data: ', data);
        //  console.log('user: ',data['data']);
          this.userData = data['data'];
          console.log('userId: ',this.userData['userId']);
          this.userName = this.userData['userName'];
          this.dept = this.userData['userDepartment'];
          this.nameOfReceiveReport = this.userData['nameToReceiveReport'];
          this.emailOfReceiveReport = this.userData['emailToReceiveReport'];
          this.profilePicture = "http://clients3.5stardesigners.net/safetyapp/api/web/uploads/CompanyLogos/_abc.jpg";
        })
    console.log('ionViewDidLoad ProfilePage');
  }
 

}
