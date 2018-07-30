import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {

   
    constructor(public navCtrl: NavController ){
     
    }
    
  
    goBack(){
		    this.navCtrl.pop();
    }
  

}
