import { Component } from '@angular/core';

import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';


@Component({
  selector: 'page-repere-info',
  templateUrl: 'repere-info.html'
})
export class AffichageMap {
  lat: any;
  lng: any;
  constructor(
    private googleMaps: GoogleMaps
    ) {
  }

  loadMap(repere='') {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
    //alert(element);
    let map: GoogleMap = this.googleMaps.create(element);
    //alert(map);
    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        //alert('map');
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker
      }
    );

    /*

    // create LatLng object
    let ionic: LatLng = new LatLng(repere.latitude,repere.longitude);

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
      title: repere.nom
    };

    map.addMarker(markerOptions)
    .then((marker: Marker) => {
        marker.showInfoWindow();
    });*/
  }

}