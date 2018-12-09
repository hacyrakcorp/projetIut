import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { RepereInfoPage } from '../repere-info/repere-info';
import { ToastController } from 'ionic-angular';

 //Test param car console.log ne fonctionne pas
 import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-reperes',
  templateUrl: 'reperes.html'
})
export class ReperesPage {
  reperes = [
    {id:1,nom:"Repere1",latitude:48.862725,longitude:2.287592},
    {id:2,nom:"Repere2",latitude:43.6723861,longitude:4.639733200000023},
    {id:3,nom:"Repere3",latitude:46.6723861,longitude:4.56}
  ];

  constructor(public navCtrl: NavController, 
    public modalCtrl : ModalController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController) {
   
  }


  selectRepere(repere) {
    let modal = this.modalCtrl.create(RepereInfoPage,
      { item: repere });

     modal.onDidDismiss((rep) => {
      
       if(rep){
         //this.reperes.push(repere);
         let exist = false;
        for (var i = 0; i<this.reperes.length;i++){
          if (this.reperes[i].id == rep.id){
            this.reperes[i] = rep;
            exist = true;
            break;
          }
        }
        if (exist){
          const toast = this.toastCtrl.create({
            message: 'Repère modifié avec succès',
            duration: 3000,
            position : 'bottom'
          });
          toast.present();
        }
        
       }
     });
	  modal.present();
  }

}
