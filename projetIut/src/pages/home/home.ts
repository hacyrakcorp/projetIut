import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { ToastController } from 'ionic-angular';

//import { CreateTable } from './CreateTable';
import { SQLitePage } from './SQLitePage';

import { Photo } from './takephoto';
import { Audio } from './priseaudio';
import { GPS } from './GPS';
import { ParametrePage } from '../parametre/parametre';


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

  click($position: string) : void{
    var latitude;
    var longitude;
    //GPS
    this.GPSCtrl.getLatitude().then((results) =>
    {
      latitude = JSON.stringify(results);
    }
    )
    this.GPSCtrl.getLongitude().then((results) =>
    {
      longitude = JSON.stringify(results);
    }
    )


    alert(this.paramCtrl.getOpt_audio());


    if (this.paramCtrl.getOpt_audio() == true){
      let filePath = this.audioCtrl.startRecord();
      //Attendre 5 secondes et stop record
      let TIME_IN_MS = 5000;
      setTimeout( () => {
          this.audioCtrl.stopRecord();
          const toast = this.toastCtrl.create({
            message: "fin record",
            duration: 3000,
            position : $position
          });
          toast.present().then(()=>{
            //Enregistrement dans la base de données
            let array = ['repere audio true',latitude,longitude,filePath];
            this.sqliteCtrl.insert('REPERES',array);
          });    
      }, TIME_IN_MS);
    } else {
      let TIME_IN_MS = 5000;
      setTimeout( () => {
        let array = ['repere audio false',latitude,longitude,''];
        this.sqliteCtrl.insert('REPERES',array);
      }, TIME_IN_MS);
    }
    // this.photoCtrl.photoshoot();
  }
  select():void {  
    
    this.sqliteCtrl.getAll('REPERES').then((results) => {
      var data = JSON.stringify(results);
      var reperes = JSON.parse(data);
      alert(data);
      for (let repere of reperes){
        alert(repere.audio);
      } 
    })
  }

 /* play(file,idx){
    this.audioCtrl.playAudio(file,idx);
  }*/
}
