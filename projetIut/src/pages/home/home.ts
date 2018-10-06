import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public global : GlobalServiceProvider) { 

  }

  click($position: string) : void{
    const toast = this.toastCtrl.create({
      message: 'Repère créé avec succès',
      duration: 3000,
      position : $position
    });
    toast.present();
  }

}
