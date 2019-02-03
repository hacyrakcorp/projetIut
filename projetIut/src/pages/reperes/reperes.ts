import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { RepereInfoPage } from '../repere-info/repere-info';
import { ToastController } from 'ionic-angular';
import { CartePage } from './carte';
 //Test param car console.log ne fonctionne pas
 //import { AlertController } from 'ionic-angular';
 import { SQLitePage } from '../home/SQLitePage';

@Component({
  selector: 'page-reperes',
  templateUrl: 'reperes.html'
})
export class ReperesPage {
 /* reperes = [
    {id:1,nom:"Repere1",latitude:48.862725,longitude:2.287592},
    {id:2,nom:"Repere2",latitude:43.6723861,longitude:4.639733200000023},
    {id:3,nom:"Repere3",latitude:46.6723861,longitude:4.56}
  ];*/
  reperes;
  order:string='';

  constructor(public navCtrl: NavController, 
    public modalCtrl : ModalController,
    public toastCtrl: ToastController,
   // private alertCtrl: AlertController,
    private sqliteCtrl : SQLitePage, public platform : Platform) {
    
    this.order="name";
  }
  
  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.sqliteCtrl.getAll('REPERES').then((results) => {
       // var data = JSON.stringify(results);
       // this.reperes = JSON.parse(data);
       this.reperes = results;
      });
    });
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.sqliteCtrl.getAll('REPERES').then((results) => {
       // var data = JSON.stringify(results);
       // this.reperes = JSON.parse(data);
       this.reperes = results;
      });
    });
  }

  selectRepere(repere) {
    this.navCtrl.push(RepereInfoPage,
      { repere });
    /*let modal = this.modalCtrl.create(RepereInfoPage,
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
	  modal.present();*/
  }

  trier(value){
    this.order = value;
     this.sqliteCtrl.getAll('REPERES',this.order).then((results) => {
      //  var data = JSON.stringify(results);
       // this.reperes = JSON.parse(data);
       this.reperes = results;
      });
  }

  carte(){
    this.navCtrl.push(CartePage);
  }

}
