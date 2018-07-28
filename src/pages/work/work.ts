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
import { Keyboard } from "@ionic-native/keyboard";
@Component({
  selector: 'page-work',
  templateUrl: 'work.html',
})

export class WorkPage {
	imageUpload= false;
	base64Image: string = '';
	response: any;
	token: string;
	userid :any;
	inspectionForm : FormGroup;
	inspection_desc: string = "";

	constructor(private keyboard : Keyboard,public actionSheetCtrl: ActionSheetController, 
				private alertCtrl: AlertController,   
				private modalCtrl: ModalController,
				public navCtrl: NavController, 
				public navParams: NavParams, 
				private httpClient: HttpClient,
				private fb: FormBuilder, 
				private storage: Storage,
				private camera: Camera) 
	{
		keyboard.disableScroll(true)
		this.response = false;
		storage.get('Session.access_token').then((access_token) => {
			this.token = access_token;
		});
		storage.get('Session.user_id').then((user_id) => {
			this.userid = user_id;
		});

		// setting values on next & previous actions
		this.inspection_desc = this.navParams.get('inspection_desc');
		if(this.navParams.get('equipment_image'))
		{
			this.base64Image = this.navParams.get('equipment_image');
			this.imageUpload = true;
		}		
		
		//Pass values check
		console.log('page> work.ts', this.navParams.get('equipment_imasdasdasdage'));
		console.log('inspection_desc>' + this.inspection_desc);
		console.log('equipment_image>' + this.base64Image);

		this.inspectionForm = fb.group({
			'description' : [null, Validators.compose([Validators.required])],
			//'equipment_image' : [null, Validators.compose([Validators.required])],
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
	// Camera OpenCamera
  async openCamera(): Promise<any>{
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}
		try{ this.base64Image = 'data:image/jpeg;base64,' + await this.camera.getPicture(options); this.imageUpload = true;}catch(e){ console.log(e);}
	}
// Camera openGallery
async openGallery(): Promise<any>{
	const options: CameraOptions = {
		quality: 100,
		destinationType: this.camera.DestinationType.DATA_URL,
		encodingType: this.camera.EncodingType.JPEG,
		mediaType: this.camera.MediaType.PICTURE,
		sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
	}
	try{ this.base64Image = 'data:image/jpeg;base64,' + await this.camera.getPicture(options); this.imageUpload = true;}catch(e){ console.log(e);}
}
	
    // First form submit ( with values => description & image)  
	create(value: any):void
	{
		this.navCtrl.push(SafetyPage, {
			inspection_desc: value.description,
			equipment_image: this.base64Image
		});
	}

	ionViewDidLoad() 
	{	 
	
	}
}