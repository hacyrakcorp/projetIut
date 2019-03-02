import { Component } from '@angular/core';
import { NavController, Platform, Toast, AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

//import { ParametrePage } from '../parametre/parametre';
import { SQLitePage } from './SQLitePage';


import { Photo } from './takephoto';
import { Audio } from './priseaudio';
import { GPS } from './gps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isenabled:boolean=true;
  repereName:string;
  opt_audio: boolean;
  opt_photo:boolean;
  clickstate:boolean=false;
  photographie;
  latitude;
  longitude;
  filePath;
  chrono;
  constructor(
    public navCtrl: NavController,
    public platform : Platform,
    private toastCtrl: ToastController,
    private global : GlobalServiceProvider,
    private photoCtrl : Photo,
    private audioCtrl : Audio,
    private sqliteCtrl : SQLitePage,
    private GPSCtrl : GPS,
    //private paramCtrl : ParametrePage
    ) { 
      this.sqliteCtrl.getOptions()
    .then((data)=>{
      this.opt_audio = data[0].opt_audio;
      this.opt_photo = data[0].opt_photo;
});
    }
    ionViewDidEnter(){
      this.sqliteCtrl.getOptions()
      .then((data)=>{
        this.opt_audio = data[0].opt_audio;
        this.opt_photo = data[0].opt_photo;
  });
    }
  
    ionViewWillEnter(){
      this.sqliteCtrl.getOptions()
    .then((data)=>{
      this.opt_audio = data[0].opt_audio;
      this.opt_photo = data[0].opt_photo;
});
    }
  
  click($position: string) : void{
    var dateHeure = this.getDateHeure();
    const repereOK = this.toastCtrl.create({
      message: "Enregistrement du point d'intérêt",
      duration: 3000,
      position : $position
    });
    //var latitude : any;
    //var longitude : any;
    const TABLE_REPERES : string = 'REPERES';
    //var filePath;
    
    if (!this.clickstate){
      alert('oneclick');
      if(this.opt_audio){
        this.isenabled=true;
      } else {
        this.isenabled=false;
      }
      this.platform.ready().then(() => {
        //init
        this.repereName ='repere '+ dateHeure;    
        //Enregistrement GPS
        this.GPSCtrl.getLatitudeLongitude(

        ).then((coordonnees) =>{
          let data = JSON.parse(JSON.stringify(coordonnees));
          this.latitude = data.latitude;
          this.longitude = data.longitude;
		
          //Enregistrement Audio
          if (this.opt_audio){    
            this.clickstate = true;
            //Enregistrement photo
            if (this.opt_photo){ 
                this.photoCtrl.photoshoot(

                ).then((base64) => {
                  this.photographie = base64;
                //  let array = [this.repereName,latitude,longitude,filePath,base64];
                  //this.sqliteCtrl.insert(TABLE_REPERES,array);
                 // this.isenabled = true;
                  //repereOK.present();
                })//.catch(err=>this.isenabled = true);
            } else {
              this.photographie = '';
                //let array = [this.repereName,latitude,longitude,filePath,''];
                //this.sqliteCtrl.insert(TABLE_REPERES,array);
              //  this.isenabled = true;
              //  repereOK.present();
            } 

            this.filePath = this.audioCtrl.startRecord();
            let TIME_IN_MS = 30000;
            this.chrono = setTimeout(() => {
              //Enregistrement bdd
              let array = [this.repereName,
                this.latitude,
                this.longitude,
                this.filePath,
                this.photographie];
              this.sqliteCtrl.insert(TABLE_REPERES,array);
              repereOK.present();
            }, TIME_IN_MS);
			     /* let chrono = 0;
			      while(chrono != TIME_IN_MS){
				      this.sleep(1000);
				      chrono ++;
			      }
            this.audioCtrl.stopRecord();
            this.clickstate = false;*/
            
            
          } else { // Pas d'enregistrement audio
            if(this.opt_photo){
            //if (this.paramCtrl.getOpt_photo() == true){
              //Enregistrement photo
              this.photoCtrl.photoshoot(

              ).then((base64) => {
                let array = [this.repereName,this.latitude,this.longitude,'',base64];
                this.sqliteCtrl.insert(TABLE_REPERES,array); 
                this.isenabled = true;
                repereOK.present();
              }).catch(err=>this.isenabled = true);
            } else {
              let array = [this.repereName,this.latitude,this.longitude,'',''];
              this.sqliteCtrl.insert(TABLE_REPERES,array);
              this.isenabled = true;
              repereOK.present();
            }
          }  
      }).catch(err=> {this.isenabled = true
        const repereKO = this.toastCtrl.create({
          message: "Erreur enregistrement. Activez la géolocalisation.",
          duration: 3000,
          position : $position
        });
        repereKO.present();
      });
    }).catch((err)=> {
      this.isenabled = true;
      
    });

    } else {
      alert('second click');
      this.audioCtrl.stopRecord();
      this.clickstate = false;
      //Enregistrement bdd
      let array = [this.repereName,this.latitude,this.longitude,this.filePath,this.photographie];
      this.sqliteCtrl.insert(TABLE_REPERES,array);
      repereOK.present();
      clearTimeout(this.chrono);
    }
    
  }

  private sleep(milliseconds){
	var start = new Date().getTime();
	for (var i=0;i<1e7;i++){
		if((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
	
  }
  
  getDateHeure():string{
    var annee:string = new Date().getFullYear().toString();
    var mois: string = (new Date().getMonth()+1).toString();
    if (mois.length == 1) { mois = "0"+mois;}
    var jour:string = new Date().getDate().toString();
    var heure: string = new Date().getHours().toString();
    if (heure.length == 1) { heure = "0"+heure;}
    var min: string = new Date().getMinutes().toString();
    if (min.length == 1) { min = "0"+min;}
    var sec: string = new Date().getSeconds().toString();
    if (sec.length == 1) { sec = "0"+sec;}
    var dateHeure = annee+mois+jour+"_"+heure+min+sec;
    return dateHeure;
  }

  //Test bdd
  /*select():void {  
    
    this.sqliteCtrl.getAll('REPERES').then((results) => {
      var data = JSON.stringify(results);
      var reperes = JSON.parse(data);
      alert(data);
      for (let repere of reperes){
        alert(repere.audio);
      } 
    })
  }*/

  

  //Test audio
 /* play(file,idx){
    this.audioCtrl.playAudio(file,idx);
  }*/
}
