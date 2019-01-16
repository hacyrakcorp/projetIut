import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const DATABASE_FILE_NAME: string = 'data.db';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class SQLitePage {
    private options;
  private db: SQLiteObject;
  private storage : SQLite;
 /* movies: string[] = [];
  titleMovie: string;
  ratingMovie: number;
  descriptionMovie: string;
  categorieMovie: string;*/

  constructor(private sqlite: SQLite) {
    this.createDatabaseFile();
  }

  private createDatabaseFile(): void {
  /*  this.sqlite.create({
      name: DATABASE_FILE_NAME,
      location: 'default',
      createFromLocation: 1
    })
      .then((db: SQLiteObject) => {
        console.log('Bdd créée !');
        this.db = db;
        this.createTables();
      })
      .catch(e => console.log(e));*/
     this.options = { name: DATABASE_FILE_NAME, 
        location: 'default', 
        createFromLocation: 1 };
      this.storage = new SQLite();
        this.storage.create(this.options).then((db: SQLiteObject) => {
            console.log('Create bdd');
            alert('bdd cree');
            this.db = db;
            this.createTables();
        })
  }

  private createTables(): void {
      alert('entree');
      this.storage.create(this.options).then(() => {
          alert('test');
        this.db.executeSql("CREATE TABLE IF NOT EXISTS 'REPERES'" +
            "("+
            "'idREPERES' INTEGER NOT NULL AUTO_INCREMENT, "+
            "'name' TEXT, "+
            "'latitude' DOUBLE, "+
            "'longitude' DOUBLE, "+
            "'image' BLOB, "+
            "'audio' TEXT, "+
            "PRIMARY KEY('idREPERES')"+
            ")")
        .then(() => {
            console.log('Table Repères created !');
            alert('Table Repères crée');
        })
        .catch(e => console.log(e));
    })
  }

  /*public saveMyFilm() {
    console.log('Movie name -> ' + this.titleMovie);
    console.log('Rating -> ' + this.ratingMovie + '/5');
    console.log('Description -> ' + this.descriptionMovie);
    console.log('Categorie -> ' + this.categorieMovie);

    // INSERT INTO `CATEGORIES` (name) VALUES('Test');
    // INSERT INTO `MOVIES`(name, eval, desc, categoryId) VALUES ('Nom film', 3, 'Description', 1)

    this.db.executeSql('INSERT INTO `CATEGORIES` (name) VALUES(\'' + this.categorieMovie + '\')', {})
      .then(() => {
        console.log('Categorie inserted !');

        this.db.executeSql('INSERT INTO `MOVIES`(name, eval, desc, categoryId) VALUES (\'' + this.titleMovie + '\', '+ this.ratingMovie +', \''+ this.descriptionMovie +'\', last_insert_rowid())', {})
        .then(() => console.log('Movie inserted !'))
        .catch(e => console.log(e));

      })
      .catch(e => console.log(e));
  }

  public retrieveFilms() {

    this.movies = [];
    this.db.executeSql('SELECT name FROM `MOVIES`', {})
		.then((data) => {

			if(data == null) {
				return;
			}

			if(data.rows) {
				if(data.rows.length > 0) {
					for(var i = 0; i < data.rows.length; i++) {
            this.movies.push(data.rows.item(i).name);
          }
				}
			}
		});
    
	}*/

}