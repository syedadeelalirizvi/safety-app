import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FailDuePage } from '../pages/fail-due/fail-due';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { InformationPage } from '../pages/information/information';
import { InspectionRemarksPage } from '../pages/inspection-remarks/inspection-remarks';
import { LiftingPage } from '../pages/lifting/lifting';
import { MainPage } from '../pages/main/main';
import { OwnCatPage } from '../pages/own-cat/own-cat';
import { OwnSubCatPage } from '../pages/own-sub-cat/own-sub-cat';
import { PassObservationPage } from '../pages/pass-observation/pass-observation';
import { PassSafePage } from '../pages/pass-safe/pass-safe';
import { PreviousPage } from '../pages/previous/previous';
import { ProfilePage } from '../pages/profile/profile';
import { RemarksPage } from '../pages/remarks/remarks';
import { SafetyPage } from '../pages/safety/safety';
import { SafetyCatInfoPage } from '../pages/safety-cat-info/safety-cat-info';
import { SignupPage } from '../pages/signup/signup';
import { WorkPage } from '../pages/work/work';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    FailDuePage,
    ForgotPasswordPage,
    InformationPage,
    InspectionRemarksPage,
    LiftingPage,
    OwnCatPage,
    OwnSubCatPage,
    PassObservationPage,
    PassSafePage,
    PreviousPage,
    ProfilePage,
    RemarksPage,
    SafetyPage,
    SafetyCatInfoPage,
    SignupPage,
    WorkPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    FailDuePage,
    ForgotPasswordPage,
    InformationPage,
    InspectionRemarksPage,
    LiftingPage,
    OwnCatPage,
    OwnSubCatPage,
    PassObservationPage,
    PassSafePage,
    PreviousPage,
    ProfilePage,
    RemarksPage,
    SafetyPage,
    SafetyCatInfoPage,
    SignupPage,
    WorkPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
