import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { RepereInfoPage } from '../repere-info/repere-info';
import { CartePage } from './carte';
import { SQLitePage } from '../home/SQLitePage';
 //Test param car console.log ne fonctionne pas
 //import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-reperes',
  templateUrl: 'reperes.html'
})
export class ReperesPage {
  reperes;
  order:string='';

  constructor(
    private navCtrl: NavController, 
    private sqliteCtrl : SQLitePage, 
    public platform : Platform) {
    
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
    this.navCtrl.push(RepereInfoPage,{repere});
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

  

}
