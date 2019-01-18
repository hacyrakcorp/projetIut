import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

//import { CreateTable } from './CreateTable';
import { ParametrePage } from '../parametre/parametre';
import { SQLitePage } from './SQLitePage';

import { Photo } from './takephoto';
import { Audio } from './priseaudio';
import { GPS } from './GPS';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private global : GlobalServiceProvider,
    private photoCtrl : Photo,
    private audioCtrl : Audio,
    //private bddCtrl : CreateTable,
    private sqliteCtrl : SQLitePage,
    private GPSCtrl : GPS,
    private paramCtrl : ParametrePage
    ) { 
      
  }
  isenabled:boolean=true;
  click($position: string) : void{
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
                let array = ['repere audio true',latitude,longitude,filePath];
                this.sqliteCtrl.insert(TABLE_REPERES,array);
                this.isenabled = true;
              });    
          }, TIME_IN_MS);
        } else { // Pas d'enregistrement audio           
          let array = ['repere audio false',latitude,longitude,''];
          this.sqliteCtrl.insert(TABLE_REPERES,array);  
          this.isenabled = true;
        }  
      })
    })
    
    

    // this.photoCtrl.photoshoot();

    
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
