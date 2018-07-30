
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController, LoadingController } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { MainPage } from '../main/main';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';
import { AlertController } from 'ionic-angular';
import {SignaturePage} from '../signature/signature';
import {InspectionRemarksPage} from '../inspection-remarks/inspection-remarks';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { constant as ENV } from '../../configs/constant';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'page-pass-observation',
  templateUrl: 'pass-observation.html',
})
export class PassObservationPage {

	public signatureImage : any = '';
	imageUpload: any;
	base64Image: string;
	inspection_result:any;
	observation=false;
	safe=false;
	critical=false;
	description:any;
	token: any;
	userid: any;
	categoryId: any;
	categoryName: any;
	inspection_desc: any;
	equipment_image: any;
	observation_desc: any;
	allQuestions: any;
	subCategoriesIds: any;
	resultForm : FormGroup;
	
	constructor(
		public loadCtrl : LoadingController,
		public navCtrl: NavController, 
		public actionSheetCtrl: ActionSheetController,
		public navParams: NavParams, 
		private alertCtrl: AlertController,
		public modalController:ModalController,
		private storage: Storage,
		private fb: FormBuilder, 
		private httpClient: HttpClient,
		private camera: Camera)	 
	{
		
		storage.get('Session.access_token').then((access_token) => {
			this.token = access_token;
		});
		storage.get('Session.user_id').then((user_id) => {
			this.userid = user_id;
		});
		
		this.base64Image = '';
		this.imageUpload = false;		  
		
		this.categoryId = navParams.get('categoryId');
		this.categoryName = navParams.get('category_name');
		this.inspection_desc = navParams.get('inspection_desc');
		this.equipment_image = navParams.get('equipment_image');
		this.subCategoriesIds = JSON.parse(navParams.get('subCategories'));
		if(navParams.get('allQuestions')) this.allQuestions = navParams.get('allQuestions');
		this.inspection_result = navParams.get('inspection_result');
		this.signatureImage = navParams.get('signatureImage');
		this.base64Image = navParams.get('equipment_image_last');
		this.observation_desc = navParams.get('observation_desc');
		
		
		//Pass values check
		console.log('page> inspection-remarks.ts (5th step)');
		console.log('inspection_desc>' + this.inspection_desc);
		console.log('equipment_image>' + this.equipment_image);
		console.log('categoryId>' + this.categoryId);
		console.log('category_name>' + this.categoryName);
		console.log('subCategoriesIds>' + this.subCategoriesIds);
		console.log('allQuestions>' + this.allQuestions); 
		console.log('inspection_result>' + this.inspection_result);
		console.log('signatureImage>' + this.signatureImage);

		this.resultForm = fb.group({
			'description' : [null, Validators.compose([Validators.required])],
		});
		  
	}

	openSignatureModel(){
		console.log(this.resultForm.value.description);
		setTimeout(() => {
			
			let modal = this.modalController.create(SignaturePage, 	{
																		categoryId: this.categoryId,
																		category_name: this.categoryName,
																		inspection_desc: this.inspection_desc,
																		equipment_image:this.equipment_image,
																		subCategories: JSON.stringify(this.subCategoriesIds), 
																		allQuestions: JSON.stringify(this.allQuestions),
																		inspection_result: this.inspection_result,
																		equipment_image_last: this.base64Image,
																		observation_desc: this.resultForm.value.description
																	}); 
			modal.present();
		}, 300);
	}	
loading : any
	SubmitInspection(value:any):void
	 {
		 
		if(this.inspection_result!='fail'){
			this.description = value.description;
		} 
		else
		this.description ="";

		console.log(value.description);
		this.subCategoriesIds = this.navParams.get('subCategories');
		console.log(this.subCategoriesIds);
		if(this.navParams.get('allQuestions')) this.allQuestions = this.navParams.get('allQuestions');
		console.log("questions>"+this.allQuestions);
		

		const headers =  new HttpHeaders()
		.set("user_id", this.userid.toString())
		.set("access_token", this.token);
		// .set("Content-Type","application/json")
		// .set("Accept","application/json");
		//user/{userid}/category/{id}/inspection
	
		 this.loading = this.loadCtrl.create({
			content: 'Please wait...'
		  });
		this.loading.present();
		const req = this.httpClient.post(ENV.BASE_URL +'user-inspections/user/'+this.userid+'/category/'+this.categoryId+'/inspection', {
			equipmentInspectedImageUrl: this.equipment_image,
			inspectionDescription : this.inspection_desc,
			subCategory : JSON.parse(this.subCategoriesIds),
			answers: JSON.parse(this.allQuestions)
		},
		{headers:headers})
		.subscribe((data:any) => {
				console.log(data.data.inspectionId);
			//	inspection/{id}/report
				const req = this.httpClient.post(ENV.BASE_URL +'user-inspections/inspection/'+data.data.inspectionId+'/report', {
					reportType: this.inspection_result,
					observationDescription : this.description,
					signatureUrl : this.signatureImage,
					mediaUrl: this.base64Image
				},
				{headers:headers})
				.subscribe((dataNested:any) => {
					this.loading.dismiss();
						console.log(dataNested);
						this.navCtrl.setRoot(MainPage);	
						let alert = this.alertCtrl.create({
							title: 'Inspection created',
							subTitle: 'Your Report Has Been Sent Successfully',
							buttons: ['OK']
						  });
						  alert.present();
						this.navCtrl.setRoot(MainPage);
				},
				err => {
					
					console.log("Error occurred - 2nd Step");
					console.log(err);
				})
				
		},
		err => {
			
			console.log("Error occurred - 1st step");
			console.log(err);
		})		
	}



   goBack()
   {
		this.navCtrl.pop()
	}

	profileLoad = function(){this.navCtrl.push(ProfilePage)}
	previousLoad = function(){this.navCtrl.push(PreviousPage)}
	informationLoad = function(){this.navCtrl.push(InformationPage)}

  ionViewDidLoad() {
	console.log('ionViewDidLoad PassObservationPage');
	if(this.inspection_result=='observation'){
		this.observation=true;
	}
	if(this.inspection_result=='safe'){
		this.safe=true;
	}
	if(this.inspection_result=='critical'){
		this.critical=true;
	}
  }

  
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
  	 
	 
   	openCamera(){
      console.log('openCamera');
      // Camera options		
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
	
  
}