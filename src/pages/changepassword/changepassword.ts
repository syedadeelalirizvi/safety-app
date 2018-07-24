import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { AlertController, ModalController } from 'ionic-angular';


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
    token:string;
   
    constructor(	private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage ){
    
        this.email = navParams.get('userEmail');
        this.response = false;
   
        storage.get('Session.access_token').then((val) => {
              this.token = val;
        });
      
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
     
          this.storage.get("Session.access_token").then((value2) => {
      
              this.token = value2;
              console.log(this.token);

              const headers =  new HttpHeaders()
              .set("user_id", this.userid.toString()).set("access_token", this.token);
              //this.navCtrl.push(ProfilePage)
              const req = this.httpClient.post(ENV.BASE_URL +'users/app/change-password', {
                  userPassword: value.oldPassword,
                  newPassword: value.newPassword
              },
              {headers:headers})
              .subscribe(
                res => {
                  console.log(res);
                  let alert = this.alertCtrl.create({
                    title: 'Success',
                    subTitle: 'Password Updated Successfully!',
                    buttons: ['OK']
                  });
                 alert.present();
        
                  this.navCtrl.push(ProfilePage)
                },
                err => {
                  this.response = true;
                  console.log("Error occurred");
                  console.log(err);
      
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
