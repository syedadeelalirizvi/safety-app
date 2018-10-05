import { ChiefSfetyApiProvider } from './../../providers/chief-sfety-api/chief-sfety-api';
import { HttpHeaders } from '@angular/common/http';
import { MainPage } from './../main/main';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Keyboard } from "@ionic-native/keyboard";
import { Network } from "@ionic-native/network";
@Component({
  selector: 'page-home',
	templateUrl: 'home.html',
	providers: [ChiefSfetyApiProvider]
})
export class HomePage {



	//res.data:any;
	
	constructor(private ChiefSfetyApiProvider : ChiefSfetyApiProvider, private network : Network,private keyboard : Keyboard , public storage : Storage , public navCtrl : NavController) {
		keyboard.disableScroll(true);
	}

	ionViewCanEnter() {
		// this.network.onConnect().subscribe(() => {
			this.storage.get('Session.user_id').then(userid => {
				this.storage.get('Session.access_token').then(token => {
							this.storage.get('Session.Offline.inspections').then(OfflineInspections => {
								console.log(OfflineInspections);
								
								
								for(let i = 0; i < OfflineInspections.length; i ++){
									setTimeout(() => {
										// console.log(OfflineInspections[i].questions)
										const headers = new HttpHeaders()
										.set("user_id", OfflineInspections[i].userid.toString())
										.set("access_token", token);
										console.log(headers);
									
										console.log(OfflineInspections[i].userid)
										console.log(OfflineInspections[i].categoryId)
										console.log(OfflineInspections[i].equipment_image)
										console.log(OfflineInspections[i].inspection_desc)
										console.log(JSON.parse(OfflineInspections[i].subCategoriesIds))
										console.log(JSON.parse(OfflineInspections[i].questions))
										console.log(headers);
										this.ChiefSfetyApiProvider.userSubmitInspection(OfflineInspections[i].userid,OfflineInspections[i].categoryId,OfflineInspections[i].equipment_image,OfflineInspections[i].inspection_desc, JSON.parse(OfflineInspections[i].subCategoriesIds),JSON.parse(OfflineInspections[i].questions),headers).subscribe((data:any) => {
											this.ChiefSfetyApiProvider.userSubmitReport(data.data.inspectionId,OfflineInspections[i].inspection_result,OfflineInspections[i].description,OfflineInspections[i].signatureImage,OfflineInspections[i].base64Image,headers).subscribe((dataNested : any) => {	
												console.log('sucess');
											})
										})
									}, 3000);
								}
							})
							this.storage.get('Session.Offline.userProfile').then(OfflineProfileData => {
								console.log(OfflineProfileData);
							})
							})
						this.storage.get('Session.Offline.inspections').then(Offlineinspections => {
							console.log(Offlineinspections)
						})
				})
			// })
			
		
		this.storage.ready().then(() => {
		this.storage.get('Session.access_token').then((val) => {
			//console.log(val + "ionViewWillEnter")
			if (val !== null){
				this.navCtrl.push(MainPage);
			}
		})
		});
        console.log('page loaded');
    }

}