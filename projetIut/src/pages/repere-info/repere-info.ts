import { Component, ViewChild   } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Audio } from '../home/priseaudio';
import { GPS } from '../home/gps';
import { AffichageMap } from './googleMap';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';

//Test param car console.log ne fonctionne pas
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-repere-info',
  templateUrl: 'repere-info.html',
})
export class RepereInfoPage {
  id: string;
  nom: string;
  latitude: string;
  longitude: string;
  audio:string;
  audioName: string;
  repere;

  constructor(public viewCtrl: ViewController, 
    public navParams: NavParams,
    public platform : Platform,
    private alertCtrl: AlertController,
    private audioCtrl : Audio,
    private carteCtrl : AffichageMap
    ) {

      this.id = navParams.get('item').id;
      this.nom = navParams.get('item').name;
      this.latitude = navParams.get('item').latitude;
      this.longitude = navParams.get('item').longitude;
      this.audio = navParams.get('item').audio;
      let derniereSeparation = this.audio.lastIndexOf('/');
      this.audioName = this.audio.substring(derniereSeparation+1,this.audio.length).toLowerCase();
      this.repere = {
        id: this.id,
        nom: this.nom ,
        latitude: this.latitude,
        longitude: this.longitude,
        audio: this.audio
      };

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.carteCtrl.loadMap(this.repere);
  });
    console.log('ionViewDidLoad RepereInfoPage');
  }

  
/*
  fermeture() {
	  this.viewCtrl.dismiss();
  }*/

  enregistrer() {
    let modifierRepere = {
      id: this.id,
      nom: this.nom,
      latitude: this.latitude,
      longitude: this.longitude
    };
   
    if (JSON.stringify(modifierRepere) !== JSON.stringify(this.repere)){
      this.viewCtrl.dismiss(modifierRepere);
    } else {
      this.viewCtrl.dismiss();
    }
    
  }

  play(file){
    alert(file);
    this.audioCtrl.playAudio(file,'');
  }
}
