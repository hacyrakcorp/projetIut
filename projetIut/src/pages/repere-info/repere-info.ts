import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Audio } from '../home/priseaudio';
import { SQLitePage } from '../home/SQLitePage';
import { InsertCategoriePage } from './insertCategorie';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, 
  LatLng, CameraPosition, MarkerOptions, Marker,
  GoogleMapsMapTypeId } from '@ionic-native/google-maps';
import { StreetviewPage } from './streetview';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> loic
import { twitterPage } from './Twitter';
import { MediaObject } from '@ionic-native/media';
//Test param car console.log ne fonctionne pas
//import { AlertController } from 'ionic-angular';
import {InAppBrowser} from '@ionic-native/in-app-browser';
<<<<<<< HEAD
=======
import { MediaObject } from '@ionic-native/media';
//Test param car console.log ne fonctionne pas
//import { AlertController } from 'ionic-angular';
>>>>>>> 988026d81e28e17692eb1cbd8cb7c89aa01c0753
=======
>>>>>>> loic
=======
import { MediaObject } from '@ionic-native/media';
//Test param car console.log ne fonctionne pas
//import { AlertController } from 'ionic-angular';
>>>>>>> 988026d81e28e17692eb1cbd8cb7c89aa01c0753
=======
//Test param car console.log ne fonctionne pas
//import { AlertController } from 'ionic-angular';
>>>>>>> parent of e68e53f... ok
=======
//Test param car console.log ne fonctionne pas
//import { AlertController } from 'ionic-angular';
>>>>>>> parent of 9015399... pas de soucis

@Component({
  selector: 'page-repere-info',
  templateUrl: 'repere-info.html',
})
export class RepereInfoPage {
  playing:    boolean = false;
  typeMapRoad:boolean = true;
  id:         string;
  nom:        string = '';
  latitude:   string = '';
  longitude:  string = '';
  audio:      string = '';
  audioName:  string = '';
  categorie:  string = '';
  commentaire:string = '';
  date:       string = '';
  image :     Blob;
  categories;
  map: GoogleMap;
  marker:Marker;

  
  constructor(
    public    navParams : NavParams,
    public    navCtrl : NavController,
    public    platform : Platform,
    private   audioCtrl : Audio,
    private   sqliteCtrl : SQLitePage,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    private   googleMaps  : GoogleMaps,
    private iab: InAppBrowser
=======
    private   googleMaps  : GoogleMaps
>>>>>>> 988026d81e28e17692eb1cbd8cb7c89aa01c0753
=======
    private   googleMaps  : GoogleMaps,
    private iab: InAppBrowser
>>>>>>> loic
=======
    private   googleMaps  : GoogleMaps
>>>>>>> 988026d81e28e17692eb1cbd8cb7c89aa01c0753
=======
    private   googleMaps  : GoogleMaps
>>>>>>> parent of e68e53f... ok
=======
    private   googleMaps  : GoogleMaps
>>>>>>> parent of 9015399... pas de soucis
    ) {
      let rep = navParams.get('repere');
      this.id = rep.id;
      this.nom = rep.name;
      this.latitude = rep.latitude;
      this.longitude = rep.longitude;
      this.audio = rep.audio;
      this.image = rep.image;
      this.categorie = rep.categorie;
      this.commentaire = rep.commentaire;
      this.date = new Date(rep.date).toISOString();
      let derniereSeparation = this.audio.lastIndexOf('/');
      this.audioName = this.audio.substring(derniereSeparation+1,this.audio.length).toLowerCase();
  }
  
  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.sqliteCtrl.getAll('CATEGORIES').then((results) => {
        this.categories = JSON.parse(JSON.stringify(results));
      });
    });
  }

  ionViewDidEnter(){
    this.platform.ready().then(() => {
      this.sqliteCtrl.getAll('CATEGORIES').then((results) => {
        this.categories = JSON.parse(JSON.stringify(results));
      });
    });
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  ionViewWillLeave() {
    this.audioCtrl.stopAudio();
    this.playing = false;
  }

  play(file){
    this.audioCtrl.playAudio(file,'');
    this.playing = true;
  }

  stop(){
    this.audioCtrl.stopAudio();
    this.playing = false;
  }

  enregistrer() {
    let upRepere = [
      this.nom,
      this.latitude,
      this.longitude,
      this.categorie,
      this.commentaire,
      this.id
    ];
   this.sqliteCtrl.updateRepere(upRepere);
   this.navCtrl.pop();
    
  }
  insertCategorie(){
    this.navCtrl.push(InsertCategoriePage);
  }

  modifierCategorie(value){
    this.categorie = value;
  }

  supprimer(){
    this.sqliteCtrl.deleteRepere(this.id);
    this.navCtrl.pop();
  }

  changementMap(){
    if (this.typeMapRoad){
      this.typeMapRoad = false;
    } else {
      this.typeMapRoad = true;
    }
    //this.carteCtrl.changementTypeMap(this.typeMapRoad);
    this.changementTypeMap(this.typeMapRoad);
  }

  private loadMap() {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
    this.map = this.googleMaps.create(element);
    
    // listen to MAP_READY event
    this.map.one(
      GoogleMapsEvent.MAP_READY
    ).then(() => {
      // create LatLng object
      let latlng: LatLng = new LatLng(parseFloat(this.latitude),parseFloat(this.longitude));
      // create CameraPosition
      let position: CameraPosition<LatLng> = {
        target: latlng,
        zoom: 17,
        tilt: 30
      };
      // move the map's camera to position
      this.map.moveCamera(position);
      this.ajouterMarker(latlng);

    });
  }

  private toggleStreetView() {
    this.navCtrl.push(StreetviewPage,
      {latlng : {lat : this.latitude, lng : this.longitude}});
  }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> loic
  private loadTwitter(){
    var monframe = "http://mobile.twitter.com/search?f=tweets&q=geocode:"+this.latitude+","+this.longitude+",30km" ;
        const browser = this.iab.create(monframe,'_blank','location=no');
  }

<<<<<<< HEAD
=======
>>>>>>> 988026d81e28e17692eb1cbd8cb7c89aa01c0753
=======
>>>>>>> loic
=======
>>>>>>> 988026d81e28e17692eb1cbd8cb7c89aa01c0753
=======
>>>>>>> parent of e68e53f... ok
=======
>>>>>>> parent of 9015399... pas de soucis
  private ajouterMarker(latlng:LatLng){
      // create new marker
      let markerOptions: MarkerOptions = {
        icon:'blue',
        position: latlng,
        title: this.nom,
        draggable:true
      };
      //Marker repositionnable
      this.marker = this.map.addMarkerSync(markerOptions);
      this.marker.showInfoWindow();
      this.marker.on(GoogleMapsEvent.MARKER_DRAG_END)
        .subscribe(() => {    
          this.latitude = this.marker.getPosition().lat.toString();
          this.longitude = this.marker.getPosition().lng.toString();
          document.getElementById('lat').innerHTML = this.latitude;
          document.getElementById('lng').innerHTML = this.longitude;
        });
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 988026d81e28e17692eb1cbd8cb7c89aa01c0753
  }

  private changementTypeMap(typeMapRoad){
    if(typeMapRoad){
      this.map.setMapTypeId(GoogleMapsMapTypeId.ROADMAP);
    } else {
      this.map.setMapTypeId(GoogleMapsMapTypeId.SATELLITE);
    }
  }
<<<<<<< HEAD
=======
=======
>>>>>>> parent of e68e53f... ok
=======
>>>>>>> parent of 9015399... pas de soucis
  }

  private changementTypeMap(typeMapRoad){
    if(typeMapRoad){
      this.map.setMapTypeId(GoogleMapsMapTypeId.ROADMAP);
    } else {
      this.map.setMapTypeId(GoogleMapsMapTypeId.SATELLITE);
    }
  }
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 988026d81e28e17692eb1cbd8cb7c89aa01c0753
=======
>>>>>>> 988026d81e28e17692eb1cbd8cb7c89aa01c0753
=======
>>>>>>> parent of e68e53f... ok
=======
>>>>>>> parent of 9015399... pas de soucis
  updateLatitude(){
    let latlng: LatLng = new LatLng(parseFloat(this.latitude),parseFloat(this.longitude));
    this.marker.setPosition(latlng);
    let position: CameraPosition<LatLng> = {
      target: latlng,
      zoom: 17,
      tilt: 30
    };
    this.map.moveCamera(position);
  }
  updateLongitude(){
    let latlng: LatLng = new LatLng(parseFloat(this.latitude),parseFloat(this.longitude));
    this.marker.setPosition(latlng);
    let position: CameraPosition<LatLng> = {
      target: latlng,
      zoom: 17,
      tilt: 30
    };
    this.map.moveCamera(position);
  }
  
}
