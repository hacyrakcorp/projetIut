import { Component } from '@angular/core';

import { ReperesPage } from '../reperes/reperes';
import { ParametrePage } from '../parametre/parametre';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ReperesPage;
  tab3Root = ParametrePage;

  constructor() {

  }
}
