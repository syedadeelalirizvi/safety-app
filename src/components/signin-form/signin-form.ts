import { ChiefSfetyApiProvider } from './../../providers/chief-sfety-api/chief-sfety-api';

import { Keyboard } from '@ionic-native/keyboard';
import { Component, ReflectiveInjector } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { MainPage} from './../../pages/main/main';
import { SignupPage } from './../../pages/signup/signup';
import { ForgotPasswordPage } from './../../pages/forgot-password/forgot-password';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { DeviceAccounts } from "@ionic-native/device-accounts";
import { GooglePlus } from "@ionic-native/google-plus";

@Component({
  selector: 'signin-form',
  templateUrl: 'signin-form.html',
  providers : [ChiefSfetyApiProvider]
})
export class SigninFormComponent {
	mainPage= MainPage;
  loginForm = {};
	authForm : FormGroup;
	response: any;
	categories : any;
	categories_info ="";
	VirtualCategories : any;

// ///////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////

	previousInspections = [];
  inspectionUU: any;
  categoryName: any;
  inspectionDescription: any;
  inspectionDate: any;
  networkStatus : boolean;
  inspections = [];
  inspectionRemarks = [];
  inspectionResults = [];
  reportType : any;
  reportTypeText : any;
  signatureUrl:any;
  signed: any;
	fault_image_url: any;
	inspectionData: any;

// ///////////////////////////////////////////////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////////////////////////////////////////////// ///////////////////////////////////////////////////////////////////////////////////////////////////////
	constructor(private chiefSfetyApi: ChiefSfetyApiProvider,private alrtCtrl : AlertController,private keyboard: Keyboard,public googlePlus : GooglePlus,public loadCtrl : LoadingController,public navCtrl: NavController,  private httpClient: HttpClient,  public navParams: NavParams, private fb: FormBuilder, private storage: Storage) {

		console.log(ENV.BASE_URL);
		this.response = false;
		this.authForm = fb.group({
		  'email' : [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
		  'password': [null, Validators.compose([Validators.required, Validators.minLength(8) ])]
		});

		this.keyboard.disableScroll(true);



	
	}


 
  	//load(){}
	forgotPasswordLoad(){this.navCtrl.push(ForgotPasswordPage)}
  signupLoad(){this.navCtrl.push(SignupPage)}
  

  submitForm(value: any):void{
		const loadCtrlStart = this.loadCtrl.create({
			content: 'Please wait...'
		});
		loadCtrlStart.present();
		console.log('Form submitted!')
		console.log(value.email);
	
					this.chiefSfetyApi.authenticationLogin(value.email,value.password).subscribe((res:any) => {
						loadCtrlStart.dismiss();
									//console.log(res);
									if(res.error){
										this.alrtCtrl.create({
											title : 'Your account is inactive',
											message : 'Your account has been deactivated. Please check your email of invoice to activate your account',
											buttons :[
												{ text : 'Ok', }
											]
										}).present();
									}else{
										const headers = new HttpHeaders()
        									    .set("user_id", res.data.userId.toString()).set("access_token",res.data.token);
											this.chiefSfetyApi.getUserProfileData(res.data.userId,headers).subscribe(profileData => {
												this.storage.set('Session.Offline.userProfile',profileData);
											})
											this.chiefSfetyApi.userPreviousInspections(res.data.userId,headers).subscribe((previousInspections : any) =>{
											

												// ///////////////////////////////////////////////////////////////////////////////////////////
												// ///////////////////////////////////////////////////////////////////////////////////////////
												// ///////////////////////////////////////////////////////////////////////////////////////////
												// ///////////////////////////////////////////////////////////////////////////////////////////
												// ///////////////////////////////////////////////////////////////////////////////////////////
												// ///////////////////////////////////////////////////////////////////////////////////////////
												// ///////////////////////////////////////////////////////////////////////////////////////////
												// ///////////////////////////////////////////////////////////////////////////////////////////
													this.previousInspections = previousInspections;
													if (previousInspections) {
														console.log('inspections: ', previousInspections);
														this.inspectionData =previousInspections;
														this.inspectionUU= previousInspections;
														if (this.inspectionUU.inspections && this.inspectionUU.inspections.length) {
															//console.log(this.inspectionUU.inspections);
															for (var i = 0; i < this.inspectionUU.inspections.length; i++) {
																this.inspectionResults[i]=[];
															 // console.log(this.inspectionUU.inspections.length)
																//console.log(this.inspectionData.inspections[i].category);
																//console.log(this.inspectionUU.inspections[i].inspection);
																this.inspectionDate = new Date(this.inspectionData.inspections[i].inspection.data.createdOn);
							//                  console.log(this.inspectionData.inspections[i].inspection.data.inspectionId);
																if (this.inspectionData.inspections[i].inspection.report != null)
																{  
																								this.reportType = this.inspectionData.inspections[i].inspection.report.reportType;
																							//  console.log(this.reportType);
																								if(this.reportType == 'critical'){
																										this.reportTypeText = 'Fail due to safety critical issue'
																								}else if(this.reportType == 'observation'){
																										this.reportTypeText = 'Pass but with an observation'
																								}else if(this.reportType == 'safe'){
																										this.reportTypeText = 'Passed and is safe to use'
																								}                       
																								// this.signatureUrl = ;
																								this.getBase64ImageFromUrl(this.inspectionData.inspections[i].inspection.report.signatureUrl).then(signatureImage => {
																								this.signatureUrl = signatureImage;
																								console.log(this.signatureUrl);

																								console.log(this.inspectionData);
																									this.getBase64ImageFromUrl(this.inspectionData.inspections[i].inspection.report.mediaUrl).then(faultImage =>{
																										this.fault_image_url =  faultImage
																										console.log(this.fault_image_url);
																									})

																								})
																								
																								console.log(this.signatureUrl);
																							
																							//  console.log("hello fault image "+this.fault_image_url);
																								
																}
																else
																{
																	this.reportType = null;
																								this.signatureUrl = null;
																								this.fault_image_url =null;
																}	
																					if(this.inspectionData.inspections[i].inspection.data.inspectionStatus=="Completed" || this.inspectionData.inspections[i].inspection.data.inspectionStatus=="Incomplete"){
																							this.signed = false;
																					}
																					else{
																							this.signed = true;
																							this.signatureUrl = this.inspectionData.inspections[i].inspection.report.signatureUrl;
																					}
																					//.inspectionData.inspections[i].inspection.data.inspectionId
																					for(var j = 0; j < this.inspectionData.inspections[i].inspection.answers.length; j++) {
																						this.inspectionRemarks[j]=[];
							
																						//.log("length"+ this.inspectionData.inspections[i].inspection.answers[j].length);
																						
																						 for(var k = 0; k < this.inspectionData.inspections[i].inspection.answers[j].length; k++) {
																					 // console.log( this.inspectionData.inspections[i].category.subCategories[j].equipmentSubCategoryName);
																						 // console.log("hello");
																								 this.inspectionRemarks[j].push(
																								{
																										remark_question: this.inspectionData.inspections[i].category.questions[j][k].equipmentQuestionTitle,
																										remark_answer: this.inspectionData.inspections[i].inspection.answers[j][k].inspectionAnswer, 
																						
																								});
																			
																						 }
																		
																						this.inspectionResults[i].push(
																						{
																								category_name:this.inspectionData.inspections[i].category.data.equipmentCategoryName, 
																								sub_category_id: this.inspectionData.inspections[i].category.subCategories[j].equipmentSubCategoryId,
																								sub_category_name: this.inspectionData.inspections[i].category.subCategories[j].equipmentSubCategoryName, 
																								inspection_remarks: this.inspectionRemarks[j]
																						});
																		
																				}
																this.inspections.push(
																
																	 {
																	 
																				inspection_id: this.inspectionData.inspections[i].inspection.data.inspectionId,
																				category_name: this.inspectionData.inspections[i].category.data.equipmentCategoryName,
																				inspection_description: this.inspectionData.inspections[i].inspection.data.inspectionDescription,
																				inspection_date: this.inspectionDate,
																				shareLinkOfReports : this.inspectionData.inspections[i].inspection.report.reportUrl,
																				equipment_image_url : this.inspectionData.inspections[i].inspection.data.equipmentInspectedImageUrl,
																				reportTypeText:  this.reportTypeText,
																				signatureUrl: this.signatureUrl,
																				fault_image_url: this.fault_image_url,
																				subcategories: this.inspectionResults[i] 
																			
																 
																 
																	}
																);
							
															}
														}
														console.log('inspectionsData: ', this.inspections);
							
														this.storage.set('Session.Offline.previousInspections',this.inspections);
														
							
							
													} else {
														console.log(`data is not available`);
													}
												// ///////////////////////////////////////////////////////////////////////////////////////////
												// ///////////////////////////////////////////////////////////////////////////////////////////
												// ///////////////////////////////////////////////////////////////////////////////////////////
												// ///////////////////////////////////////////////////////////////////////////////////////////
												// ///////////////////////////////////////////////////////////////////////////////////////////
												// ///////////////////////////////////////////////////////////////////////////////////////////
												// ///////////////////////////////////////////////////////////////////////////////////////////
												// ///////////////////////////////////////////////////////////////////////////////////////////

													// for (let i = 0; i < previousInspections.inspections.length; i++) {
													// 	console.log(previousInspections.inspections[i].inspection.report.signatureUrl);
													// 	console.log(previousInspections.inspections[i].inspection.report.mediaUrl);
													// 	this.getBase64ImageFromUrl(previousInspections.inspections[i].inspection.report.signatureUrl).then(base64 => console.log(base64));
												
													// }

											})
											this.chiefSfetyApi.getSpecificUserCategory(res.data.userId,headers).subscribe((userCategory : any) => {
												
												this.categories = userCategory;
		
												 for(var i = 0; i < userCategory.data.length; i ++) {
													 this.categories_info +=  userCategory.data[i].equipmentCategoryId+',';
													
													this.VirtualCategories  = userCategory
										
												 }
												 this.categories_info = this.categories_info.substring(0, this.categories_info.length - 1);
												 console.log(this.categories_info);
												 this.chiefSfetyApi.testChiefSfety(this.categories_info,headers).subscribe(resp => {
													console.log(resp);
													this.storage.set(`Session.Offline.userCategory`,resp);
												})
												 //	console.log(this.categories_info);
											})
										
										
										this.storage.set('Session.userEmail', value.email);
										this.storage.set('Session.user_name', res.data.userName);
										this.storage.set('Session.user_id', res.data.userId);
										this.storage.set('Session.access_token', res.data.token);
										this.storage.set('Session.token_expiry', res.data.expiry);
										this.storage.set('Session.profile_pic', res.data.profilePicture);
										this.storage.set('Session.company_logo', res.data.companyLogo);
							
											this.navCtrl.push(MainPage).then(() => {
												const index = this.navCtrl.getActive().index;
												this.navCtrl.remove(0,index);
											});
									}
								
														
						
				},err => {
					loadCtrlStart.dismiss();
							this.response = true;
							console.log("Error occurred");
							console.log(err);
						
						}
					);		
  }	
	

	async getBase64ImageFromUrl(imageUrl) {
		var res = await fetch(imageUrl);
		var blob = await res.blob();
	
		return new Promise((resolve, reject) => {
			var reader  = new FileReader();
			reader.addEventListener("load", function () {
					resolve(reader.result);
			}, false);
	
			reader.onerror = () => {
				return reject(this);
			};
			reader.readAsDataURL(blob);
		})
	}
	



	// getEmail(){	
	// 	this.googlePlus.login({}).then(res => {
	// 		console.log(res);
	// 	}).catch(err => console.log(err));
	// }


}

