import { Injectable } from '@angular/core';
import { SendService } from 'src/app/core/services/send.service';
import { Observable } from 'rxjs';

import { Global } from 'src/app/shared/global.const'
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(
    private sendService: SendService
  ) { }

  public getAddress<T>(postalCode: string): Observable<T> {

    const url = Global.api.maps.viacep(postalCode)

    return this.sendService.get(url, {});

  }


  public getMaps<T>(params: any): Observable<T> {

    const url = Global.api.maps.googleapis();

    return this.sendService.get(url, {
      params,
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
        'Accept': 'application/json, text/plain, */*'
      }),
      responseType: 'blob' as 'json'
    });

  }

}