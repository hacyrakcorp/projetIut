import { Component } from '@angular/core';
import { SQLitePage } from '../home/SQLitePage';
import { ToastController, NavController } from 'ionic-angular';


@Component({
  selector: 'page-insertCategorie',
  templateUrl: 'insertCategorie.html',
})
export class InsertCategoriePage {
    categories:any;
    libelle:String='';
    constructor(
        private sqlCtrl : SQLitePage,
        private toastCtrl : ToastController,
        private navCtrl : NavController
        ) {

        }
    ionViewDidEnter(){
        this.sqlCtrl.getAll('CATEGORIES')
        .then((result)=>{
            this.categories = result;
        })
    }
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
    supprimerCategorie(lib){
        this.sqlCtrl.deleteCategorie(lib);
        this.ionViewDidEnter();
        
    }
}