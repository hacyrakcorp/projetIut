import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import {GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent,} from '@ionic-native/google-maps';

/**
 * Generated class for the RepereInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  repere;

  @ViewChild('map') 
  private mapElement: ElementRef;
  private map:GoogleMap;
  private location:LatLng;

  constructor(public viewCtrl: ViewController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private platform : Platform,
    private googleMaps: GoogleMaps) {
   /* let alert = this.alertCtrl.create({
      title: navParams.get('userId'),
      buttons: ['Dismiss']
    });
    alert.present();*/
    this.id = navParams.get('item').id;
    this.nom = navParams.get('item').nom;
    this.latitude = navParams.get('item').latitude;
    this.longitude = navParams.get('item').longitude;
    this.repere = {
      id: navParams.get('item').id,
      nom:navParams.get('item').nom,
      latitude:navParams.get('item').latitude,
      longitude:navParams.get('item').longitude
    };
    this.location = new LatLng(42.346903, -71.135101);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepereInfoPage');

    this.platform.ready().then(() => {
      let element = this.mapElement.nativeElement;
      this.map = this.googleMaps.create(element);
   
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        let options = {
          target: this.location,
          zoom: 8
        };
   
        this.map.moveCamera(options);
      });
    });
  }

  

  fermeture() {
	  this.viewCtrl.dismiss();
  }

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

  addMarker() {
    this.map.addMarker({
      title: 'My Marker',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.location.lat,
        lng: this.location.lng
      }
    })
    .then(marker => {
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        alert('Marker Clicked');
      });
    });
  }
}
