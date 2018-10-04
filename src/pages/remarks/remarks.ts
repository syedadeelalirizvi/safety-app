import { Network } from '@ionic-native/network';
import { ChiefSfetyApiProvider } from './../../providers/chief-sfety-api/chief-sfety-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController , LoadingController} from 'ionic-angular';
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
	providers : [ChiefSfetyApiProvider]
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
	networkStatus : boolean;
	OfflineQuestions : any;
	specific_cat : any;
	constructor(
		private network : Network,
		private ChiefSfetyApiProvider : ChiefSfetyApiProvider,
		public loadCtrl : LoadingController,
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private httpClient: HttpClient,
		private fb: FormBuilder, 
		private alertCtrl  :AlertController,
		private storage: Storage) 
	{
		this.allQuestions = [];
		storage.get('Session.access_token').then((access_token) => {
			this.token = access_token;
		});
		storage.get('Session.user_id').then((user_id) => {
			this.userid = user_id;
		});
		
		this.OfflineQuestions = navParams.get('questions');
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
			specific_cat : this.specific_cat,
			subCategories: JSON.stringify(this.subCategoriesIds), 
			allQuestions: JSON.stringify(this.allQuestions)
		})
    }
	
	informationremarksLoad(value: any)
	{
		console.log("Submit Form!");
		console.log(value);
		console.log('wht is this value>'+this.allQuestions);
		this.storage.set(`session.${this.userid.toString()}.questions`,this.allQuestions).then(() => {
			console.log(`the questions is  => ${this.allQuestions}`);
			this.navCtrl.push(InspectionRemarksPage, {
				categoryId: this.categoryId,
				category_name: this.categoryName,
				inspection_desc: this.inspection_desc,
				equipment_image:this.equipment_image,
				subCategories: JSON.stringify(this.subCategoriesIds), 
				allQuestions: JSON.stringify(this.allQuestions)
			}).then(() => {
				const index = this.navCtrl.getActive().index;
				this.navCtrl.remove(0,index);
			});
		}).catch(() => {
			this.alertCtrl.create({
				title : 'Something happen!',
				message : 'please restart this app before using..'
			}).present();
		})
	
		
		//this.navCtrl.push(InspectionRemarksPage);
	}

    ionViewDidLoad() 
	{
		this.specific_cat = this.navParams.get('specific_cat');
		console.log(this.specific_cat);
		if(this.network.type == 'null' || 'unknown'){
			this.networkStatus = false
		}else{
			this.networkStatus = true
		}
		this.OfflineQuestions = this.navParams.get('questions');
		console.log(this.OfflineQuestions);			
		const loadCtrlStart  = this.loadCtrl.create({
			content: 'Please Wait...'
		});
		loadCtrlStart.present();
			this.storage.get("Session.user_id").then((user_id) => 
			{
				this.userid = user_id;
				const headers = new HttpHeaders()
					.set("user_id", this.userid.toString())
					.set("access_token", this.token);
					this.ChiefSfetyApiProvider.getCategoriesQuestions(this.category_id,this.subCategoriesIds,headers).subscribe((collection_data : any) => {
					loadCtrlStart.dismiss();
					console.log("New Collection");
					console.log(collection_data);
					if(collection_data.data && typeof collection_data.data === 'object')
					{	
						this.allQuestions = collection_data.data;
						console.log(this.allQuestions);
					}
				}, err => {
								
						loadCtrlStart.dismiss();
						console.log(this.OfflineQuestions);
						console.log("New Collection");
						if(this.OfflineQuestions && typeof this.OfflineQuestions === 'object')
						{	
							this.allQuestions = this.OfflineQuestions;
							console.log(this.allQuestions);
						}
				})
			
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
		
		console.log('answerList>'+ JSON.stringify(this.allQuestions));
		}
		// ////////////////////////////////////////////////////////////////////////////////////////////////////
	 // ////////////////////////////////////////////////////////////////////////////////////////////////////
	 // ////////////////////////////////////////////////////////////////////////////////////////////////////
	 // ////////////////////////////////////////////////////////////////////////////////////////////////////
	 // ///////////////////////////////////////////////////////////////////////////////////////////////////
	 // ////////////////////              O  F  F  L  I  N  E             //////////////////////////////////
	 // ////////////////////////////////////////////////////////////////////////////////////////////////////
	 // ////////////////////////////////////////////////////////////////////////////////////////////////////
	 // ////////////////////////////////////////////////////////////////////////////////////////////////////
	 // ////////////////////////////////////////////////////////////////////////////////////////////////////
	 // ////////////////////////////////////////////////////////////////////////////////////////////////////
	 // ////////////////////////////////////////////////////////////////////////////////////////////////////
	 // ////////////////////////////////////////////////////////////////////////////////////////////////////
	 // ////////////////////////////////////////////////////////////////////////////////////////////////////
	 // ////////////////////////////////////////////////////////////////////////////////////////////////////
	 // ////////////////////////////////////////////////////////////////////////////////////////////////////

		answerListOffline(questions:any,value:any){
			console.log(questions);
			console.log(value)
			console.log(this.allQuestions);
			console.log(this.allQuestions.length);
			
			for(let a = 0; a < this.allQuestions.length; a++){
				for (let i = 0; i < this.allQuestions[a].questions.length; i++)
				{
					if(this.allQuestions[a].questions[i].questionId == questions.questionId)
					{
						this.allQuestions[a].questions[i]['answer'] = value;
					}	//break;

				}
			}
			console.log(this.allQuestions);

		}
}