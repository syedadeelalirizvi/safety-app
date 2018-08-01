import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';
import { RemarksPage} from '../remarks/remarks';
import { OwnSubCatPage} from '../own-sub-cat/own-sub-cat';
import { SafetyPage } from '../safety/safety';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl,FormArray,FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-safety-cat-info',
  templateUrl: 'safety-cat-info.html',
})

export class SafetyCatInfoPage {
	categoryId : any;
	categoryName : any;
	inspection_desc: any;
	equipment_image: any;
	userid: any;
	user: any;
	token: string;
	sub_category: any;
	subCategories = [];
	checkedList = [];
	filter: any;
	allQuestions: any;
	selectedAnswers: any;
	response :any;
	subCategoriesCopy = [];
	subcategoryForm: FormGroup;
	collections:any;
	
  
	constructor(
		private alertCtrl: AlertController, 
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private httpClient: HttpClient,
		private fb: FormBuilder, 
		private storage: Storage) 
	{
		storage.get('Session.access_token').then((access_token) => {
			this.token = access_token;
		});
		storage.get('Session.user_id').then((user_id) => {
			this.userid = user_id;
		});
		
		this.categoryId = navParams.get('categoryId');
		this.categoryName = navParams.get('category_name');
		this.inspection_desc = navParams.get('inspection_desc');
		this.equipment_image = navParams.get('equipment_image');
		if(navParams.get('subCategories')) this.checkedList = JSON.parse(navParams.get('subCategories'));
		if(navParams.get('allQuestions')) this.allQuestions = JSON.parse(navParams.get('allQuestions'));
		
		
		//Pass values check
		console.log('page> safety-cat-info.ts (3rd step)');
		console.log('inspection_desc>' + this.inspection_desc);
		console.log('equipment_image>' + this.equipment_image);
		console.log('categoryId>' + this.categoryId);
		console.log('category_name>' + this.categoryName);
		console.log('checkedList>' , this.checkedList);
		console.log('allQuestions>' , this.allQuestions);
		
		this.subcategoryForm = this.fb.group({});
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
			equipment_image:this.equipment_image,
			categoryId: this.categoryId,
			category_name: this.categoryName
		});
	}
	
	OwnCatLoad = function()
	{
		this.navCtrl.push(OwnSubCatPage, {
			inspection_desc: this.inspection_desc,
			equipment_image:this.equipment_image,
			categoryId: this.categoryId,
			category_name: this.categoryName,
			action: "add"
		});
	}
	editSubCategory(subcategory:any){
		console.log("edit clicked"+subcategory.sub_category_id);
		const headers = new HttpHeaders()
		.set("user_id", this.userid.toString())
		.set("access_token", this.token);
		
	this.collections = this.httpClient.get(ENV.BASE_URL +'user-inspections/category/'+this.categoryId+'/remarks?sub_category_id='+subcategory.sub_category_id,{headers:headers});
	this.collections
	.subscribe((collection_data: any) => 
	{
		console.log("New Collection");
		console.log(collection_data.data.userSubCategories[0]);
		this.navCtrl.push(OwnSubCatPage, {
			inspection_desc: this.inspection_desc,
			equipment_image:this.equipment_image,
			categoryId: this.categoryId,
			category_name: this.categoryName,
			subcategoryinfo: collection_data.data.userSubCategories[0],
			action : "edit"
		});
	}),
	err => {				
		console.log("Error occurred");
		console.log(err);
	}



	

	}

	ionViewDidLoad() 
	{
		console.log('ionViewDidLoad');
		this.storage.get("Session.access_token").then((access_token) => {
			this.token = access_token;
			console.log(this.token + this.userid);
			const headers = new HttpHeaders()
              .set("user_id", this.userid.toString())
			  .set("access_token", this.token);

			this.sub_category = this.httpClient.get(ENV.BASE_URL +'equipment-sub-categories/category/'+this.categoryId+'/subcategory',{headers:headers});
			this.sub_category
			.subscribe(data => {
				console.log("Length" + data.data.length);
				console.log(data);
				if(data.data && typeof data.data === 'object' && data.data.constructor === Array)
				{	
					for(var i = 0; i < data.data.length; i++) {
						this.subCategories.push(
						{
							sub_category_id:data.data[i].equipmentSubCategoryId,
							sub_category_name: data.data[i].equipmentSubCategoryName, 
						});
					}
					this.subCategoriesCopy = Object.assign([], this.subCategories);
				}
			})
		})
		console.log(this.subCategories);
		console.log('ionViewDidLoad SafetyCatInfoPage');
	}

	clickSelectBox(subcategory:any)
	{
		const foundAt = this.checkedList.indexOf(subcategory.sub_category_id);
		if (foundAt >= 0) {
			this.checkedList.splice(foundAt, 1);
		} 
		else 
		{
			this.checkedList.push(subcategory.sub_category_id);
		}
		console.log(this.checkedList);
		console.log(JSON.stringify(this.checkedList));
		
	}
	
	list(value: any):void
	{
		console.log(value);
		console.log(this.checkedList);
		this.navCtrl.push(RemarksPage, {
				categoryId: this.categoryId,
				category_name: this.categoryName,
				inspection_desc: this.inspection_desc,
				equipment_image:this.equipment_image,
				subCategories: JSON.stringify(this.checkedList),
				allQuestions: JSON.stringify(this.allQuestions)
		});
	}
	
	filterSubCategories() : void
	{
		console.log('filterSubCategories>' + this.filter);
	
		let val : string 	= this.filter;

		//set default every time
		this.subCategories = this.subCategoriesCopy
		
		if (val.trim() == '')
		{
			this.subCategories = this.subCategoriesCopy; 
		}
		else
		{
			this.subCategories = this.subCategories.filter((item) =>
			{
				return item.sub_category_name.toLowerCase().indexOf(val.toLowerCase()) > -1;
			})
		}  
	}
	
	check(subcat_id : any)
	{
		let result : any;
		result = this.checkedList.indexOf(subcat_id);
		if (result !== -1)
		{
			return true;
		}	
		return false;	
	}
	deleteSubCat(value:string) 
	{
		let alert = this.alertCtrl.create({
			title: 'Confirm delete sub category',
			message: 'Are you sure you want to permanently delete this sub category alongwith its data?',
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
						console.log('Delete clicked '+value+" "+this.categoryId);
						const headers = new HttpHeaders()
						.set("user_id", this.userid.toString())
						.set("access_token", this.token);

		this.sub_category = this.httpClient.delete(ENV.BASE_URL +'equipment-sub-categories/category/'+this.categoryId+'/subcategory/'+value,{headers:headers});
		this.sub_category.subscribe(data => 
		{
			console.log(data);
			this.navCtrl.push(SafetyCatInfoPage, {
				categoryId: this.categoryId,
				category_name: this.categoryName,
				inspection_desc: this.inspection_desc,
				equipment_image:this.equipment_image
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