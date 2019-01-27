import { Component } from '@angular/core';
import { SQLitePage } from '../home/SQLitePage';
import { ToastController, NavController } from 'ionic-angular';


@Component({
  selector: 'page-insertCategorie',
  templateUrl: 'insertCategorie.html',
})
export class InsertCategoriePage {
    libelle:String='';
    constructor(
        private sqlCtrl : SQLitePage,
        private toastCtrl : ToastController,
        private navCtrl : NavController
        ) {}
    insertCategorie(){
        if (this.libelle != ''){
            this.sqlCtrl.insertCategorie([this.libelle]);
            const toast = this.toastCtrl.create({
                message: "ajout de la catégorie "+this.libelle,
                duration: 3000,
                position : 'middle'
            });
            toast.present();
            this.navCtrl.pop();
        } else {
            alert('Pas de catégorie renseignée');
        }
        
    }
}