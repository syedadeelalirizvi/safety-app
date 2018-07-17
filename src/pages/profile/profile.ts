import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { MainPage } from '../main/main';
import { ModalPage } from '../modal/modal';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController, ModalController } from 'ionic-angular';

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
      nameOfReceiveReport :any;
      emailOfReceiveReport :any;
      profilePicture: any;
      updateForm = {}
      profileForm : FormGroup;
      imageUpload: any;
	    imageUploadProfile: any;
      base64Image: string;
      base64ImageProfile: string;
      updateClicked:any;
	    token: string;
      action:string;
      pageName="profile";
      constructor(
		public actionSheetCtrl: ActionSheetController,
				private alertCtrl: AlertController, 
              public navCtrl: NavController, 
              public navParams: NavParams, 
              private httpClient: HttpClient,
              private fb: FormBuilder, 
              private storage: Storage,
              private camera: Camera,
              private modalCtrl: ModalController ) {
                  this.action = navParams.get('action');
                  
		
		this.base64ImageProfile = navParams.get('base64ImageProfile');
		this.base64Image = '';
		this.imageUpload = false;		  
    this.imageUploadProfile = false;
    this.updateClicked =false;
       this.response = false;
	   
	   	storage.get('Session.access_token').then((val) => {
		this.token = val;
		});
	  
	   
       this.profileForm = fb.group({
              'email' : [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
              'department' : [],
              'nameOfReceiveReport' : [null, Validators.compose([Validators.required])],
              'emailOfReceiveReport' : [null, Validators.compose([Validators.required,])],
              'company' : [],
              'username' : [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9._-]{2,}') ])],
              //'confirmPass': [null, Validators.compose([Validators.required, Validators.minLength(8) ])], 
       });


     }
	 
	public presentActionSheet() 
	{
		let actionSheet = this.actionSheetCtrl.create({
		title: 'SET PICTURE',
		buttons: [
			{
				text: 'choose from albums',
				handler: () => {
					this.openGalleryProfile();
				}
			},
			{
				text: 'take a photo',
				handler: () => {
					this.openCameraProfile();
				}
			},
			{
				text: 'cancel',
				role: 'cancel'
			}
		]});
		actionSheet.present();
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
	
     openCameraProfile(){
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
           this.base64ImageProfile = 'data:image/jpeg;base64,' + imageData;
           this.imageUploadProfile = true;
		  
         }, (err) => {
           // Handle error
           console.log(err);
         });
     }
    
     openGalleryProfile(){
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
           this.base64ImageProfile = 'data:image/jpeg;base64,' + imageData;
           this.imageUploadProfile = true;
         }, (err) => {
           // Handle error
           console.log(err);
         });
     }  
	
  update(value: any):void{
    
    console.log(value.username);
    console.log(value.email);

    console.log(value.username);
    console.log(this.userid);
    console.log(this.token);
          

		
const headers = new HttpHeaders()
            .set("user_id", this.userid.toString()).set("access_token", this.token);
            console.log(this.base64ImageProfile);
		  
     const req = this.httpClient.post(ENV.BASE_URL + 'users/'+this.userid, {
      userEmail: value.email,
      userName: value.username,
      userDepartment: value.department,
      userCompany: value.company,
      nameToReceiveReport   : value.nameOfReceiveReport,
      emailToReceiveReport:value.emailOfReceiveReport,
      companyLogo: this.base64Image,
      profilePicture: this.base64ImageProfile

    },
    {headers:headers})
    .subscribe(
      (res: any) => {
        console.log(res);
        // Initializing session information
        // this.storage.set('Session.user_name', res.data.userName);
        // this.storage.set('Session.user_id', res.data.userId);
        // this.storage.set('Session.access_token', res.data.token);
        // this.storage.set('Session.token_expiry', res.data.expiry);
        // this.storage.set('Session.profile_pic', res.data.profilePicture);
        // this.storage.set('Session.company_logo', res.data.companyLogo);
       // this.navCtrl.push(MainPage);
      },
      err => {
        this.response = true;
        console.log("Error occurred");
        console.log(err);
      }
    );	
    // this.user = this.httpClient.post(this.baseUrl+'users/'+this.userid,this.updateForm,{headers:headers});
		// this.user
		// .subscribe(data => {
    // //  console.log(headers.get('user_id'));
    //   console.log(this.token);
    //   //console.log('my data: ', data);
    //   console.log('user: ',data['data']);
    //   this.userData = data['data'];
    //   console.log('userId: ',this.userData['userId']);
    //   setTimeout(() => {
    //   //this.userName = this.userData['userName'];
    // }, 0);
    //  // this.dept = this.userData['userDepartment'];
    //   //this.nameOfReceiveReport = this.userData['nameToReceiveReport'];
    //   //this.emailOfReceiveReport = this.userData['emailToReceiveReport'];
    //   this.profilePicture = "http://clients3.5stardesigners.net/safetyapp/api/web/uploads/CompanyLogos/_abc.jpg";
		// })
    // console.log("Update clicked");
  }
  changeLoad(){this.navCtrl.push(ChangepasswordPage)}
  goBack(){
    this.navCtrl.push(MainPage);
  }


  ionViewDidLoad() {

    this.storage.get("Session.user_id").then((value1) => {
      
      this.userid = value1;
      
      //alert('User Id: '+ this.userid);  
       //resolve(value);
       //return this.userid;
      })

     this.storage.get("Session.access_token").then((value2) => {
      
      this.token = value2;
      console.log(this.token);

     // console.log(ENV.BASE_URL);


const headers = new HttpHeaders()
            .set("user_id", this.userid.toString()).set("access_token", this.token);
		
		
    console.log(this.userid+"hello");
        this.user = this.httpClient.get(ENV.BASE_URL +'users/'+this.userid,{headers:headers});
        this.user
        .subscribe(data => {
        //  console.log(headers.get('user_id'));
          console.log(this.token);
          console.log('my data: ', data);
        //  console.log('user: ',data['data']);
          this.userData = data['data'];
          console.log('userId: ',this.userData['userId']);
          this.userName = this.userData['userName'];
          this.email  = this.userData['userEmail'];
          this.company = this.userData['userCompany'];
          this.dept = this.userData['userDepartment'];
          this.nameOfReceiveReport = this.userData['nameToReceiveReport'];
          this.emailOfReceiveReport = this.userData['emailToReceiveReport'];
		  
      if(this.userData['companyLogo'] !== undefined && this.userData['companyLogo'] !== 'undefined')
		  {
        this.imageUpload = true;
       
        this.base64Image = "http://" + this.userData['companyLogo'];
        console.log("http://" + this.userData['companyLogo']);
		  }  
		  
		  if(this.userData['profilePicture'] !== undefined && this.userData['profilePicture'] !== 'undefined')
		  {
        this.imageUploadProfile = true;
        //this.base64ImageProfile="http://clients3.5stardesigners.net/safetyapp/api/web/uploads/CompanyLogos/_abc.jpg";
       this.base64ImageProfile = "http://" + this.userData['profilePicture'];
        console.log("http://" + this.userData['profilePicture']);
		  }  

          this.profilePicture = "http://clients3.5stardesigners.net/safetyapp/api/web/uploads/CompanyLogos/_abc.jpg";
        })
      })
   
    console.log('ionViewDidLoad ProfilePage');
  }
 

}
