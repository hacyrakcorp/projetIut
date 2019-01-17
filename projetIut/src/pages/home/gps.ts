import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class GPS {
  lat: any;
  lng: any;
  constructor(
    public geo: Geolocation) {

  }

 /* ionViewDidLoad(){
    /*this.geo.getCurrentPosition().then( pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    }).catch( err => console.log(err));
}*/

  getLatitude(){
    return new Promise ((resolve) =>
    {
      var latitude;
      this.geo.getCurrentPosition(

      ).then( (pos) => {
        latitude = pos.coords.latitude;
        resolve(latitude);
      }).catch( 
        (err) => {
          console.log(err);
          alert(err);
      }
      )
   }
   );
  }

  getLongitude(){
    return new Promise ((resolve) =>
    {
      var longitude;
      this.geo.getCurrentPosition(

      ).then( (pos) => {
        longitude = pos.coords.longitude;
        resolve(longitude);
      }).catch( 
        (err) => {
          console.log(err);
          alert(err);
      }
      )
   }
   );
  }

}
