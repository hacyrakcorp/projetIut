import { Component } from '@angular/core';

import { GoogleMaps, GoogleMap, GoogleMapsEvent, 
  LatLng, CameraPosition, MarkerOptions, Marker, GoogleMapOptions,
  GoogleMapsMapTypeId } from '@ionic-native/google-maps';

var google;
@Component({
  selector: 'page-repere-info',
  templateUrl: 'repere-info.html'
})
export class AffichageMap {
  lat: any;
  lng: any;
  map:GoogleMap;
  constructor(
    private googleMaps: GoogleMaps
    ) {
  }

  loadMap(repere,type) {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
   // let map: GoogleMap;
    let mapOptions : GoogleMapOptions;
    if (type=='satellite'){
        mapOptions = {
          zoomControl: true,
          clickableIcons: true,
          disableDefaultUI: true,
          mapType: GoogleMapsMapTypeId.SATELLITE
        };
        
    }else if (type=='road'){
      mapOptions = {
        zoomControl: true,
        clickableIcons: true,
        disableDefaultUI: true,
        mapType: GoogleMapsMapTypeId.ROADMAP
      };
      this.map = this.googleMaps.create(element, mapOptions);
    }
    
    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    this.map.one(
      GoogleMapsEvent.MAP_READY
    ).then(() => {
        // create LatLng object
        let ionic: LatLng = new LatLng(repere.latitude,repere.longitude);

        // create CameraPosition
        let position: CameraPosition<LatLng> = {
          target: ionic,
          zoom: 18,
          tilt: 30
        };

        // move the map's camera to position
        this.map.moveCamera(position);

        // create new marker
        let markerOptions: MarkerOptions = {
          position: ionic,
          title: repere.nom,
          draggable:true
        };

        this.map.addMarker(markerOptions)
        .then((marker: Marker) => {
            marker.showInfoWindow();
        });
    });

  }

  changementTypeMap(typeMapRoad){
    if(typeMapRoad){
      this.map.setMapTypeId(GoogleMapsMapTypeId.ROADMAP);
    } else {
      this.map.setMapTypeId(GoogleMapsMapTypeId.SATELLITE);
    }
    
  }

}