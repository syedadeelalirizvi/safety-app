import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { Keyboard } from "@ionic-native/keyboard";
import firebase from "firebase";
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {
	errorResponse: any;
	errors : any ; 
	signupForm : FormGroup;
	response: any;
	imageUpload: any;
	base64Image: string;

	constructor(private keyboard : Keyboard,private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage, private camera: Camera) {
		this.base64Image = '';
		this.imageUpload = false;
		this.response = false;
		this.signupForm = fb.group({
			'email' : [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
			'department' : [],
			'nameToReceiveReport' : [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z._-\\s]{2,}')])],
			'emailToReceiveReport' : [null, Validators.compose([Validators.required,Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
			'company' : [],
			'username' : [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9._-]{2,}') ])],
			'confirmPass': [null, Validators.compose([Validators.required, Validators.minLength(8) ])], 
			'password': [null, Validators.compose([Validators.required, Validators.minLength(8) ])]
		});
		keyboard.disableScroll(true);
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
	
	uploadImage(){
		
	}
	
	goBack(){
		this.navCtrl.pop();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SignupPage');
	}
  
	signUp(value: any):void {
		(<HTMLInputElement> document.getElementById("signup-submit")).disabled = true;
		(<HTMLInputElement> document.getElementById("signup-submit")).innerHTML = "Please wait..";

		console.log('signup clicked');
        console.log(value.email);
        const headers = new HttpHeaders({
			'Content-Type': 'application/json'
        });
		
        const req = this.httpClient.post(ENV.BASE_URL + 'users', {
		      	userEmail: value.email,
            userPassword: value.password,
            userName: value.username,
            userDepartment: value.department,
            userCompany: value.company,
            nameToReceiveReport: value.nameToReceiveReport,
            emailToReceiveReport: value.emailToReceiveReport,
			companyLogo: this.base64Image
				  
        },{headers:headers})
		.subscribe(res => {
			firebase.auth().createUserWithEmailAndPassword(value.email,value.password).then(
				auth => {
					console.log(auth)
				firebase.database().ref(`profile/${auth.uid}`).set({
					userEmail: value.email,
					userPassword: value.password,
					userName: value.username,
					userDepartment: value.department,
					userCompany: value.company,
					nameToReceiveReport: value.nameToReceiveReport,
					emailToReceiveReport: value.emailToReceiveReport,
					companyLogo: this.base64Image,
				
				}).then(() => {
					let alert = this.alertCtrl.create({	
						title: 'Success',
						subTitle: 'Your account registered!',
						buttons: ['Dismiss']
					});
					alert.present();
					this.navCtrl.pop();
				})
			})
			},
			err => {
				this.response = true;
				console.log("Error occurred");
				console.log(err);
			}
		);		
	}
}
