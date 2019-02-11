var opt_audio: boolean;
var opt_photo: boolean;
  
import { Component } from '@angular/core';
import { SQLitePage } from '../home/SQLitePage';

@Component({
  selector: 'page-parametre',
  templateUrl: 'parametre.html'
})

export class ParametrePage {
  audio: boolean;
  photo: boolean;
  audioInt : number;
  photoInt : number;
  constructor(
    private sqlCtrl : SQLitePage
  ) {
    this.sqlCtrl.getOptions()
    .then((data)=>{
      opt_audio = data[0].opt_audio;
      this.audio = opt_audio;
      if (this.audio){ this.audioInt = 1}else{this.audioInt = 0};

      opt_photo = data[0].opt_photo;
      this.photo = opt_photo;
      if (this.photo){ this.photoInt = 1}else{this.photoInt = 0};
    });
  }

  getOpt_audio(){
    return opt_audio;
  }

  getOpt_photo(){
    return opt_photo;
  }

  notifyPhoto(){    
    if(this.photo){
      opt_photo = true;
      this.photoInt = 1;
    } else {
      opt_photo = false;
      this.photoInt = 0
    }
    this.sqlCtrl.updateOptions(this.photoInt, this.audioInt);
  }


  notifyAudio(){
    if (this.audio){ 
     opt_audio = true;
     this.audioInt = 1
    } else {
      opt_audio = false;
      this.audioInt = 0
    }
    this.sqlCtrl.updateOptions(this.photoInt, this.audioInt);
  }

  removeBase(){
    if(confirm('Etes vous sûr de vouloir tout supprimer?'))
    { // SI LA PERSONNE A APPUYER SUR OUI
       this.sqlCtrl.supprimerBase();
    }
    
  }

}
