import { MainPage } from './../main/main';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Keyboard } from "@ionic-native/keyboard";
import { Network } from "@ionic-native/network";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



	//res.data:any;
	
	constructor(private network : Network,private keyboard : Keyboard , public storage : Storage , public navCtrl : NavController) {
		keyboard.disableScroll(true);
	}

	ionViewCanEnter() {
		this.network.onConnect().subscribe(() => {
			this.storage.get('Session.Offline.inspections').then(OfflineInspections => {
				console.log(OfflineInspections);
			  
		  
				for(let i = 0; i < OfflineInspections.length; i ++){
				  const headers = new HttpHeaders()
				  .set("user_id", this.userid.toString())
				  .set("access_token", this.token);
				  this.ChiefSfetyApiProvider.userSubmitInspection(OfflineInspections[i].userid,OfflineInspections[i].categoryId,OfflineInspections[i].equipment_image,OfflineInspections[i].inspection_desc, JSON.parse(OfflineInspections[i].subCategoriesIds),JSON.parse(OfflineInspections[i].questionFromDb),headers).subscribe((data:any) => {
					
				  })
				}
			})
			this.storage.get('Session.Offline.userProfile').then(OfflineProfileData => {
			  console.log(OfflineProfileData);
			})
		  })
		this.storage.get('Session.Offline.inspections').then(Offlineinspections => {
			console.log(Offlineinspections)
		})
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