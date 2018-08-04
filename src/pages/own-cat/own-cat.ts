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
import { Keyboard } from "@ionic-native/keyboard";
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
	category: any;
	action:string;
	editCat = false;
    
	constructor(
		private alertCtrl: AlertController, 
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private httpClient: HttpClient,
		private fb: FormBuilder, 
		private storage: Storage,
		public keyboard : Keyboard,
		private camera: Camera) 
	{
		keyboard.disableScroll(true);
		storage.get('Session.access_token').then((access_token) => {
			this.token = access_token;
		});
		storage.get('Session.user_id').then((user_id) => {
			this.userid = user_id;
		});
		this.inspection_desc = navParams.get('inspection_desc');
		this.equipment_image = navParams.get('equipment_image');
		if(navParams.get('categoryinfo')) this.category = navParams.get('categoryinfo');
		this.action = navParams.get('action');
		//Pass values check
		console.log('page> own-cat.ts');
		console.log('inspection_desc>' + this.inspection_desc);
		console.log('equipment_image>' + this.equipment_image);
		if(this.category) console.log('categoryinfo> ' + this.category.category_id);
		console.log('action> ' + this.action);
		if(this.action=="edit"){
			this.editCat=true;
		}
		
		

		this.categoryForm = fb.group({
            'name' : [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9._-\\s]{2,}') ])],
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
		this.navCtrl.push(SafetyPage, {
			inspection_desc: this.inspection_desc,
			equipment_image:this.equipment_image
		})
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad OwnCatPage');
	}
	
	create(value: any):void{
    
		this.storage.get("Session.user_id").then((user_id) => {
			this.userid = user_id;
      
			const headers =  new HttpHeaders()
				.set("user_id", this.userid.toString())
				.set("access_token", this.token);
				
			const req = this.httpClient.post(ENV.BASE_URL +'equipment-categories/user/'+this.userid+'/category', {
				equipmentCategoryName: value.name,
			},
			{headers:headers})
			.subscribe(
				res => {
					console.log(res);
					this.navCtrl.push(SafetyPage, {
						inspection_desc: this.inspection_desc,
						equipment_image:this.equipment_image
					}).then(() => {
						const index = this.navCtrl.getActive().index;
						this.navCtrl.remove(0,index);
					});
				},
				err => {
					this.response = true;
					console.log("Error occurred");
					console.log(err);
				});
		})
	}
	edit(value: any):void{
		console.log(value);
		console.log(this.category.category_id+ " "+this.userid);
		const headers =  new HttpHeaders()
		.set("user_id", this.userid.toString())
		.set("access_token", this.token);
		
	const req = this.httpClient.post(ENV.BASE_URL +'equipment-categories/user/'+this.userid+'/category/'+this.category.category_id, {
		equipmentCategoryName: value.name,
	},
	{headers:headers})
	.subscribe(
		res => {
			console.log(res);
			this.navCtrl.push(SafetyPage, {
				inspection_desc: this.inspection_desc,
				equipment_image:this.equipment_image
			}).then(() => {
				const index = this.navCtrl.getActive().index;
						this.navCtrl.remove(0,index);
			});
		},
		err => {
			this.response = true;
			console.log("Error occurred");
			console.log(err);
		});
	
	}
}
