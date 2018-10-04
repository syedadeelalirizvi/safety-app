import { ChiefSfetyApiProvider } from './../../providers/chief-sfety-api/chief-sfety-api';
import { HttpHeaders } from '@angular/common/http';
import { Network } from '@ionic-native/network';
import { HomePage } from './../home/home';
import { Keyboard } from '@ionic-native/keyboard';

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { InformationPage } from '../information/information';
import { PreviousPage } from '../previous/previous';
import { WorkPage } from '../work/work';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'page-main',
	templateUrl: 'main.html',
	providers : [ChiefSfetyApiProvider]
})
export class MainPage {

	constructor(private ChiefSfetyApiProvider : ChiefSfetyApiProvider,private network : Network,private keyboard: Keyboard, public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
		keyboard.disableScroll(true);
	}

	logout() {
		console.log('logout');
		// clearing up sessions values 
		this.storage.ready().then(() => {
			this.storage.remove('Session.user_name').then(() => { console.log('deleted') });
			this.storage.remove('Session.user_id');
			this.storage.remove('Session.access_token');
			this.storage.remove('Session.token_expiry');
			this.storage.remove('Session.profile_pic');
			this.storage.remove('Session.company_logo');
			this.storage.clear();
		});
		this.navCtrl.push(HomePage).then(() => {
			const index = this.navCtrl.getActive().index;
			this.navCtrl.remove(0, index);
		});

	}
	ionViewCanEnter() {
	this.network.onConnect().subscribe(() => {
		
	  })


	  this.storage.get('Session.user_id').then(userid => {
		this.storage.get('Session.token_expiry').then(tokenExpiry => {
	this.storage.get('Session.Offline.inspections').then(OfflineInspections => {
		console.log(OfflineInspections);
		for(let i = 0; i < OfflineInspections.length; i ++){
			console.log( JSON.parse(OfflineInspections[i]));
					const headers = new HttpHeaders()
					.set("user_id", userid.toString())
					.set("access_token", tokenExpiry);
					this.ChiefSfetyApiProvider.userSubmitInspection(OfflineInspections[i].userid,OfflineInspections[i].categoryId,OfflineInspections[i].equipment_image,OfflineInspections[i].inspection_desc, JSON.parse(OfflineInspections[i].subCategoriesIds),JSON.parse(OfflineInspections[i].questionFromDb),headers).subscribe((data:any) => {
						this.ChiefSfetyApiProvider.userSubmitReport(data.data.inspectionId,OfflineInspections[i].inspection_result,OfflineInspections[i].description,OfflineInspections[i].signatureImage,OfflineInspections[i].base64Image,headers).subscribe((dataNested : any) => {
							console.log('inspections createdd sucessfully');
						}) 
					})
				  }
			})


			this.storage.get('Session.Offline.userProfile').then(userProfile => {

			})

		})
					
	})
	this.storage.get('Session.Offline.userProfile').then(OfflineProfileData => {
	  console.log(OfflineProfileData);
	})
	}

	

	//profileLoad = function(){this.navCtrl.push(PassObservationPage); console.log('click');}  
	profileLoad = function () { this.navCtrl.push(ProfilePage) }
	previousLoad = function () { this.navCtrl.push(PreviousPage) }
	informationLoad = function () { this.navCtrl.push(InformationPage) }
	workLoad = function () { this.navCtrl.push(WorkPage); }
}
