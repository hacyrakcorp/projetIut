import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';

import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { ToastController } from 'ionic-angular';

import { CreateTable } from './CreateTable';
import { Photo } from './takephoto';


import { Audio } from './priseaudio';
import { Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(
    //public navCtrl: NavController,
    public toastCtrl: ToastController,
    public global : GlobalServiceProvider,
    public photoCtrl : Photo,
    public audioCtrl : Audio,
    public bddCtrl : CreateTable
    ) { 
      
  }

  click($position: string) : void{
    this.audioCtrl.startRecord();
    //Attendre 5 secondes et stop record
    let TIME_IN_MS = 10000;
    let hideFooterTimeout = setTimeout( () => {
        this.audioCtrl.stopRecord();
        const toast = this.toastCtrl.create({
          message: "fin",
          duration: 3000,
          position : $position
        });
        toast.present();

       //Enregistrement dans la base de données
       //let array = ['repere test','','','',filePath];
       //this.bddCtrl.insert('FDR',array);
      // let audio = this.audioCtrl.getAudio();
      /* const toast = this.toastCtrl.create({
        message: 'Repère créé avec succès',
        duration: 3000,
        position : $position
      });
      toast.present();*/
     
     }, TIME_IN_MS);
    
    // this.photoCtrl.photoshoot();
  }


}
