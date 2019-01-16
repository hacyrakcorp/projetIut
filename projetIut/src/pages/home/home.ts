import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { ToastController } from 'ionic-angular';

import { CreateTable } from './CreateTable';
import { SQLitePage } from './SQLitePage';

import { Photo } from './takephoto';


import { Audio } from './priseaudio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public global : GlobalServiceProvider,
    public photoCtrl : Photo,
    public audioCtrl : Audio,
    public bddCtrl : CreateTable,
    public sqliteCtrl : SQLitePage
    ) { 
     
      
  }

  click($position: string) : void{
    let filePath = this.audioCtrl.startRecord();
    //Attendre 5 secondes et stop record
    let TIME_IN_MS = 5000;
    let hideFooterTimeout = setTimeout( () => {
        this.audioCtrl.stopRecord();
        const toast = this.toastCtrl.create({
          message: "fin record",
          duration: 3000,
          position : $position
        });
        toast.present();
       // this.bddCtrl.createDatabase();
       //Enregistrement dans la base de données
      // let array = ['repere test','','','',filePath];
      // this.bddCtrl.insert('FDR',array);
     }, TIME_IN_MS);
    
    // this.photoCtrl.photoshoot();
  }

  play(file,idx){
    this.audioCtrl.playAudio(file,idx);
  }
}
