import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Audio } from '../home/priseaudio';
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
  audioName: string;
  repere;

  constructor(public viewCtrl: ViewController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private audioCtrl : Audio) {
   /* let alert = this.alertCtrl.create({
      title: navParams.get('userId'),
      buttons: ['Dismiss']
    });
    alert.present();*/

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
    console.log('ionViewDidLoad RepereInfoPage');
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

  play(file){
    alert(file);
    this.audioCtrl.playAudio(file,'');
  }
}
