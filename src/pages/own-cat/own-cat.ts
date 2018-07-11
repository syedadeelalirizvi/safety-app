import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';
import { SafetyPage } from '../safety/safety';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-own-cat',
  templateUrl: 'own-cat.html',
})
export class OwnCatPage {
    token: string;
    userid: any;
    categoryForm : FormGroup;
    response: any;
    inspection_desc: any;
    equipment_image: any;
    constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage,private camera: Camera ) {
      this.inspection_desc = navParams.get('inspectionDescription');
      this.equipment_image = navParams.get('imageData');
      console.log(this.inspection_desc+" ");   
     
      storage.get('Session.access_token').then((val) => {
        this.token = val;
    });
    storage.get('Session.user_id').then((val) => {
        this.userid = val;
      });


    this.categoryForm = fb.group({
      //'email' : [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
      //'department' : [],
       'name' : [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9._-]{2,}') ])],
      // 'emailOfReceiveReport' : [null, Validators.compose([Validators.required,])],
      // 'company' : [],
      // 'username' : [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9._-]{2,}') ])],
      //'confirmPass': [null, Validators.compose([Validators.required, Validators.minLength(8) ])], 
    });
    
    }
    goBack(){
      this.navCtrl.pop();
    }
profileLoad = function(){this.navCtrl.push(ProfilePage)}
previousLoad = function(){this.navCtrl.push(PreviousPage)}
informationLoad = function(){this.navCtrl.push(InformationPage)}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OwnCatPage');
  }
  create(value: any):void{
    
      
       this.storage.get("Session.access_token").then((value2) => {
        
          this.token = value2;
      })
  
      this.storage.get("Session.user_id").then((value1) => {
          this.userid = value1;
      console.log(this.userid+" "+this.token);
      console.log(value.name);
      const headers =  new HttpHeaders()
      .set("user_id", this.userid.toString()).set("access_token", this.token);
      //this.navCtrl.push(ProfilePage)
      const req = this.httpClient.post(ENV.BASE_URL +'equipment-categories/user/'+this.userid+'/category', {
         equipmentCategoryName: value.name,
          //newPassword: value.newPassword
      },
      {headers:headers})
      .subscribe(
        res => {
          console.log(res);

          this.navCtrl.push(SafetyPage, {
            inspectionDescription: this.inspection_desc,
            imageData:this.equipment_image
          });
        },
        err => {
          this.response = true;
          console.log("Error occurred");
          console.log(err);

        }
     );



      })
    }
}
