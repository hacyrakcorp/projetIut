import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
//import { AffichageMap } from '../repere-info/googleMap';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, 
  LatLng, CameraPosition, MarkerOptions, Marker,
  GoogleMapsMapTypeId } from '@ionic-native/google-maps';

import { SQLitePage } from '../home/SQLitePage';
import { NavController } from 'ionic-angular';
import { RepereInfoPage } from '../repere-info/repere-info';


@Component({
 	selector: 'page-carte',
 	templateUrl: 'carte.html'
})

export class CartePage {
	lat: any;
  lng: any;
  map: GoogleMap;
	constructor(
		//private 	carteCtrl : AffichageMap,
		public 		platform 	: Platform,
		public    navCtrl     : NavController,
		private   googleMaps  : GoogleMaps,
    private   sqlCtrl     : SQLitePage
		){		
	}

	ionViewDidLoad() {
    this.platform.ready(

		).then(() => {
				 //this.carteCtrl.loadMapMultiple();
				 this.loadMapMultiple();
  	});
  
	}
	

	loadMapMultiple(){
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('mapMultiple');
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
	}
	
	addMarker(listeReperes:any){
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
                this.navCtrl.push(RepereInfoPage,{ repere });
              });
        });
    }
  }

}