import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-reperes',
  templateUrl: 'reperes.html'
})
export class ReperesPage {
  reperes = [
    ["Repere1",48.862725,2.287592],
    ["Repere2",43.6723861,4.639733200000023],
    ["Repere3",43.6723861,4.639733200000023]
  ];
  constructor(public navCtrl: NavController) {
   
  }

  info() {
   
  }

}
