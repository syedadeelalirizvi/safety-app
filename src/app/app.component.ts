
import { SignupPage } from './../pages/signup/signup';

import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from "@ionic-native/keyboard";
import { Storage } from "@ionic/storage";
import { HomePage } from '../pages/home/home';
import firebase from "firebase";
import { firebaseSettings } from "../configs/constant";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(private keyboard : Keyboard,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private storage: Storage) {
    platform.ready().then(() => {
      
      statusBar.styleDefault();
      splashScreen.show();
      keyboard.disableScroll(true);
    });
    firebase.initializeApp(firebaseSettings);
  }

}

