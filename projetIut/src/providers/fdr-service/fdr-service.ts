import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FdrServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FdrServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FdrServiceProvider Provider');
  }

}
