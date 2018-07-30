import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProfilePage} from '../profile/profile';
import { InformationPage} from '../information/information';
import { PreviousPage} from '../previous/previous';

import { SafetyCatInfoPage} from '../safety-cat-info/safety-cat-info';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl,FormArray,FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PassSafePage} from '../pass-safe/pass-safe';
import { PassObservationPage} from '../pass-observation/pass-observation';
import { FailDuePage} from '../fail-due/fail-due';
import { RemarksPage} from '../remarks/remarks';


@Component({
  selector: 'page-inspection-remarks',
  templateUrl: 'inspection-remarks.html',
})
export class InspectionRemarksPage {
	userid:any;
	token:string;
	categoryId:any;
	categoryName:any;
	inspection_desc:any;
	equipment_image:any;
	inspection_result: any;
	subCategoriesIds:any;
	allQuestions:any;
	checkFail=false;
	
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private httpClient: HttpClient,
		private fb: FormBuilder, 
		private storage: Storage) {
			
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
		this.inspection_result = navParams.get('inspection_result');
		
		//Pass values check
		console.log('page> inspection-remarks.ts (5th step)');
		console.log('inspection_desc>' + this.inspection_desc);
		console.log('equipment_image>' + this.equipment_image);
		console.log('categoryId>' + this.categoryId);
		console.log('category_name>' + this.categoryName);
		console.log('subCategoriesIds>' + this.subCategoriesIds);
		console.log('allQuestions>' + this.allQuestions); 
		console.log('inspection_result>' + this.inspection_result); 
	}
	
	goBack(){
		this.navCtrl.pop();
	}

	profileLoad = function(){this.navCtrl.push(ProfilePage)}
	previousLoad = function(){this.navCtrl.push(PreviousPage)}
	informationLoad = function(){this.navCtrl.push(InformationPage)}
	//passSafeLoad = function(){this.navCtrl.push(PassSafePage)}
	//passObservationLoad = function(){this.navCtrl.push(PassObservationPage)}
	//failDueLoad = function(){this.navCtrl.push(FailDuePage)}
	nextPageLoad(type: any)
	{
		this.inspection_result = type;
		this.navCtrl.push(PassObservationPage, {
			categoryId: this.categoryId,
			category_name: this.categoryName,
			inspection_desc: this.inspection_desc,
			equipment_image:this.equipment_image,
			subCategories: JSON.stringify(this.subCategoriesIds), 
			allQuestions: JSON.stringify(this.allQuestions),
			inspection_result: this.inspection_result
		});
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad InspectionRemarksPage');
		console.log(this.allQuestions.userSubCategories[0].questions);
		for (let i = 0; i < this.allQuestions.userSubCategories[0].questions.length; i++){
			console.log(this.allQuestions.userSubCategories[0].questions[i].answer);
			if(this.allQuestions.userSubCategories[0].questions[i].answer=='fail'){
				this.checkFail = true;
				break;
			}

		}
	
	}
}