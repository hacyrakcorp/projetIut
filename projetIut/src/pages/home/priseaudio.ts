import { Component } from '@angular/core';
//des import pour les fichiers et les médias
import { Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Audio {
  //declaration des variables
  recording: boolean = false;
  //le chemin de fichier
  filePath: string;
  //le nom de fichier
  fileName: string;
  //la note vocale
  audio: MediaObject;
  //la liste des des enregistrement
  audioList: any[] = [];

  //constructeur
  constructor(
    private media: Media,  
    private file: File, 
    public platform: Platform
    ){}

    //fonction pour la liste des enregistrement
    getAudioList() {
      if(localStorage.getItem("audiolist")) {
        this.audioList = JSON.parse(localStorage.getItem("audiolist"));
        console.log(this.audioList);  
      }
    }
    
    ionViewWillEnter() {
      this.getAudioList();
    }
    
    //la fonction pour lancer l'enregistrement
    startRecord() {
      if (this.platform.is('ios'))   {
  
        this.fileName = 'record'+
        new Date().getDate()+
        new Date().getMonth()+
        new Date().getFullYear()+
        new Date().getHours()+
        new Date().getMinutes()+
        new Date().getSeconds()+'.m4a';
        this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') 
                    + this.fileName;
        this.audio = this.media.create(this.filePath);
                    }
      else if (this.platform.is('android')) {
  
        this.fileName = 'record'+
        new Date().getDate()+
        new Date().getMonth()+
        new Date().getFullYear()+
        new Date().getHours()+
        new Date().getMinutes()+
        new Date().getSeconds()+'.3gp';
        this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') 
                        + this.fileName;
        this.file.createFile(this.filePath,this.fileName,true);
        this.audio = this.media.create(this.filePath);
      }  else if (this.platform.is('cordova')) {
        //TEST BROWSER CORDOVA
        this.fileName = 'record'+
        new Date().getDate()+
        new Date().getMonth()+
        new Date().getFullYear()+
        new Date().getHours()+
        new Date().getMinutes()+
        new Date().getSeconds()+'.mp3';
        
        this.filePath = 'C:/Projets/projetIut/projetIut/'  
        + this.fileName;
        this.audio = this.media.create(this.filePath);
      }
      this.audio.startRecord();
      this.recording = true;
      return this.filePath;
    }


    //pour arreter l'enregistrement
    stopRecord() {
      this.audio.stopRecord();
      let data = { filename: this.fileName };
      this.audioList.push(data);
      //alert(this.audioList.length);
      localStorage.setItem("audiolist", JSON.stringify(this.audioList));
      this.recording = false;
      this.getAudioList();
    }
    
    playAudio(file,idx) {
      if (this.platform.is('ios')) {
        this.audio = this.media.create(file);
      }
      else if (this.platform.is('android')) {
        this.audio = this.media.create(file);
      } else if (this.platform.is('cordova')) {
        this.filePath = 'C:/Projets/projetIut/projetIut/' + file;
        this.audio = this.media.create(file);
      }
      this.audio.play();
      this.audio.setVolume(0.8);
    }

    stopAudio(){
      this.audio.stop();
    }

    pauseAudio(){
      this.audio.pause();
    }
    
}
