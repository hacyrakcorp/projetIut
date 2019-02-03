var opt_audio: boolean = false;
var opt_photo: boolean = true;

import { Component } from '@angular/core';
import { SQLitePage } from '../home/SQLitePage';

@Component({
  selector: 'page-parametre',
  templateUrl: 'parametre.html'
})

export class ParametrePage {

  constructor(
    private sqlCtrl : SQLitePage
  ) {}

  getOpt_audio(){
    return opt_audio;
  }

  getOpt_photo(){
    return opt_photo;
  }

  notifyPhoto(){
    if(this.getOpt_photo()){
      opt_photo = false;
    } else {
      opt_photo = true;
    }
  }


  notifyAudio(){
    if (this.getOpt_audio()){ 
      opt_audio = false;
    } else {
      opt_audio = true;
    }
  }

  removeBase(){
    this.sqlCtrl.supprimerBase();
  }

}
