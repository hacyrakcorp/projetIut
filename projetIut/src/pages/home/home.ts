import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { Insomnia } from '@ionic-native/insomnia';
//import { CreateTable } from './CreateTable';
import { ParametrePage } from '../parametre/parametre';
import { SQLitePage } from './SQLitePage';

import { Photo } from './takephoto';
import { Audio } from './priseaudio';
import { PrisePhoto } from './prisePhoto';
import { GPS } from './gps';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isenabled:boolean=true;
  repereName:string;

  constructor(
    public navCtrl: NavController,
    public platform : Platform,
    private toastCtrl: ToastController,
    private global : GlobalServiceProvider,
    private photoCtrl : Photo,
    private prisePhotoCtrl : PrisePhoto,
    private audioCtrl : Audio,
    //private bddCtrl : CreateTable,
    private sqliteCtrl : SQLitePage,
    private GPSCtrl : GPS,
    private paramCtrl : ParametrePage,
    private insomnia: Insomnia
    ) { 

      this.insomnia.keepAwake()
      .then(
        () => console.log('insomnia'),
        () => console.log('error')
      );
      
    }

  

  click($position: string) : void{
    var dateHeure = this.getDateHeure();

    this.platform.ready().then(() => {
      this.repereName ='repere '+ dateHeure;
      var latitude : any;
      var longitude : any;
      const TABLE_REPERES : string = 'REPERES';
      this.isenabled=false;

      //Récupération coordonnées GPS
      this.GPSCtrl.getLatitude(  
      ).then((results) => {
        latitude = JSON.stringify(results);
        this.GPSCtrl.getLongitude(
        ).then((results) => {
          longitude = JSON.stringify(results);

          //Enregistrement Audio
          if (this.paramCtrl.getOpt_audio() == true){
            alert('audio true'); 
            let filePath = this.audioCtrl.startRecord();
            let TIME_IN_MS = 5000;
            setTimeout( () => {  //Attendre 5 secondes et stop record
                this.audioCtrl.stopRecord();
                const toast = this.toastCtrl.create({
                    message: "fin record",
                    duration: 3000,
                    position : $position
                });
                toast.present().then(()=>{
                  //Enregistrement dans la base de données
                  let array = [this.repereName,latitude,longitude,filePath];
                  this.sqliteCtrl.insert(TABLE_REPERES,array);
                  this.isenabled = true;
                });    
            }, TIME_IN_MS);
          } else { // Pas d'enregistrement audio 
            //alert('audio false');   
            //Enregistrement photo
            this.photoCtrl.photoshoot().then((base64) => {
              alert('photo true');
              //let blob = this.photoCtrl.b64toBlob(base64,'',512);
              //alert(blob);
              alert(base64);
              let array = [this.repereName,latitude,longitude,'','',base64];
              this.sqliteCtrl.insert(TABLE_REPERES,array); 
              this.isenabled = true; 
            });
          }  
        })
      })
    });
    

    // this.photoCtrl.photoshoot();

    
  }

  getDateHeure():string{
    var annee:string = new Date().getFullYear().toString();
    var mois: string = (new Date().getMonth()+1).toString();
    if (mois.length == 1) { mois = "0"+mois;}
    var jour:string = new Date().getDate().toString();
    var heure: string = new Date().getHours().toString();
    if (heure.length == 1) { heure = "0"+heure;}
    var min: string = new Date().getMinutes().toString();
    if (min.length == 1) { min = "0"+min;}
    var sec: string = new Date().getSeconds().toString();
    if (sec.length == 1) { sec = "0"+sec;}
    var dateHeure = annee+mois+jour+"_"+heure+min+sec;
    return dateHeure;
  }

  //Test bdd
  /*select():void {  
    
    this.sqliteCtrl.getAll('REPERES').then((results) => {
      var data = JSON.stringify(results);
      var reperes = JSON.parse(data);
      alert(data);
      for (let repere of reperes){
        alert(repere.audio);
      } 
    })
  }*/

  

  //Test audio
 /* play(file,idx){
    this.audioCtrl.playAudio(file,idx);
  }*/
}
