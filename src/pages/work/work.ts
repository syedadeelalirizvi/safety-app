import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';
import { SafetyPage } from '../safety/safety';
import { MainPage} from '../main/main';
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
	inspection_desc: string = "";

	constructor(public actionSheetCtrl: ActionSheetController, 
				private alertCtrl: AlertController,   
				private modalCtrl: ModalController,
				public navCtrl: NavController, 
				public navParams: NavParams, 
				private httpClient: HttpClient,
				private fb: FormBuilder, 
				private storage: Storage,
				private camera: Camera) 
	{
		this.response = false;
		storage.get('Session.access_token').then((access_token) => {
			this.token = access_token;
		});
		storage.get('Session.user_id').then((user_id) => {
			this.userid = user_id;
		});

		// setting values on next & previous actions
		this.inspection_desc = this.navParams.get('inspection_desc');    
		this.base64Image = (this.navParams.get('equipment_image')) ? this.navParams.get('equipment_image') : '';
		//Pass values check
		console.log('page> work.ts');
		console.log('inspection_desc>' + this.inspection_desc);
		console.log('equipment_image>' + this.equipment_image);

		this.inspectionForm = fb.group({
			'description' : [null, Validators.compose([Validators.required])],
		});
	}

	//Main Navigation links
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
	
	goBack(){
		this.navCtrl.push(MainPage);
	}

	// Image upload possible options mapping	
	public presentActionSheet() 
	{
		let actionSheet = this.actionSheetCtrl.create({
		title: 'SET PICTURE',
		buttons: [
			{
				text: 'choose from albums',
				handler: () => {
					this.openGallery();
				}
			},
			{
				text: 'take a photo',
				handler: () => {
					this.openCamera();
				}
			},
			{
				text: 'cancel',
				role: 'cancel'
			}
		]});
		actionSheet.present();
	}
  
	openCamera()
	{
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
	
	openGallery()
	{
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
	
    // First form submit ( with values => description & image)  
	create(value: any):void
	{
		this.navCtrl.push(SafetyPage, {
			inspection_desc: value.description,
			equipment_image:this.base64Image
		});
	}

	ionViewDidLoad() 
	{	 
	
	}
}
