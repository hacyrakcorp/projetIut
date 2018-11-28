import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ReperesPage } from '../pages/reperes/reperes';
import { RepereInfoPage } from '../pages/repere-info/repere-info';
import { ParametrePage } from '../pages/parametre/parametre';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Photo } from '../pages/home/takephoto';
import { Camera } from '@ionic-native/camera';
import { CameraPreview, CameraPreviewOptions} from '@ionic-native/camera-preview';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { AndroidPermissions } from '@ionic-native/android-permissions';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalServiceProvider } from '../providers/global-service/global-service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ReperesPage,
	RepereInfoPage,
    ParametrePage,
    HomePage,
    TabsPage,
    Photo
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ReperesPage,
	RepereInfoPage,
    ParametrePage,
    HomePage,
    TabsPage,
    Photo
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GlobalServiceProvider,
    HttpClientModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera, CameraPreview, Base64ToGallery,AndroidPermissions,Photo
  ]
})
export class AppModule {}
