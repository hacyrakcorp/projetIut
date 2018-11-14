import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
<<<<<<< HEAD
import { ReperesPage } from '../pages/reperes/reperes';
import { ParametrePage } from '../pages/parametre/parametre';
=======
import { ContactPage } from '../pages/contact/contact';
>>>>>>> loic
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
<<<<<<< HEAD
import { GlobalServiceProvider } from '../providers/global-service/global-service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
=======
import { Camera } from '@ionic-native/camera';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { AndroidPermissions } from '@ionic-native/android-permissions';



class CameraMock extends Camera {
  getPicture(options) {
    return new Promise((resolve, reject) => {
      resolve("BASE_64_ENCODED_DATA_GOES_HERE");
    })
  }
}
>>>>>>> loic

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
<<<<<<< HEAD
    ReperesPage,
    ParametrePage,
=======
    ContactPage,
>>>>>>> loic
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
<<<<<<< HEAD
    HttpModule,
    HttpClientModule,
=======
>>>>>>> loic
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
<<<<<<< HEAD
    ReperesPage,
    ParametrePage,
=======
    ContactPage,
>>>>>>> loic
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
<<<<<<< HEAD
    GlobalServiceProvider,
    HttpClientModule,
=======
    Base64ToGallery,
    AndroidPermissions,
    Camera,
    { provide: Camera, useClass: CameraMock},
>>>>>>> loic
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
