import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
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

/**
 * Generated class for the PassObservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pass-observation',
  templateUrl: 'pass-observation.html',
})
export class PassObservationPage {

	public signatureImage : any;
	imageUpload: any;
	base64Image: string;
	inspection_result:any;
	observation=false;
	safe=false;
	critical=false;
	description:any;
	resultForm : FormGroup;
	constructor(
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
		if(this.navParams.get('allQuestions')) this.allQuestions = JSON.parse(this.navParams.get('allQuestions'));
		

		const headers =  new HttpHeaders()
		.set("user_id", this.userid.toString())
		.set("access_token", this.token);
		//user/{userid}/category/{id}/inspection
		const req = this.httpClient.post(ENV.BASE_URL +'user-inspections/user/'+this.userid+'/category/'+this.categoryId+'/inspection', {
			equipmentInspectedImageUrl: this.equipment_image,
			inspectionDescription : this.inspection_desc,
			subCategory : JSON.parse(this.subCategoriesIds),
			answers: JSON.parse(this.allQuestions)
			// this.categoryId 
			// this.categoryName 		
			// this.inspection_desc 
			// this.equipment_image 
			// this.subCategoriesIds 
			// if(navParams.get('allQuestions')) this.allQuestions = JSON.parse(navParams.get('allQuestions'));
			// this.inspection_result = navParams.get('inspection_result');
			// this.signatureImage = navParams.get('signatureImage');
			// this.base64Image = navParams.get('equipment_image_last');
		},
		{headers:headers})
		.subscribe(data => {
				 console.log(data.data.inspectionId);
				//inspection/{id}/report
				const req = this.httpClient.post(ENV.BASE_URL +'user-inspections/inspection/'+data.data.inspectionId+'/report', {
					reportType: this.inspection_result,
					observationDescription : this.description,
					signatureUrl : this.signatureImage,
					mediaUrl: this.base64Image
					// this.categoryId 
					// this.categoryName 		
					// this.inspection_desc 
					// this.equipment_image 
					// this.subCategoriesIds 
					// if(navParams.get('allQuestions')) this.allQuestions = JSON.parse(navParams.get('allQuestions'));
					// this.inspection_result = navParams.get('inspection_result');
					// this.signatureImage = navParams.get('signatureImage');
					// this.base64Image = navParams.get('equipment_image_last');
				},
				{headers:headers})
				.subscribe(dataNested => {
						console.log(dataNested);
				})
				
		})		
		// All steps data available on this page
		// Now do API call and create inspection via API 
		// After success redirect user to inspection listing
		// Nousheen you will work on this (here)
		// all data below
		
		/*
		this.categoryId = navParams.get('categoryId');
		this.categoryName = navParams.get('category_name');
		this.inspection_desc = navParams.get('inspection_desc');
		this.equipment_image = navParams.get('equipment_image');
		this.subCategoriesIds = JSON.parse(navParams.get('subCategories'));
		if(navParams.get('allQuestions')) this.allQuestions = JSON.parse(navParams.get('allQuestions'));
		this.inspection_result = navParams.get('inspection_result');
		this.signatureImage = navParams.get('signatureImage');
		this.base64Image = navParams.get('equipment_image_last');
		*/
		
		
		
	  let alert = this.alertCtrl.create({
		//title: 'Low battery',
		subTitle: 'Your Report Has Been Sent Successfully',
		buttons: ['Dismiss']
	  });
	  alert.present();
	}



   goBack()
   {
		this.navCtrl.push(InspectionRemarksPage, {
			categoryId: this.categoryId,
			category_name: this.categoryName,
			inspection_desc: this.inspection_desc,
			equipment_image:this.equipment_image,
			subCategories: JSON.stringify(this.subCategoriesIds), 
			allQuestions: JSON.stringify(this.allQuestions),
			inspection_result: this.inspection_result,
			signatureImage : this.signatureImage,
			equipment_image_last: this.base64Image
		});
    
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
	
  
}
