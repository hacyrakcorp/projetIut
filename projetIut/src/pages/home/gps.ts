import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class GPS {
  lat: any;
  lng: any;
  constructor(
    public geo: Geolocation,
    private googleMaps: GoogleMaps, 
    public platform: Platform) {
      platform.ready().then(() => {
          alert('carte');
        this.loadMap();
      });
  }

  loadMap() {
    alert('loadmap');
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
    alert(element);
    let map: GoogleMap = this.googleMaps.create(element);
    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
   // alert(GoogleMapsEvent.MAP_READY);
    map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        alert('map');
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker
      }
    );

    // create LatLng object
    let ionic: LatLng = new LatLng(43.0741904,-89.3809802);

    // create CameraPosition
    let position: CameraPosition<LatLng> = {
      target: ionic,
      zoom: 18,
      tilt: 30
    };

    // move the map's camera to position
    map.moveCamera(position);

    // create new marker
    let markerOptions: MarkerOptions = {
      position: ionic,
      title: 'Ionic'
    };

    map.addMarker(markerOptions)
    .then((marker: Marker) => {
        marker.showInfoWindow();
    });
  }

 /* ionViewDidLoad(){
    /*this.geo.getCurrentPosition().then( pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    }).catch( err => console.log(err));s
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