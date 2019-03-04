import { Component } from '@angular/core';
import { Platform, NavParams } from 'ionic-angular';
import { GoogleMaps, StreetViewPanorama, LatLng } from '@ionic-native/google-maps';


@Component({
    selector: 'page-streetview',
    templateUrl: 'streetview.html',
  })

export class StreetviewPage {
    latlng : LatLng;
    constructor(
        public    platform : Platform,
        private   navParams : NavParams
    ){
        this.latlng = this.navParams.get('latlng');
    }
    ionViewDidLoad() {
        this.platform.ready().then(() => {
          this.loadMap();
        });
      }
    loadMap(){
        //var latlng = {lat: 42.345573, lng: -71.098326}; 
        let elementStreet : HTMLElement = document.getElementById('pano');
        let panorama: StreetViewPanorama = GoogleMaps.createPanorama(
            elementStreet, 
            {
                camera: {
                  target: this.latlng
                }
            }
        );
        
    }
  
}