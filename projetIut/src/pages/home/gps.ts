import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Gps {
  lat: any;
  lng: any;
  constructor(
    //public navCtrl: NavController, 
    public geo: Geolocation) {

  }

  getlatitude (){
    this.geo.getCurrentPosition().then((resp) => {
    resp.coords.latitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
      }
}
