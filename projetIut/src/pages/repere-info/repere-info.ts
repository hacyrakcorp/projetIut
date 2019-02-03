import { Component  } from '@angular/core';
import { IonicPage, NavParams, NavController, Platform } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Audio } from '../home/priseaudio';
import { AffichageMap } from './googleMap';
import { SQLitePage } from '../home/SQLitePage';
import { InsertCategoriePage } from './insertCategorie';
//Test param car console.log ne fonctionne pas
//import { AlertController } from 'ionic-angular';

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
  categories;
  categorie:string='';
  commentaire:string='';
  typeMapRoad:boolean=true;
  constructor(public viewCtrl: ViewController, 
    public navParams: NavParams,
    public navCtrl : NavController,
    public platform : Platform,
    private audioCtrl : Audio,
    private carteCtrl : AffichageMap,
    private sqliteCtrl : SQLitePage
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
      if (this.typeMapRoad){
        this.carteCtrl.loadMap(this.repere,'road');
      } else {
        this.carteCtrl.loadMap(this.repere,'satellite');
      }
    });
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
    this.carteCtrl.changementTypeMap(this.typeMapRoad);
  }

  
}
