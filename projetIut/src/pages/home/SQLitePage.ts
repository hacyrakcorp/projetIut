import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular';

const DATABASE_FILE_NAME: string = 'data.db';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class SQLitePage {
    private options :any;
    private db: SQLiteObject;

    constructor(
        private sqlite: SQLite, 
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen
        ) {
            this.platform.ready(

            ).then(() => {
                this.splashScreen.hide();
                this.statusBar.styleDefault();
                this.createDatabaseFile();
            });
    }

    private createDatabaseFile(): void {
        this.options = { 
            name: DATABASE_FILE_NAME, 
            location: 'default', 
            createFromLocation: 1 
        };
        this.sqlite.create(
            this.options
        ).then((db: SQLiteObject) => {
            console.log('Create bdd');
            this.db = db;
            this.createTables();
        });
    }

    private createTables(): void {
        this.sqlite.create(
            this.options
        ).then(() => {
            this.db.executeSql(
                "CREATE TABLE IF NOT EXISTS REPERES" +
                "("+
                "idREPERES INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, "+
                "name VARCHAR(32), "+
                "latitude DOUBLE, "+
                "longitude DOUBLE, "+
                "image BLOB, "+
                "audio VARCHAR(250)"+
                ")",[]
            ).then(() => {
                console.log('Table Repères created !');
                //alert('Table Repères crée');
            })
            .catch(e => console.log(e)
            );
        });
    }

    public insert($table:string, $array:any[]) {
        this.sqlite.create(
            this.options
        ).then(() => {
            this.db.executeSql(
                'INSERT INTO '+
                $table+' (name,latitude,longitude,audio) '+
                'VALUES (?,?,?,?)', $array
            ).then(() => {
                console.log('Insert réussi');
                //alert('insert ok');
            }).catch(e => {
                console.log(e)}
            );
        });
    }
    
    public getAll($table) {
        
        //this.sqlite.create(
        //    this.options
        //).then(() => {
            return new Promise((resolve) =>
            {
                this.db.executeSql(
                    'SELECT * '+
                    'FROM '+ $table, []
                ).then((results) => {
                    console.log('Select all ok');
                    //alert('select all ok ');
                    var dataSelectAll = [];
                    for (let i = 0; i < results.rows.length; i++) {
                            dataSelectAll.push({ 
                                id : results.rows.item(i).idREPERES,
                                name : results.rows.item(i).name,
                                latitude : results.rows.item(i).latitude,
                                longitude : results.rows.item(i).longitude,
                                image : results.rows.item(i).image,
                                audio : results.rows.item(i).audio
                            });
                           // alert(results.rows.item(i).audio);
                    }
                    resolve(dataSelectAll);
                    }
                ).catch(e => {
                    console.log(e)}
                );
                }
            
            ); 
            
        //});
     //   return dataSelectAll;
    }

}