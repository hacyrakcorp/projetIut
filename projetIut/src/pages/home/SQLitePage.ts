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
                "photo TEXT, "+
                "audio VARCHAR(250), "+
                "commentaire VARCHAR(250)," +
                "date TEXT," +
                "categorie VARCHAR(32)" +
                ")",[]
            ).then(() => {
                console.log('Table Repères created !');
                //alert('Table Repères crée');
            })
            .catch(e => console.log(e)
            );
            this.db.executeSql(
                "CREATE TABLE IF NOT EXISTS CATEGORIES" +
                "("+
                "libelle VARCHAR(32) PRIMARY KEY NOT NULL UNIQUE"+
                ")",[]
            ).then(() => {
                //this.testInsertCategorie();
                console.log('Table Catégories created !');
               // alert('Table Catégories crée');
            })
            .catch(e => console.log(e)
            );
            this.db.executeSql(
                "CREATE TABLE IF NOT EXISTS OPTIONS" +
                "("+
                "idOPTIONS INTEGER PRIMARY KEY NOT NULL UNIQUE, "+
                "opt_photo INTEGER, "+
                "opt_audio INTEGER"+ //0 false 1 true
                ")",[]
            ).then(() => {
                console.log('Table Options created !');
                this.db.executeSql(
                    "INSERT OR IGNORE INTO OPTIONS (idOPTIONS, opt_photo, opt_audio) "+
                    "VALUES (1,1,0)",[]
                ).then(() => {
                    console.log('Insert réussi');
                    //alert('insert ok');
                }).catch(e => {
                    console.log(e)
                });
            })
            .catch(e => console.log(e)
            );
        });
    }

    public insertCategorie($libelle:any[]){
        this.sqlite.create(
            this.options
        ).then(() => {
            this.db.executeSql(
                "INSERT INTO CATEGORIES (libelle) "+
                "VALUES (?)", $libelle
            ).then(() => {
                console.log('Insert réussi');
               // alert('insert categorie ok');
            }).catch(e => {
                console.log(e)}
            );
        });
    }

    public deleteCategorie($libelle){
        this.sqlite.create(
            this.options
        ).then(() => {
            this.db.executeSql(
                "DELETE FROM CATEGORIES "+
                "WHERE libelle = '"+ $libelle+"'"
            ).then(() => {
                
            }).catch(e => {
                console.log(e)}
            );  
        });
    }

    public deleteRepere($id){
        this.sqlite.create(
            this.options
        ).then(() => {
            this.db.executeSql(
                "DELETE FROM REPERES "+
                "WHERE idREPERES = '"+ $id+"'"
            ).then(() => {
                
            }).catch(e => {
                console.log(e)}
            );  
        });
    }

    public insert($table:string, $array:any[]) {
        this.sqlite.create(
            this.options
        ).then(() => {
            this.db.executeSql(
                'INSERT INTO '+
                $table+' (name,latitude,longitude,audio,photo,date) '+
                'VALUES (?,?,?,?,?,datetime("now"))', $array
            ).then(() => {
                console.log('Insert réussi');
                //alert('insert repere ok');
            }).catch(e => {
                console.log(e)}
            );
        });
    }

    public updateRepere($array:any[]) {
        this.sqlite.create(
            this.options
        ).then(() => {
            this.db.executeSql(
                'UPDATE REPERES SET '+
                'name = ?, '+
                'latitude = ?, '+
                'longitude = ? ,'+
                'categorie = ? ,'+
                'commentaire = ? '+
                'WHERE idREPERES = ?', $array
            ).then(() => {
                console.log('Update réussi');
            }).catch(e => {
                console.log(e)}
            );
        });
    }
    
    public getAll($table,$trier='') {
        
        //this.sqlite.create(
        //    this.options
        //).then(() => {
            return new Promise((resolve) =>
            {
                let sql = 'SELECT * '+ 'FROM '+ $table;
                if($trier != ''){
                    sql = sql + ' ORDER BY ' +$trier;
                }
                this.db.executeSql(     
                    sql, []
                ).then((results) => {
                    console.log('Select all ok');
                    //alert('select all ok ');
                    var dataSelectAll = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        if ($table == "REPERES"){
                            dataSelectAll.push({ 
                                id : results.rows.item(i).idREPERES,
                                name : results.rows.item(i).name,
                                latitude : results.rows.item(i).latitude,
                                longitude : results.rows.item(i).longitude,
                                image : results.rows.item(i).photo,
                                audio : results.rows.item(i).audio,
                                categorie : results.rows.item(i).categorie,
                                commentaire : results.rows.item(i).commentaire,
                                date : results.rows.item(i).date
                            });
                        } else if ($table == "CATEGORIES") {
                            dataSelectAll.push({ 
                                libelle : results.rows.item(i).libelle
                            });
                        }
                          
                    }
                    resolve(dataSelectAll);
                    }
                ).catch(e => {
                    console.log(e);
                }
                );
                }
            
            ); 
            
        //});
     //   return dataSelectAll;
    }

    getOptions(){
        return new Promise((resolve) =>
        {
            this.db.executeSql(
                'SELECT * '+
                'FROM OPTIONS', []
            ).then((result) => {
                let data = [];
                data.push({
                    opt_photo : result.rows.item(0).opt_photo,
                    opt_audio : result.rows.item(0).opt_audio
                })
                resolve(data);
                console.log('');
            }).catch(e => {
                console.log(e)}
            );
        });
    }

    updateOptions($photo:number,$audio:number){
        this.sqlite.create(
            this.options
        ).then(() => {
            this.db.executeSql(
                'UPDATE OPTIONS SET '+
                'opt_photo = '+$photo+', '+
                'opt_audio = '+$audio+' '+
                'WHERE idOPTIONS = 1',[]
            ).then(() => {
                console.log('Update réussi');
            }).catch(e => {
                console.log(e);
            }
            );
        });
    }

    public supprimerBase() {
        this.db.executeSql(
            'DELETE FROM REPERES '
        );
        this.db.executeSql(
            'DELETE FROM CATEGORIES '
        );
       // this.sqlite.deleteDatabase(this.options);
    }

}