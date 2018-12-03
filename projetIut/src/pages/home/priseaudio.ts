import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
//des import pour les fichiers et les médias
import { NavController, Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
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
  constructor(public navCtrl: NavController, private media: Media,  private file: File, public platform: Platform){}

//fonction pour la liste des enregistrement
    getAudioList() {
    if(localStorage.getItem("audiolist")) {
    this.audioList = JSON.parse(localStorage.getItem("audiolist"));
    console.log(this.audioList);  }
                  }
    ionViewWillEnter() {
                    this.getAudioList();
                          }
    //la fonction pour lancer l'enregistrement
    startRecord() {
  if (this.platform.is('ios'))   {

    this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
    this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
    this.audio = this.media.create(this.filePath);
                                }
  else if (this.platform.is('android')) {

    this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
    this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
    this.audio = this.media.create(this.filePath);
  }
  this.audio.startRecord();
  this.recording = true;
    }


    //pour arreter l'enregistrement
    stopRecord() {
  this.audio.stopRecord();
    let data = { filename: this.fileName };
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    this.getAudioList();
}
     playAudio(file,idx) {
    if (this.platform.is('ios')) {
    this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
    this.audio = this.media.create(this.filePath);
  }
  else if (this.platform.is('android')) {
    this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
    this.audio = this.media.create(this.filePath);
  }
  this.audio.play();
  this.audio.setVolume(0.8);
}
}