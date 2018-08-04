import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import {SignaturePad} from 'angular2-signaturepad/signature-pad';
import {HomePage} from '../home/home';
import { PassObservationPage} from '../pass-observation/pass-observation';

@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html',
})
export class SignaturePage {

	categoryId : any;
	categoryName : any;
	inspection_desc:any;
	equipment_image:any;
	inspection_result: any;
	subCategoriesIds:any;
	allQuestions = [];
	equipment_image_last : any;
	observation_desc : any;

  @ViewChild(SignaturePad) public signaturePad : SignaturePad;

  public signaturePadOptions : Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200
  };
  public signatureImage : string;

  constructor(public navCtrl: NavController, public navParams: NavParams ) {
  		this.categoryId = navParams.get('categoryId');
		this.categoryName = navParams.get('category_name');
		this.inspection_desc = navParams.get('inspection_desc');
		this.equipment_image = navParams.get('equipment_image');
		this.subCategoriesIds = JSON.parse(navParams.get('subCategories'));
		if(navParams.get('allQuestions')) this.allQuestions = JSON.parse(navParams.get('allQuestions'));
		this.inspection_result = navParams.get('inspection_result');
		this.equipment_image_last = navParams.get('equipment_image_last');
		this.observation_desc = navParams.get('observation_desc');
		
		this.signatureImage = '';
		
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

   //Other Functions

  drawCancel() {
    this.navCtrl.push(PassObservationPage, {
			categoryId: this.categoryId,
			category_name: this.categoryName,
			inspection_desc: this.inspection_desc,
			equipment_image:this.equipment_image,
			subCategories: JSON.stringify(this.subCategoriesIds), 
			allQuestions: JSON.stringify(this.allQuestions),
			inspection_result: this.inspection_result,
			equipment_image_last: this.equipment_image_last,
			observation_desc: this.observation_desc
		}).then(() => {
			const index = this.navCtrl.getActive().index;
			this.navCtrl.remove(0,index);
		});
  }

   drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
	this.navCtrl.push(PassObservationPage, {
			categoryId: this.categoryId,
			category_name: this.categoryName,
			inspection_desc: this.inspection_desc,
			equipment_image:this.equipment_image,
			subCategories: JSON.stringify(this.subCategoriesIds), 
			allQuestions: JSON.parse(JSON.stringify(this.allQuestions)),
			inspection_result: this.inspection_result,
			signatureImage : this.signatureImage,
			equipment_image_last: this.equipment_image_last,
			observation_desc :this.observation_desc
		}).then(() => {
			const index = this.navCtrl.getActive().index;
			this.navCtrl.remove(0,index);
		});

  }

  drawClear() {
    this.signaturePad.clear();
  }
  
  canvasResize() {
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }

	ngAfterViewInit() {
		  this.signaturePad.clear();
		  this.canvasResize();
	}

}