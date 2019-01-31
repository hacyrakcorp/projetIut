import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { RepereInfoPage } from '../repere-info/repere-info';


 //Test param car console.log ne fonctionne pas
 import { SQLitePage } from '../home/SQLitePage';
 import { AffichageMap } from '../repere-info/googleMap';

@Component({
  selector: 'page-carte',
  templateUrl: 'carte.html'
})

export class CartePage {

	repere;
	constructor(
		private carteCtrl : AffichageMap,
		public platform : Platform
		){
			this.repere = {
				
				nom: 'test' ,
				latitude: 43,
				longitude: 5
			  };
	}

	ionViewDidLoad() {
    	this.platform.ready().then(() => {
     	this.carteCtrl.loadMap(this.repere);
  	});
  
  }

}