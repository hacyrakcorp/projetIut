import { Component } from '@angular/core';

import { GoogleMaps, GoogleMap, GoogleMapsEvent, 
  LatLng, CameraPosition, MarkerOptions, Marker,
  GoogleMapsMapTypeId } from '@ionic-native/google-maps';

import { SQLitePage } from '../home/SQLitePage';

@Component({
  selector: 'page-repere-info',
  templateUrl: 'repere-info.html'
})
export class AffichageMap {
  lat: any;
  lng: any;
  map: GoogleMap;
  constructor(
    private   googleMaps  : GoogleMaps,
    private   sqlCtrl     : SQLitePage
    ) {
  }

  loadMap(repere) {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
    this.map = this.googleMaps.create(element);
    alert('load');
    // listen to MAP_READY event
    this.map.one(
      GoogleMapsEvent.MAP_READY
    ).then(() => {
        
      // create LatLng object
      let latlng: LatLng = new LatLng(repere.latitude,repere.longitude);

      // create CameraPosition
      let position: CameraPosition<LatLng> = {
        target: latlng,
        zoom: 18,
        tilt: 30
      };
      // move the map's camera to position
      this.map.moveCamera(position);
      
      // create new marker
      let markerOptions: MarkerOptions = {
        position: latlng,
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

  /*addMarker(listeReperes:any){
    for (let repere of listeReperes){
      // create LatLng object
      let latlng: LatLng = new LatLng(repere.latitude,repere.longitude);

      // create CameraPosition
      let position: CameraPosition<LatLng> = {
        target: latlng,
        zoom: 5,
        tilt: 30
      };
      // move the map's camera to position
      this.map.moveCamera(position);
      
      // create new marker
      let markerOptions: MarkerOptions = {
        position: latlng,
        title: repere.name,
        draggable:true,
        id:repere
      };
      this.map.addMarker(markerOptions)
        .then((marker: Marker) => {
            marker.showInfoWindow();
            marker.addEventListener(
              GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => { 
                //this.navCtrl.push(RepereInfoPage,{ repere });
              });
        });
    }
  }

  loadMapMultiple(){
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
    this.map = this.googleMaps.create(element);

    // listen to MAP_READY event
    this.map.one(
      GoogleMapsEvent.MAP_READY
    ).then(() => { 
        this.sqlCtrl.getAll('REPERES')
            .then((result)=>{
              this.addMarker(JSON.parse(JSON.stringify(result)));
            });
    });
  }*/

}