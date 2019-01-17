import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-parametre',
  templateUrl: 'parametre.html'
})
export class ParametrePage {
  private opt_audio : boolean;

  constructor(
    //public navCtrl: NavController
    ) {
      this.opt_audio = false;
  }

  getOpt_audio(){
    return this.opt_audio;
  }

  notify(){
    this.opt_audio;
  }

}
