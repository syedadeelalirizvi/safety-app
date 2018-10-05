import { ChiefSfetyApiProvider } from './../../providers/chief-sfety-api/chief-sfety-api';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController, LoadingController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { MainPage } from '../main/main';
import { InformationPage } from '../information/information';
import { PreviousPage } from '../previous/previous';
import { AlertController } from 'ionic-angular';
import { SignaturePage } from '../signature/signature';
import { InspectionRemarksPage } from '../inspection-remarks/inspection-remarks';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { constant as ENV } from '../../configs/constant';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Keyboard } from "@ionic-native/keyboard";

@Component({
	selector: 'page-pass-observation',
	templateUrl: 'pass-observation.html',
	providers : [ChiefSfetyApiProvider]
})
export class PassObservationPage {

	public signatureImage: any = '';
	imageUpload: any;
	base64Image: string;
	inspection_result: any;
	observation = false;
	safe = false;
	critical = false;
	description: any;
	token: any;
	userid: any;
	categoryId: any;
	categoryName: any;
	inspection_desc: any;
	equipment_image: any;
	observation_desc: any;
	allQuestions: any;
	subCategoriesIds: any;
	resultForm: FormGroup;
	imageGetAgain: string;
	questionFromDb: any;
	OfflineInspections = [];
	constructor(
		private ChiefSfetyApiProvider :ChiefSfetyApiProvider,
		public keyboard: Keyboard,
		public loadCtrl: LoadingController,
		public navCtrl: NavController,
		public actionSheetCtrl: ActionSheetController,
		public navParams: NavParams,
		private alertCtrl: AlertController,
		public modalController: ModalController,
		private storage: Storage,
		private fb: FormBuilder,
		private httpClient: HttpClient,
		private camera: Camera) {
		keyboard.disableScroll(true);
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
		if (navParams.get('allQuestions')) this.allQuestions = navParams.get('allQuestions');
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
			'description': [null, Validators.compose([Validators.required])],
		});

	}

	openSignatureModel() {
		console.log(this.resultForm.value.description);
		setTimeout(() => {

			let modal = this.modalController.create(SignaturePage, {
				categoryId: this.categoryId,
				category_name: this.categoryName,
				inspection_desc: this.inspection_desc,
				equipment_image: this.equipment_image,
				signatureImage: this.signatureImage,
				subCategories: JSON.stringify(this.subCategoriesIds),
				allQuestions: JSON.stringify(this.allQuestions),
				inspection_result: this.inspection_result,
				equipment_image_last: this.base64Image,
				observation_desc: this.resultForm.value.description
			});
			modal.present();
		}, 300);
	}
	loading: any
	SubmitInspection(value: any): void {

		if (this.inspection_result != 'fail') {
			this.description = value.description;
		}
		else
			this.description = "";

		console.log(value.description);
		this.subCategoriesIds = this.navParams.get('subCategories');

		console.log("questions>" + JSON.parse(this.allQuestions));


		const headers = new HttpHeaders()
			.set("user_id", this.userid.toString())
			.set("access_token", this.token);



		this.loading = this.loadCtrl.create({
			content: 'Please wait...'
		});
		this.loading.present();
		// console.log(JSON.stringify(this.allQuestions));
		this.storage.get(`session.${this.userid.toString()}.questions`).then(questions => {
			this.questionFromDb = JSON.stringify(questions);
			console.log(this.questionFromDb);
			this.ChiefSfetyApiProvider.userSubmitInspection(this.userid,this.categoryId,this.equipment_image,this.inspection_desc, JSON.parse(this.subCategoriesIds),JSON.parse(this.questionFromDb),headers).subscribe((data:any) => {
			
					console.log(data.data.inspectionId);
					//	inspection/{id}/report
					console.log(this.inspection_result);
					console.log(this.description);
					console.log(this.signatureImage);
					console.log(this.base64Image);
					this.ChiefSfetyApiProvider.userSubmitReport(data.data.inspectionId,this.inspection_result,this.description,this.signatureImage,this.base64Image,headers).subscribe((dataNested : any) => {
			
							this.loading.dismiss();
							console.log(dataNested);
							this.navCtrl.setRoot(MainPage).then(() => {
								const index = this.navCtrl.getActive().index;
								this.navCtrl.remove(0, index);
							});
							let alert = this.alertCtrl.create({
								title: 'Inspection created',
								subTitle: 'Your report was created and sent sucessfully',
								buttons: ['OK']
							});
							alert.present();

							this.navCtrl.setRoot(MainPage).then(() => {
								const index = this.navCtrl.getActive().index;
								this.navCtrl.remove(0, index);
							});
						},
							err => {
								// this.loading.dismiss();
								// this.alertCtrl.create({
								// 	title: 'Application encountered an error',
								// 	message: 'Please try again later or restart the application'
								// }).present();
								// console.log("Error occurred - 2nd Step");
								// console.log(err);
console.log('from report');
								console.log(data.data.inspectionId)
								console.log(this.base64Image)
								console.log(this.inspection_result)
								console.log(this.description)
								console.log(this.signatureImage)


							})

				},
					err => {
						this.loading.dismiss();
						// this.alertCtrl.create({
						// 	title: 'Application encountered an error',
						// 	message: 'Please try again later or restart the application'
						// }).present();
						// console.log("Error occurred - 1st step");
						// console.log(err);
console.log('creation of inspection');
						console.log(this.userid)	
						console.log(this.categoryId)
						console.log(this.equipment_image)
						console.log(this.inspection_desc)
						console.log(JSON.parse(this.subCategoriesIds))
						console.log(JSON.parse(this.questionFromDb))
						console.log(headers)
				

						this.storage.get('Session.Offline.inspections').then(Offlineinspections => {
							console.log(Offlineinspections)
							if(Offlineinspections == null || Offlineinspections == undefined){
								Offlineinspections = [];
								this.OfflineInspections = Offlineinspections;
								this.OfflineInspections.push(
									{ 
										userid : this.userid,
										categoryId : this.categoryId,
										equipment_image : this.equipment_image,
										inspections_desc : this.inspection_desc,
										subCategoriesIds : JSON.parse(this.subCategoriesIds),
										questions : JSON.parse(this.questionFromDb),
										inspectionResult : this.inspection_result,
										description : this.description,
										signatureImage : this.signatureImage,
										base64Image : this.base64Image
									}
								)
								this.storage.set('Session.Offline.inspections',this.OfflineInspections);
								this.navCtrl.setRoot(MainPage).then(() => {
									const index = this.navCtrl.getActive().index;
									this.navCtrl.remove(0, index);
								});
								let alert = this.alertCtrl.create({
									title: 'Inspection created',
									subTitle: 'Your inspection has been created in local db',
									buttons: ['OK']
								});
								alert.present();
							}else{
								this.OfflineInspections = Offlineinspections;
								this.OfflineInspections.push(
									{ 
										userid : this.userid,
										categoryId : this.categoryId,
										equipment_image : this.equipment_image,
										inspections_desc : this.inspection_desc,
										subCategoriesIds : JSON.parse(this.subCategoriesIds),
										questions : JSON.parse(this.questionFromDb),
										inspectionResult : this.inspection_result,
										description : this.description,
										signatureImage : this.signatureImage,
										base64Image : this.base64Image
									}
								)
								console.log(this.OfflineInspections)
	
									this.storage.set('Session.Offline.inspections',this.OfflineInspections);
									this.navCtrl.setRoot(MainPage).then(() => {
										const index = this.navCtrl.getActive().index;
										this.navCtrl.remove(0, index);
									});
									let alert = this.alertCtrl.create({
										title: 'Inspection created',
										subTitle: 'Your inspection has been created in local db',
										buttons: ['OK']
									});
									alert.present();
							}
							
	
						})



	





					})
		}).catch(() => {
			this.loading.dismiss();
			this.alertCtrl.create({
				title: 'Application encountered an error',
				message: 'Please try again later or restart the application'
			}).present();
		})
	}



	goBack() {
		this.navCtrl.push(InspectionRemarksPage, {
			categoryId: this.categoryId,
			category_name: this.categoryName,
			inspection_desc: this.inspection_desc,
			equipment_image: this.equipment_image,
			subCategories: JSON.stringify(this.subCategoriesIds),
			allQuestions: JSON.stringify(JSON.parse(this.allQuestions)),
			inspection_result: this.inspection_result,
			signatureImage: this.signatureImage,
			equipment_image_last: this.base64Image
		})
	}

	profileLoad = function () { this.navCtrl.push(ProfilePage) }
	previousLoad = function () { this.navCtrl.push(PreviousPage) }
	informationLoad = function () { this.navCtrl.push(InformationPage) }

	ionViewDidLoad() {
		this.keyboard.disableScroll(true);
		console.log('ionViewDidLoad PassObservationPage');
		if (this.inspection_result == 'observation') {
			this.observation = true;
		}
		if (this.inspection_result == 'safe') {
			this.safe = true;
		}
		if (this.inspection_result == 'critical') {
			this.critical = true;
		}
	}


	public presentActionSheet() {
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
			]
		});
		actionSheet.present();
	}


	openCamera() {
		console.log('openCamera');
		// Camera options		
		const options: CameraOptions = {
			quality: 50,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			// targetWidth: 150,
			// targetHeight: 100,
			saveToPhotoAlbum: false,
			allowEdit: false
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

	openGallery() {
		console.log('openGallery');
		// Camera options		
		const options: CameraOptions = {
			quality: 50,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
			// targetWidth: 150,
			// targetHeight: 100,
			saveToPhotoAlbum: false,
			allowEdit: false
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