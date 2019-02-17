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
  reperes;
  order:string='';

  constructor(public navCtrl: NavController, 
    public modalCtrl : ModalController,
    public toastCtrl: ToastController,
    private sqliteCtrl : SQLitePage, public platform : Platform) {
    
      this.order="name";
  }

  doRefresh(event) {
    this.platform.ready().then(() => {
      this.sqliteCtrl.getAll('REPERES').then((results) => {
       this.reperes = results;
       event.complete();
      }).catch(()=>{
        alert('impossible de rafraichir');
        event.complete();
      });
    });
  }
  
  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.sqliteCtrl.getAll('REPERES').then((results) => {
       this.reperes = results;
      });
    });
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.sqliteCtrl.getAll('REPERES').then((results) => {
       this.reperes = results;
      });
    });
  }

  selectRepere(repere) {
    this.navCtrl.push(RepereInfoPage,
      { repere });
  }

  trier(value){
    this.order = value;
     this.sqliteCtrl.getAll('REPERES',this.order).then((results) => {
       this.reperes = results;
      });
  }

  carte(){
    this.navCtrl.push(CartePage);
  }

  onKeyUp($event){
    
  }

}
