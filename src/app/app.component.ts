import { HttpHeaders } from '@angular/common/http';
import { ChiefSfetyApiProvider } from './../providers/chief-sfety-api/chief-sfety-api';
import { SignupPage } from './../pages/signup/signup';

import { HomePage } from './../pages/home/home';

import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from "@ionic-native/keyboard";
import { Storage } from "@ionic/storage";
import { Network } from "@ionic-native/network";
import { InspectionRemarksPage } from '../pages/inspection-remarks/inspection-remarks';
@Component({
templateUrl: 'app.html',
providers : [ChiefSfetyApiProvider]
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(private ChiefSfetyApiProvider:ChiefSfetyApiProvider ,private network : Network,public keyboard : Keyboard,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private storage: Storage) {
    platform.ready().then(() => {
      
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

      statusBar.styleDefault();
      splashScreen.hide();
      
    });
    keyboard.disableScroll(true);
    // firebase.initializeApp(firebaseSettings);
  }

}

