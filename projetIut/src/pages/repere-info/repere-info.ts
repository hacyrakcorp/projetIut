import { Component  } from '@angular/core';
import { IonicPage, NavParams, Platform } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Audio } from '../home/priseaudio';
import { AffichageMap } from './googleMap';
import { blobToBase64String  } from 'blob-util';

//Test param car console.log ne fonctionne pas
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-repere-info',
  templateUrl: 'repere-info.html',
})
export class RepereInfoPage {
  id: string;
  nom: string = '';
  latitude: string = '';
  longitude: string = '';
  audio:string = '';
  audioName: string = '';
  image : Blob;
  repere;
  base64data;
  playing: boolean = false;

  constructor(public viewCtrl: ViewController, 
    public navParams: NavParams,
    public platform : Platform,
    private alertCtrl: AlertController,
    private audioCtrl : Audio,
    private carteCtrl : AffichageMap
    ) {
        let rep = navParams.get('repere');

      this.id = rep.id;
      this.nom = rep.name;
      this.latitude = rep.latitude;
      this.longitude = rep.longitude;
      this.audio = rep.audio;
      this.image = rep.image;
      
      let derniereSeparation = this.audio.lastIndexOf('/');
      this.audioName = this.audio.substring(derniereSeparation+1,this.audio.length).toLowerCase();
      this.repere = {
        id: this.id,
        nom: this.nom ,
        latitude: this.latitude,
        longitude: this.longitude,
        audio: this.audio,
        image: this.image
      };
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.carteCtrl.loadMap(this.repere);
  });
    console.log('ionViewDidLoad RepereInfoPage');
  }

  ionViewWillLeave() {
    this.audioCtrl.stopAudio();
    this.playing = false;
  }

  play(file){
    //alert(file);
    this.audioCtrl.playAudio(file,'');
    this.playing = true;
  }

  stop(){
    this.audioCtrl.stopAudio();
    this.playing = false;
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

  
}
