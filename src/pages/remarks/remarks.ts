import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';
import { PassObservationPage} from '../pass-observation/pass-observation';
import { InspectionRemarksPage } from '../inspection-remarks/inspection-remarks';
import { SafetyCatInfoPage} from '../safety-cat-info/safety-cat-info';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl,FormArray,FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
    selector: 'page-remarks',
    templateUrl: 'remarks.html',
})
export class RemarksPage {
    categoryId : any;
    categoryName : any;
    subdata: any = {};
    userid: any;
	allQuestions:any;
    categories:any;
    subcategories:any;
    questions:any;
    token: string;
    public sub_id:any;
    sub_category: any;
    category_id: any;
	answers: any;
    public sub_category_name ="false";
    public category_name = "false";
    checkedList = [];
    response :any;
	myform: FormGroup;
	inspection_desc:any;
	equipment_image:any;
	inspection_result: any;
	subCategoriesIds:any;
	collections:any;
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private httpClient: HttpClient,
		private fb: FormBuilder, 
		private storage: Storage) 
	{
		this.allQuestions = [];
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
		this.subCategoriesIds = JSON.parse(navParams.get('subCategories'));
		if(navParams.get('allQuestions')) this.allQuestions = JSON.parse(navParams.get('allQuestions'));

		
		//Pass values check
		console.log('page> Remarks.ts (4th step)');
		console.log('inspection_desc>' + this.inspection_desc);
		console.log('equipment_image>' + this.equipment_image);
		console.log('categoryId>' + this.categoryId);
		console.log('category_name>' + this.categoryName);
		console.log('subCategoriesIds>' + this.subCategoriesIds);
		console.log('allQuestions>' +  this.allQuestions);
      
		//this.myform = this.fb.group({ });
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
    
    goBack()
	{
		console.log('Before leave', this.allQuestions, JSON.stringify(this.allQuestions));
		
		
		this.navCtrl.push(SafetyCatInfoPage, {
			categoryId: this.categoryId,
			category_name: this.categoryName,
			inspection_desc: this.inspection_desc,
			equipment_image:this.equipment_image,
			subCategories: JSON.stringify(this.subCategoriesIds), 
			allQuestions: JSON.stringify(this.allQuestions)
		});  
    }
	
	informationremarksLoad(value: any)
	{
		console.log("Submit Form!");
		console.log(value);
		console.log('wht is this value>'+this.allQuestions);
		
		this.navCtrl.push(InspectionRemarksPage, {
			categoryId: this.categoryId,
			category_name: this.categoryName,
			inspection_desc: this.inspection_desc,
			equipment_image:this.equipment_image,
			subCategories: JSON.stringify(this.subCategoriesIds), 
			allQuestions: JSON.stringify(this.allQuestions)
		});
		
		//this.navCtrl.push(InspectionRemarksPage);
	}

    ionViewDidLoad() 
	{
		//  this.subdata = navParams.get('data');
		// if(!this.navParams.get('allQuestions'))
		// {	 
			this.storage.get("Session.user_id").then((user_id) => 
			{
				this.userid = user_id;
				const headers = new HttpHeaders()
					.set("user_id", this.userid.toString())
					.set("access_token", this.token);
					
				this.collections = this.httpClient.get(ENV.BASE_URL +'user-inspections/category/'+this.categoryId+'/remarks?sub_category_id='+this.subCategoriesIds,{headers:headers});
				this.collections
				.subscribe((collection_data: any) => 
				{
					console.log("New Collection");
					console.log(collection_data);
					if(collection_data.data && typeof collection_data.data === 'object')
					{	
						this.allQuestions = collection_data.data;
						console.log(this.allQuestions);
					}
				}),
				err => {				
					console.log("Error occurred");
					console.log(err);
				}
			})
		//}
		console.log('ionViewDidLoad RemarksPage');
    }
	
    answerList(questions:any, value:any)
	{
		console.log("answerList");
        console.log(value);
        console.log(questions);
		
		for (let i = 0; i < this.allQuestions.userSubCategories.length; i++)
		{
			for (let j = 0; j < this.allQuestions.userSubCategories[i].questions.length; j++)
			{
				if(this.allQuestions.userSubCategories[i].questions[j].questionId == questions.questionId)
				{
					this.allQuestions.userSubCategories[i].questions[j]['answer'] = value;
				}	//break;
			}	
		}
		
		console.log('answerList>'+this.allQuestions);
    }
}