import firebase  from 'firebase';
import { Component ,} from '@angular/core';
import { LoadingController , NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { MainPage } from '../main/main';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController, ModalController } from 'ionic-angular';

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
        public loadCtrl :LoadingController,
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
              'nameOfReceiveReport' : [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z.,_-\\s]{2,}') ])],
              'emailOfReceiveReport' : [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
              'company' : [],
              'username' : [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9._-\\s]{2,}') ])],
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
// Button goBack
goBack(){ this.navCtrl.push(MainPage).then(() => {
  const index = this.navCtrl.getActive().index;
  this.navCtrl.remove(0,index);
});}
// Button ChangePassword
changeLoad(){this.navCtrl.push(ChangepasswordPage).then(() => {
  const index = this.navCtrl.getActive().index;
  this.navCtrl.remove(0,index);
})}
// Camera openCamera for image upload
async openCamera(): Promise<any>{
  const options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
		targetWidth: 150,
		targetHeight: 100,
		saveToPhotoAlbum: false,
		allowEdit : false
  }
  try{ this.base64Image = 'data:image/jpeg;base64,' + await this.camera.getPicture(options); this.imageUpload = true;}catch(e){ console.log(e);}
} 
// Gallery openGallery for image upload
async openGallery(): Promise<any>{
  const options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
		targetWidth: 150,
		targetHeight: 100,
		saveToPhotoAlbum: false,
		allowEdit : false
  }
  try{ this.base64Image = 'data:image/jpeg;base64,' + await this.camera.getPicture(options); this.imageUpload = true;}catch(e){ console.log(e);}
}   
// Camera openCamera for profile
    async openCameraProfile(): Promise<any>{
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      try{ this.base64ImageProfile = 'data:image/jpeg;base64,' + await this.camera.getPicture(options); this.imageUploadProfile = true;}catch(e){ console.log(e);}
    }
// Gallery openGallery for profile
    async openGalleryProfile(): Promise<any>{
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }
      try{ this.base64ImageProfile = 'data:image/jpeg;base64,' + await this.camera.getPicture(options);  this.imageUploadProfile = true;}catch(e){ console.log(e);}
    }
  // checking
	isBase64(str) {
		str = str.replace("data:image/jpeg;base64,","");
		try {
			return btoa(atob(str)) == str;
		} catch (err) {
			return false;
		}
	}
  // Update Button : When user pressing update button
	update(value: any):void
	{
    const loadCtrlStart = this.loadCtrl.create({
      content: 'Please wait...'
    });
    loadCtrlStart.present();
		console.log(this.base64ImageProfile);
		console.log(this.isBase64(this.base64ImageProfile));
		console.log(this.base64Image);
		console.log(this.isBase64(this.base64Image));
		

		
		const headers = new HttpHeaders()
            .set("user_id", this.userid.toString()).set("access_token", this.token);
            
		console.log("profile>"+this.base64ImageProfile);
		
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
        loadCtrlStart.dismiss();
     
          console.log(res);
          this.navCtrl.push(MainPage).then(() => {
            const index = this.navCtrl.getActive().index;
            this.navCtrl.remove(0,index);
          });
          let alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'Profile Updated Successfully!',
            buttons: ['Dismiss']
          });
           alert.present();
        // })
		},
		err => {
      loadCtrlStart.dismiss();
			this.response = true;
			console.log("Error occurred");
			let alert = this.alertCtrl.create({
			  title: 'Some error occurred',
			  subTitle: 'Please try again later',
			  buttons: ['Dismiss']
			});
		   alert.present();
			console.log(err);
		});	
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
