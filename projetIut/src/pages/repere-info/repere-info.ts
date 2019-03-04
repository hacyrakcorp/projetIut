import { Component, Testability } from '@angular/core';
import { NavController, NavParams, Platform, SelectPopover, AlertController } from 'ionic-angular';
import { Audio } from '../home/priseaudio';
import { SQLitePage } from '../home/SQLitePage';
import { InsertCategoriePage } from './insertCategorie';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, 
  LatLng, CameraPosition, MarkerOptions, Marker,
  GoogleMapsMapTypeId } from '@ionic-native/google-maps';
import { StreetviewPage } from './streetview';
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
    private   googleMaps  : GoogleMaps,
    private iab: InAppBrowser
=======
    private   googleMaps  : GoogleMaps
>>>>>>> 988026d81e28e17692eb1cbd8cb7c89aa01c0753
=======
    private   googleMaps  : GoogleMaps,
    private iab: InAppBrowser
>>>>>>> loic
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
  timer;
  play(file){
    this.audioCtrl.playAudio(file,'').then((res:MediaObject) => {
      this.playing = true;
      var counter = 0;
      var dur = 0;
      var timerDur = setInterval(()=> {
        counter += 100;
        if (counter > 2000) {
           clearInterval(timerDur);
        }
        dur = res.getDuration();
        if (dur > 0) {
          let times = dur*1000;
          this.timer = setTimeout(()=> { 
            if(this.playing){
              this.playing = false;
            }
          },times);
          clearInterval(timerDur);
        }
    }, 100);
        
      });
  }

  stop(){
    this.audioCtrl.stopAudio();
    clearTimeout(this.timer);
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
  }

  private changementTypeMap(typeMapRoad){
    if(typeMapRoad){
      this.map.setMapTypeId(GoogleMapsMapTypeId.ROADMAP);
    } else {
      this.map.setMapTypeId(GoogleMapsMapTypeId.SATELLITE);
    }
  }
=======
  }

  private changementTypeMap(typeMapRoad){
    if(typeMapRoad){
      this.map.setMapTypeId(GoogleMapsMapTypeId.ROADMAP);
    } else {
      this.map.setMapTypeId(GoogleMapsMapTypeId.SATELLITE);
    }
  }
>>>>>>> 988026d81e28e17692eb1cbd8cb7c89aa01c0753
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
