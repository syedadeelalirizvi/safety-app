import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { ProfilePage } from '../profile/profile';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController, ModalController } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  base64Image: string;
  base64ImageProfile: string;
  imageUpload: any;
  imageUploadProfile: any;
  constructor(private alertCtrl: AlertController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private httpClient: HttpClient,
    private fb: FormBuilder, 
    private storage: Storage,
    private camera: Camera,
    private modalCtrl: ModalController ) {
      this.base64ImageProfile = '';
      this.base64Image = '';
      this.imageUpload = false;		  
      this.imageUploadProfile = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }
  openCameraProfile(){
    console.log('openCamera');
    // Camera options		
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.base64ImageProfile = 'data:image/jpeg;base64,' + imageData;
        this.imageUploadProfile = true;
        this.navCtrl.push(ProfilePage, {
          base64ImageProfile: this.base64ImageProfile,
          imageUploadProfile:this.imageUploadProfile
    });
      }, (err) => {
        // Handle error
        console.log(err);
      });
  }
  
  openGalleryProfile(){
    console.log('openGallery');
    // Camera options		
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    
    this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.base64ImageProfile = 'data:image/jpeg;base64,' + imageData;
        this.imageUploadProfile = true;

        this.navCtrl.push(ProfilePage, {
          base64ImageProfile: this.base64ImageProfile,
          imageUploadProfile:this.imageUploadProfile
    });
      }, (err) => {
        // Handle error
        console.log(err);
      });
  }  

}
