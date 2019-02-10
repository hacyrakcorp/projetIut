import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, Platform } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { InsertCategoriePage } from '../pages/repere-info/insertCategorie';
import { ReperesPage } from '../pages/reperes/reperes';
import { RepereInfoPage } from '../pages/repere-info/repere-info';
import { ParametrePage } from '../pages/parametre/parametre';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CartePage } from '../pages/reperes/carte';

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
    InsertCategoriePage
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
    Insomnia
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
