
import { HomePage } from './../pages/home/home';

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from "@ionic-native/keyboard";
import { Storage } from "@ionic/storage";
@Component({
templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(public keyboard : Keyboard,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private storage: Storage) {
    platform.ready().then(() => {
      
    
      statusBar.styleDefault();
      splashScreen.hide();
      
    });
    keyboard.disableScroll(true);
    // firebase.initializeApp(firebaseSettings);
  }

}

