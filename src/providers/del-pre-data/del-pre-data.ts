import { PreviousDataComponent } from './../../components/previous-data/previous-data';
import { AlertController, NavController } from 'ionic-angular';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant as ENV } from '../../configs/constant';
import { Storage } from "@ionic/storage";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
@Injectable()
export class DelPreDataProvider {

 
  constructor(public http: Http,public storage : Storage,public alertCtrl : AlertController,public httpClient : HttpClient,public navCtrl : NavController) {
  


    
  }
 loadInspectionData(userid,headers){
  return this.httpClient.get(`${ENV.BASE_URL}user-inspections/user/${userid}/inspection`,{headers:headers});
 }





  deleteInspection( value , headers){
    return this.httpClient.delete(`${ENV.BASE_URL}user-inspections/inspection/'${value.inspection_id}`,{headers:headers});
      }
 
 

}
