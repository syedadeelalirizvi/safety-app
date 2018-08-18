import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stripe } from "@ionic-native/stripe";
import { constant } from "../../configs/constant";
@Injectable()
export class StripeProcessProvider {

  constructor(private stripe : Stripe ,public http: HttpClient) {
    // Setup stripe secure_token
    this.stripe.setPublishableKey(constant.STRIPE_SECURE_KEY);
  }

  createCardToken(card){
    this.stripe.createCardToken(card).then(token_res => {
      console.log(token_res);
    }).catch(err => {
      console.log(err);
    })
  }
}

