import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { e } from '@angular/core/src/render3';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public sqlite: SQLite
  ) {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.statusBar.styleDefault();
      this.createDatabase();
    });
  };


  private createDatabase(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default' // the location field is required
    })
    .then((db : SQLiteObject) => {
      db.executeSql('create table FDR(id int AUTO_INCREMENT,nom varchar(32),Lattitude double,Longitude double,img BLOB,urlaudio varchar(64)', []) //execute le code sql pour creer une table FDR
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));
    });
  }

}
