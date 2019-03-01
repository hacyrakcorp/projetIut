import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { CameraPreview, CameraPreviewOptions} from '@ionic-native/camera-preview';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-home',
  providers: [Camera,CameraPreview],
  templateUrl: 'home.html'
})
export class Photo {

  public base64Image: string;


  constructor(
    private camera:Camera, 
    private cameraPreview: CameraPreview, 
    private base64ToGallery: Base64ToGallery, 
    private androidPermisions: AndroidPermissions) { 
      this.init();
  }

  init(){
     const cameraPreviewOpts: CameraPreviewOptions = {
        x: -1000,
        y: -1000,
        width: 1000,
        height: 1000,
        toBack: false,
        tapPhoto: true,
        previewDrag: false,
        camera: 'rear'
        };
      
      this.cameraPreview.startCamera(cameraPreviewOpts).then(()=>{
        this.cameraPreview.hide();
      });
  }

  
  takePicture(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
   this.base64ToGallery.base64ToGallery(this.base64Image).then(
      res => console.log('Saved image to gallery ', res),
      err => console.log('Error saving image to gallery ', err)
    );
}

  photoshoot() {
    return new Promise((resolve) =>
    {
     // alert('promise');
      this.cameraPreview.takePicture(
        {height: 1000,width: 1000,quality: 50}
      ).then( (imageData) => {
          //this.cameraPreview.stopCamera();
          this.base64Image = 'data:image/jpeg;base64,' + imageData;
          resolve(this.base64Image);
        }, (err) => {
          console.log(err);
          this.base64Image = 'assets/img/test.jpg';
        });
    });
  }
}
