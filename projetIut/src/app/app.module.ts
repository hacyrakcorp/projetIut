import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, Platform } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { InsertCategoriePage } from '../pages/repere-info/insertCategorie';
import { StreetviewPage } from '../pages/repere-info/streetview';
<<<<<<< HEAD
<<<<<<< HEAD
import { twitterPage } from '../pages/repere-info/Twitter';
=======
>>>>>>> 988026d81e28e17692eb1cbd8cb7c89aa01c0753
=======
import { twitterPage } from '../pages/repere-info/Twitter';
>>>>>>> loic
import { ReperesPage } from '../pages/reperes/reperes';
import { RepereInfoPage } from '../pages/repere-info/repere-info';
import { ParametrePage } from '../pages/parametre/parametre';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CartePage } from '../pages/reperes/carte';
<<<<<<< HEAD
<<<<<<< HEAD
import{InAppBrowser} from '@ionic-native/in-app-browser';
=======
>>>>>>> 988026d81e28e17692eb1cbd8cb7c89aa01c0753
=======
import{InAppBrowser} from '@ionic-native/in-app-browser';
>>>>>>> loic

import { PrisePhoto } from '../pages/home/prisePhoto';
import { Photo } from '../pages/home/takephoto';
import { Camera } from '@ionic-native/camera';
import { CameraPreview } from '@ionic-native/camera-preview';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { Audio } from '../pages/home/priseaudio';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';

import { GPS } from '../pages/home/gps';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';


import { SQLitePage } from '../pages/home/SQLitePage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalServiceProvider } from '../providers/global-service/global-service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Insomnia } from '@ionic-native/insomnia';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ReperesPage,
    CartePage,
	  RepereInfoPage,
    ParametrePage,
    HomePage,
    TabsPage,
    Audio,
    Photo,
    PrisePhoto,
    InsertCategoriePage,
<<<<<<< HEAD
<<<<<<< HEAD
    StreetviewPage,
    twitterPage
=======
    StreetviewPage
>>>>>>> 988026d81e28e17692eb1cbd8cb7c89aa01c0753
=======
    StreetviewPage,
    twitterPage
>>>>>>> loic
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ReperesPage,
    CartePage,
	  RepereInfoPage,
    ParametrePage,
    HomePage,
    TabsPage,
    Photo,
    Audio,
    InsertCategoriePage,
<<<<<<< HEAD
<<<<<<< HEAD
    StreetviewPage,
    twitterPage
=======
    StreetviewPage
>>>>>>> 988026d81e28e17692eb1cbd8cb7c89aa01c0753
=======
    StreetviewPage,
    twitterPage
>>>>>>> loic
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GlobalServiceProvider,
    HttpClientModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ParametrePage,
    SQLite,SQLitePage,
    Camera, CameraPreview, Base64ToGallery,AndroidPermissions,Photo,PrisePhoto,
    Audio,Media,File,
    GPS,GoogleMaps,Geolocation,
<<<<<<< HEAD
<<<<<<< HEAD
    Insomnia,
    InAppBrowser
=======
    Insomnia
>>>>>>> 988026d81e28e17692eb1cbd8cb7c89aa01c0753
=======
    Insomnia,
    InAppBrowser
>>>>>>> loic
  ]
})
export class AppModule {

  constructor(
    public platform: Platform,
    androidPermissions: AndroidPermissions,
    private insomnia: Insomnia
  ) {
      platform.ready().then(()=>{
        androidPermissions.requestPermissions([
          androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
          androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
          androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
        ]);

        this.insomnia.keepAwake()
      .then(
        () => console.log('insomnia'),
        () => console.log('error')
      );
      });
  }
}
