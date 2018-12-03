import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { e } from '@angular/core/src/render3';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BoundDirectivePropertyAst } from '@angular/compiler';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class CreateTable {

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
      db.executeSql('CREATE TABLE IF NOT EXISTS FDR(id int AUTO_INCREMENT,nom varchar(32),Lattitude double,Longitude double,img BLOB,urlaudio varchar(64)', []) //execute le code sql pour creer une table FDR
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));
    });
  }

  public update($table,$array){
    this.sqlite.create({ //Ouvre ou créer la bdd
      name: 'data.db',
      location: 'default' // the location field is required
    })
    .then((db : SQLiteObject) => {
      db.executeSql('UPDATE '+$table+' SET ? WHERE id = '+ $array['id'], $array) //execute le code sql pour mettre à jour une table
      .then(() => console.log('Executed SQL, Update'))
      .catch(e => console.log(e));
    });
  }

  public delete($table,$id){
    this.sqlite.create({ //Ouvre ou créer la bdd
      name: 'data.db',
      location: 'default' // the location field is required
    })
    .then((db : SQLiteObject) => {
      db.executeSql('DELETE '+$table+' WHERE id = '+$id) //execute le code sql pour supprimer une données
      .then(() => console.log('Executed SQL, Delete'))
      .catch(e => console.log(e));
    });
  }

  public addcom($table,$id,$com){
    this.sqlite.create({ //Ouvre ou créer la bdd
      name: 'data.db',
      location: 'default' // the location field is required
    })
    .then((db : SQLiteObject) => {
      db.executeSql('UPDATE '+$table+' SET commentaire = '$com' WHERE id = '+$id) //execute le code sql pour ajouter un comentaire
      .then(() => console.log('Executed SQL, Delete'))
      .catch(e => console.log(e));
    });
  }
}
