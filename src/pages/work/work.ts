import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';
import { SafetyPage } from '../safety/safety';
import { ModalPage } from '../modal/modal';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController,ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-work',
  templateUrl: 'work.html',
})
export class WorkPage {
  imageUpload= false;
  base64Image: string;
  response: any;
  token: string;
  userid :any;
  inspectionForm : FormGroup;
  inspection_desc : any;
  pageName="work";

  constructor(private alertCtrl: AlertController,   private modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage,private camera: Camera ) {

   
     
     
      this.response = false;

      storage.get('Session.access_token').then((val) => {
          this.token = val;
      });
      storage.get('Session.user_id').then((val) => {
          this.userid = val;
        });
 

      this.inspectionForm = fb.group({
        //'email' : [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
        //'department' : [],
         'description' : [null, Validators.compose([Validators.required])],
        // 'emailOfReceiveReport' : [null, Validators.compose([Validators.required,])],
        // 'company' : [],
        // 'username' : [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9._-]{2,}') ])],
        //'confirmPass': [null, Validators.compose([Validators.required, Validators.minLength(8) ])], 
      });
  }

  openCamera(){
      console.log('openCamera');
      // Camera options		
      const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE
		  }
		
      this.camera.getPicture(options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64 (DATA_URL):
          this.base64Image = 'data:image/jpeg;base64,' + imageData;
          this.imageUpload = true;
      }, (err) => {
          // Handle error
          console.log(err);
        });
	}
	
	openGallery(){
      console.log('openGallery');
      // Camera options		
      const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }
		
		  this.camera.getPicture(options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64 (DATA_URL):
          this.base64Image = 'data:image/jpeg;base64,' + imageData;
          this.imageUpload = true;
      }, (err) => {
          // Handle error
          console.log(err);
        });
	}
  goBack(){
      this.navCtrl.pop();
  }

  profileLoad = function()
  {
    this.navCtrl.push(ProfilePage)
  }
  previousLoad = function()
  {
    this.navCtrl.push(PreviousPage)
  }
  informationLoad = function()
  {
    this.navCtrl.push(InformationPage)
  }
  create(value: any):void{
    this.base64Image = this.navParams.get('base64ImageProfile');
    
   this.imageUpload = this.navParams.get('imageUploadProfile');
  
  //this.base64Image = this.navParams.get('base64ImageProfile');
   
      this.navCtrl.push(SafetyPage, {
        inspectionDescription: value.description,
        imageData:this.base64Image
      });
  }

  ionViewDidLoad() {
    	 
    console.log(this.base64Image);
    console.log('ionViewDidLoad WorkPage');
    this.storage.get("Session.access_token").then((value2) => {
      
        this.token = value2;
    })

    this.storage.get("Session.user_id").then((value1) => {
        this.userid = value1;
    console.log(this.userid+" "+this.token);
    })
  }
  presentProfileModal() {
    let profileModal = this.modalCtrl.create(ModalPage, { pageName: this.pageName });
    profileModal.present();
  }

}
