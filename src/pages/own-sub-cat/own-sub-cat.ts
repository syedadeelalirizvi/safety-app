import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';
import { SafetyCatInfoPage} from '../safety-cat-info/safety-cat-info';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { constant as ENV } from '../../configs/constant';

@IonicPage()
@Component({
  selector: 'page-own-sub-cat',
  templateUrl: 'own-sub-cat.html',
})

export class OwnSubCatPage {
	userid :any;
	token :string;
	categoryId :any;
	categoryName :any;
	inspection_desc :any;
	equipment_image :any;
	inspection_result : any;
	subCategoriesIds :any;
	allQuestions :any;
	public form 	: FormGroup;
 
    constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private storage: Storage,
		private fb: FormBuilder,
		private httpClient: HttpClient)
	{
		this.form = this.fb.group({
				name : ['', Validators.required],
				questions     : this.fb.array([
				this.initQuestionsFields()
			])
		});
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
		//Pass values check
		console.log('page> own-sub-cat.ts (3rd step - associated)');
		console.log('inspection_desc>' + this.inspection_desc);
		console.log('equipment_image>' + this.equipment_image);
		console.log('categoryId>' + this.categoryId);
		console.log('category_name>' + this.categoryName);
  
    }
   
   initQuestionsFields() : FormGroup
	{
		return this.fb.group({
			name : ['', Validators.required]
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
		this.navCtrl.push(SafetyCatInfoPage, {
			categoryId: this.categoryId,
			category_name: this.categoryName,
			inspection_desc: this.inspection_desc,
			equipment_image:this.equipment_image
		});
	}
	
	ionViewDidLoad() 
	{
    
	}
	
	save()
	{
		this.navCtrl.push(SafetyCatInfoPage, {
			categoryId: this.categoryId,
			category_name: this.categoryName,
			inspection_desc: this.inspection_desc,
			equipment_image:this.equipment_image
		}); 
	}
	
	manage(val : any) : void
	{
		console.dir(val);
		console.log(val);
		
		// API call to add sub category
		const headers =  new HttpHeaders()
			.set("user_id", this.userid.toString())
			.set("access_token", this.token);
			
		const req = this.httpClient.post(ENV.BASE_URL +'equipment-sub-categories/category/'+this.categoryId+'/subcategory', {
			equipmentSubCategoryName: val.name
		},
		{headers:headers})
		.subscribe(data => {

			console.log("subCategoryId>"+data.data.equipmentSubCategoryId);
			console.log(val.questions[0]);
			//API call to add questions under sub category
			const req = this.httpClient.post(ENV.BASE_URL +'equipment-questions/subcategory/'+data.data.equipmentSubCategoryId+'/questions', {
			questions: val.questions // Need to refactor API to get response as array 
			},
			{headers:headers})
			.subscribe(dataNested => {
				console.log(dataNested);
				// all done redirect to main page
				this.navCtrl.push(SafetyCatInfoPage, {
					categoryId: this.categoryId,
					category_name: this.categoryName,
					inspection_desc: this.inspection_desc,
					equipment_image:this.equipment_image
				});  
			},
			err => {
				console.log("Error occurred");
				console.log(err);
			});
		},
		err => {
			console.log("Error occurred");
			console.log(err);
		});
		
	}
	
	addNewInputField() : void
	{
		const control = <FormArray>this.form.controls.questions;
		control.push(this.initQuestionsFields());
	}
	
	removeInputField(i : number) : void
	{
		const control = <FormArray>this.form.controls.questions;
		control.removeAt(i);
	}
	
}
