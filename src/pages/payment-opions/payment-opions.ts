import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
// implementing external modules
import { CreditCardValidator } from "angular-cc-library";

@Component({
  selector: 'page-payment-opions',
  templateUrl: 'payment-opions.html',
})
export class PaymentOpionsPage {
	creditCard : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder : FormBuilder) {
    // using external modules
    this.creditCard = this.formBuilder.group({
      creditCardNumber: ['', [<any>CreditCardValidator.validateCCNumber]],
      expDate: ['', [<any>CreditCardValidator.validateExpDate]],
      cvcNumber: ['', [<any>Validators.required, <any>Validators.minLength(3), <any>Validators.maxLength(4)]] 
    })
  }

  submitcc(value){
    console.log(value);
    if(this.creditCard.valid == true){
      console.log('yaha');
    }else{
      console.log('oh');
    }
  }
  goBack(){
    this.navCtrl.push(SignupPage).then(() => {
      const index = this.navCtrl.getActive().index;
      this.navCtrl.remove(0,index);
    })
  }



}
