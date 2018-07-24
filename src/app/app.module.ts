import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { SignaturePage } from '../pages/signature/signature';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { HomePage } from '../pages/home/home';
import { FailDuePage } from '../pages/fail-due/fail-due';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { InformationPage } from '../pages/information/information';
import { InspectionRemarksPage } from '../pages/inspection-remarks/inspection-remarks';
import { LiftingPage } from '../pages/lifting/lifting';
import { MainPage } from '../pages/main/main';
import { ModalPage } from '../pages/modal/modal';

import { OwnCatPage } from '../pages/own-cat/own-cat';
import { OwnSubCatPage } from '../pages/own-sub-cat/own-sub-cat';
import { PassObservationPage } from '../pages/pass-observation/pass-observation';
import { PassSafePage } from '../pages/pass-safe/pass-safe';
import { PreviousPage } from '../pages/previous/previous';
import { ProfilePage } from '../pages/profile/profile';
import { RemarksPage } from '../pages/remarks/remarks';
import { SafetyPage } from '../pages/safety/safety';
import { SafetyCatInfoPage } from '../pages/safety-cat-info/safety-cat-info';
import { SetpasswordPage } from '../pages/setpassword/setpassword';
import { SignupPage } from '../pages/signup/signup';
import { VerificationPage } from '../pages/verification/verification';
import { WorkPage } from '../pages/work/work';
import { SignaturePadModule } from 'angular2-signaturepad';

// mocking services for testing
import { CameraMock } from "./camera.mock";
// mocking services end


@NgModule({
  declarations: [
    MyApp,
	HomePage,
    ChangepasswordPage,
    HomePage,
    MainPage,
    ModalPage,
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
    SetpasswordPage,
    SignupPage,
	SignaturePage,
    VerificationPage,
    WorkPage
	
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
	SignaturePadModule,
	IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChangepasswordPage,
	SignaturePage,
    HomePage,
    MainPage,
    ModalPage,
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
    SetpasswordPage,
    SignupPage,
    VerificationPage,
    WorkPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard
	//Camera,
	{ provide: Camera, useClass: CameraMock },
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
