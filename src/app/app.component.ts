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
templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(private network : Network,public keyboard : Keyboard,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private storage: Storage) {
    platform.ready().then(() => {
      
      this.network.onConnect().subscribe(() => {
        this.storage.get('Session.Offline.inspections').then(OfflineInspections => {
          console.log(OfflineInspections);
        })
      })

      statusBar.styleDefault();
      splashScreen.hide();
      
    });
    keyboard.disableScroll(true);
    // firebase.initializeApp(firebaseSettings);
  }

}

