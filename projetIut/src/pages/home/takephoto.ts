import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { CameraPreview, CameraPreviewOptions} from '@ionic-native/camera-preview';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ToastController } from 'ionic-angular';
import { base64StringToBlob } from 'blob-util';

@Component({
  selector: 'page-home',
  providers: [Camera,CameraPreview],
  templateUrl: 'home.html'
})
export class Photo {

  public base64Image: string;
  private blob : Blob;
  constructor(
    public toastCtrl: ToastController,
    private camera:Camera, 
    private cameraPreview: CameraPreview, 
    private base64ToGallery: Base64ToGallery, 
    private androidPermisions: AndroidPermissions) {
    
  }

  
  takePicture(){  //take a picture with rear camera and put this one inside the virtual memory
    this.androidPermisions.checkPermission(this.androidPermisions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => console.log("Permissions granted", result.hasPermissions),
      err => this.androidPermisions.requestPermission(this.androidPermisions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );
    this.androidPermisions.requestPermissions([this.androidPermisions.PERMISSION.WRITE_EXTERNAL_STORAGE]);
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

  photoshoot(){ //take a picture with rear camera and try to put this one inside galery for ios or android
    /*this.androidPermisions.checkPermission(this.androidPermisions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => console.log("Permissions granted", result.hasPermissions),
      err => this.androidPermisions.requestPermission(this.androidPermisions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );
    this.androidPermisions.requestPermissions([this.androidPermisions.PERMISSION.WRITE_EXTERNAL_STORAGE]);*/
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 55,
      width: window.screen.width/2,
      height: window.screen.height/4,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: true,
      alpha: 1
    };

    this.cameraPreview.startCamera(cameraPreviewOpts);
    //setTimeout(() => {}, 5000);
    return new Promise((resolve) =>
    {
      alert('promise');
      this.cameraPreview.takePicture(
        {height: 1000,width: 1000,quality: 50}
      ).then( (imageData) => {
          this.base64Image = 'data:image/jpeg;base64,' + imageData;
          this.blob = base64StringToBlob(imageData);
          //this.blob = this.getBlob(this.base64Image); 
          //resolve(this.blob);
          resolve(this.base64Image);
        }, (err) => {
          console.log(err);
          alert(err.message);
          this.base64Image = 'assets/img/test.jpg';
        });
      /* Base64ToGallery['base64ToGallery'](this.base64Image, 'img_').then(
          res => console.log("Saved image to gallery ", res),
          err => console.log("Error saving image to gallery ", err)
        );*/
        
      /*this.cameraPreview.stopCamera();*/
    });
  }
  
  getBlob (b64Data) {
        var contentType = '';
        var sliceSize = 512;

        b64Data = b64Data.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');

        let byteCharacters = atob(b64Data);
        let byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          let slice = byteCharacters.slice(offset, offset + sliceSize);
    
          let byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }
    
          let byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        let blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

}
