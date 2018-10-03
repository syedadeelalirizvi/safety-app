import { ChiefSfetyApiProvider } from './../../providers/chief-sfety-api/chief-sfety-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { WorkPage} from '../work/work';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';
import { SafetyCatInfoPage} from '../safety-cat-info/safety-cat-info';
import { OwnCatPage} from '../own-cat/own-cat';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { Network } from "@ionic-native/network";
@Component({
  selector: 'page-safety',
  templateUrl: 'safety.html',
  providers: [ChiefSfetyApiProvider]
})

export class SafetyPage {
    inspection_desc: any;
    equipment_image: any;
    userid: any;
    token: any;
    category: any;
	filter: any;
	categories = [];
	categoriesCopy = [];
    networkStatus : boolean;
	constructor(
		private network :  Network,
		public loadCtrl : LoadingController,
		private alertCtrl: AlertController, 
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private httpClient: HttpClient,
		private fb: FormBuilder, 
		private storage: Storage,
		private camera: Camera ,
		private ChiefSfetyApiProvider:ChiefSfetyApiProvider) 
	{
		
		storage.get('Session.access_token').then((access_token) => {
			this.token = access_token;
		});
		storage.get('Session.user_id').then((user_id) => {
			this.userid = user_id;
		});
		this.inspection_desc = navParams.get('inspection_desc');
		this.equipment_image = navParams.get('equipment_image');
		//Pass values check
		console.log('page> safety.ts');
		console.log('inspection_desc>' + this.inspection_desc);
		console.log('equipment_image>' + this.equipment_image);		
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
		this.navCtrl.push(WorkPage, {
			inspection_desc: this.inspection_desc,
			equipment_image: this.equipment_image
		})
	}
	
	OwnCatLoad(){
		this.navCtrl.push(OwnCatPage, {
			inspection_desc: this.inspection_desc,
			equipment_image:this.equipment_image,
			action: "add"
		}).then(() =>{
			const index = this.navCtrl.getActive().index;
			this.navCtrl.remove(0,index);
		});
	}
	editCategory(category:any){
		console.log(category);
		this.navCtrl.push(OwnCatPage, {
			inspection_desc: this.inspection_desc,
			equipment_image:this.equipment_image,
			categoryinfo: category,
			action : "edit"
		}).then(() => {
			const index = this.navCtrl.getActive().index;
			this.navCtrl.remove(0,index);
		});

	}
	
	buttonClick = 	function(){
						this.navCtrl.push(SafetyCatInfoPage).then(() => {
							const index = this.navCtrl.getActive().index;
							this.navCtrl.remove(0,index);
						});
					}
					
	ionViewDidLoad() 
	{  
		if(this.network.type == 'null' || 'unknown'){
			this.networkStatus = false
		}else{
			this.networkStatus = true
		}
		const loadCtrlStart = this.loadCtrl.create({
			content : "Please Wait..."
		});
		loadCtrlStart.present();
		this.storage.get('Session.user_id').then((user_id) => {
			this.userid = user_id;
			const headers = new HttpHeaders()
							.set("user_id", this.userid.toString())
							.set("access_token", this.token);
			this.ChiefSfetyApiProvider.getSpecificUserCategory(this.userid,headers).subscribe((data : any) => {
				console.log(data);
				loadCtrlStart.dismiss();
				for(var i = 0; i < data.data.length; i++) {
				  this.categories.push(
				  {
					  category_id:data.data[i].equipmentCategoryId,
					  category_name: data.data[i].equipmentCategoryName, 
					 
				  });
				}
				this.categoriesCopy = Object.assign([], this.categories);
			},err => {
				this.storage.get(`Session.Offline.userCategory`).then((data : any) => {
					console.log(data);
					console.log(data.length);
					loadCtrlStart.dismiss();
					for(var i = 0; i < data.length; i++) {
						console.log(data[i].subCategories);
					  this.categories.push(
					  {
						category_id: data[i].categoryId,
						category_name: data[i].categoryName,
						subcategory : data[i].subCategories 
					  });
					 
					}
					console.log(this.categories)
					this.categoriesCopy = Object.assign([], this.categories);
				})
			});
		})		
	}
    
	gotoDetails(category,id:string,name:string){
		console.log('Lifting Clicked'+id); 
		this.navCtrl.push(SafetyCatInfoPage, {
			categoryId: id,
			category_name: name,
			inspection_desc: this.inspection_desc,
			equipment_image:this.equipment_image,
			specific_cat : category
		}).then(() => {
			const index = this.navCtrl.getActive().index;
			this.navCtrl.remove(0,index);
		}); 
	}
	
	filterCategories() : void
	{
		console.log('filterCategories>' + this.filter);
	
		let val : string 	= this.filter;

		//set default every time
		this.categories = this.categoriesCopy
		
		if (val.trim() == '')
		{
			this.categories = this.categoriesCopy; 
		}
		else
		{
			this.categories = this.categories.filter((item) =>
			{
				return item.category_name.toLowerCase().indexOf(val.toLowerCase()) > -1;
			})
		}  
	}
	delete(value:string) {
		let alert = this.alertCtrl.create({
			title: 'Confirm delete category',
			message: 'Are you sure you want to permanently delete this category alongwith its data?',
			buttons: [
				{
					text: 'No',
					handler: () => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Yes',
					handler: () => {
						console.log('Delete clicked '+value+" "+this.userid);
						const headers = new HttpHeaders()
						.set("user_id", this.userid.toString())
						.set("access_token", this.token);
					this.ChiefSfetyApiProvider.delSpecificUserCayegory(this.userid,value,headers).subscribe(data => {
					
			console.log(data);
			this.navCtrl.push(SafetyPage, {
			
				inspection_desc: this.inspection_desc,
				equipment_image:this.equipment_image
			}).then(() =>{
				const index = this.navCtrl.getActive().index;
				this.navCtrl.remove(0,index);
			}); 
		}),
		err => {				
			console.log("Error occurred");
			console.log(err);
		}

					}
				}
			]
		});
		alert.present();
	  }

}
