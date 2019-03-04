import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class GPS {
  lat: any;
  lng: any;

  constructor(
    public platform: Platform,
    private geo: Geolocation
    ) {
      
  }

  /*ionViewDidLoad(){
    this.geo.getCurrentPosition().then( pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    }).catch( err => console.log(err));
  }*/

  getLatitudeLongitude(){
     return new Promise ((resolve, reject) =>
    {
        var latitude;
        var longitude;
        //this.platform.ready().then(() => {
            this.geo.getCurrentPosition(
              {timeout: 10000,enableHighAccuracy: true, maximumAge:0}
            ).then((resp) => {
              latitude = resp.coords.latitude;
              longitude = resp.coords.longitude;
              resolve({latitude,longitude});
           }).catch((e)=> {reject(e.message)});
       // });
    });
  }

  getLatitude(){
    return new Promise ((resolve) =>
    {
        var latitude;
        //this.platform.ready().then(() => {
            this.geo.getCurrentPosition(
              {timeout: 30000,enableHighAccuracy: true}
            ).then((resp) => {
              latitude = resp.coords.latitude;
              resolve(latitude);
           }).catch((e)=> {alert(e.message)});
       // });
    });
  }

  getLongitude(){
    return new Promise ((resolve) =>
    {
        var longitude;
       // this.platform.ready().then(() => {
            this.geo.getCurrentPosition(
              {timeout: 30000,enableHighAccuracy: true}
            ).then((resp) => {
              longitude = resp.coords.longitude;
              resolve(longitude);
           }).catch((e)=> {alert(e.message)});
      // });
    });
  }


}