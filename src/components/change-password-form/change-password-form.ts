import firebase from 'firebase';
import { ProfilePage } from './../../pages/profile/profile';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { AlertController, ModalController , NavController, NavParams} from 'ionic-angular';
import { Keyboard } from "@ionic-native/keyboard";
/**
 * Generated class for the ChangePasswordFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'change-password-form',
  templateUrl: 'change-password-form.html'
})
export class ChangePasswordFormComponent {

  changePasswordForm : FormGroup;
  response: any;
  email:any;
  userid:any;
  token:string;

  constructor(private Keyboard: Keyboard,private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage ) {
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
          Keyboard.disableScroll(true);
  }

  changePassword(value: any):void{
		
		(<HTMLInputElement> document.getElementById("changepassword-submit")).disabled = true;
		(<HTMLInputElement> document.getElementById("changepassword-submit")).innerHTML = "Please wait..";

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
                  const afAuthuser = firebase.auth().currentUser;
                  afAuthuser.updatePassword(value.newPassword).then(() => {
                    firebase.database().ref(`profile/${afAuthuser.uid}`).update({
                      userPassword : value.newPassword
                    }).then(() => {
                      console.log(res);
                      this.navCtrl.push(ProfilePage);
                              let alert = this.alertCtrl.create({
                                title: 'Success',
                                subTitle: 'Password Updated Successfully!',
                                buttons: ['OK']
                              });
                             alert.present();
                    }).catch(e => console.log(e));
                  })
                },
                err => {
					(<HTMLInputElement> document.getElementById("changepassword-submit")).disabled = false;
					(<HTMLInputElement> document.getElementById("changepassword-submit")).innerHTML = "Reset new password";
	
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
