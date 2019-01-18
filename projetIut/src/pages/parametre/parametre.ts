var opt_audio: boolean = false;

import { Component } from '@angular/core';

@Component({
  selector: 'page-parametre',
  templateUrl: 'parametre.html'
})

export class ParametrePage {

  constructor() {}

  getOpt_audio(){
    return opt_audio;
  }

  notifyAudio(){
    if (this.getOpt_audio()){ 
      opt_audio = false;
    } else {
      opt_audio = true;
    }
  }

}
