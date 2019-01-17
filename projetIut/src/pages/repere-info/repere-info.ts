import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the RepereInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 //Test param car console.log ne fonctionne pas
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-repere-info',
  templateUrl: 'repere-info.html',
})
export class RepereInfoPage {
  id: string;
  nom: string;
  latitude: string;
  longitude: string;
  audio:string;
  repere;

  constructor(public viewCtrl: ViewController, 
    public navParams: NavParams,
    private alertCtrl: AlertController) {
   /* let alert = this.alertCtrl.create({
      title: navParams.get('userId'),
      buttons: ['Dismiss']
    });
    alert.present();*/
    this.id = navParams.get('item').id;
    this.nom = navParams.get('item').nom;
    this.latitude = navParams.get('item').latitude;
    this.longitude = navParams.get('item').longitude;
    this.repere = {
      id: navParams.get('item').id,
      nom:navParams.get('item').nom,
      latitude:navParams.get('item').latitude,
      longitude:navParams.get('item').longitude
    };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepereInfoPage');
  }

  

  fermeture() {
	  this.viewCtrl.dismiss();
  }

  enregistrer() {
    let modifierRepere = {
      id: this.id,
      nom: this.nom,
      latitude: this.latitude,
      longitude: this.longitude
    };
   
    if (JSON.stringify(modifierRepere) !== JSON.stringify(this.repere)){
      this.viewCtrl.dismiss(modifierRepere);
    } else {
      this.viewCtrl.dismiss();
    }
    
  }
}
