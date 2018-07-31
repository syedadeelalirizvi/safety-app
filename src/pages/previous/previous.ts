import { PreviousDataComponent } from './../../components/previous-data/previous-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { constant as ENV } from '../../configs/constant';
import { AlertController } from 'ionic-angular';


import { LiftingPage } from '../lifting/lifting';

@Component({
  selector: 'page-previous',
  templateUrl: 'previous.html',
})
export class PreviousPage {
   
    constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,private fb: FormBuilder, private storage: Storage ) {
      
    }
    goBack(){
     this.navCtrl.pop();
    }

    
     
 

   


}