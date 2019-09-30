import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { httpOptions, sendServiceOptions } from '../../shared/models/http.model';

@Injectable({
  providedIn: 'root'
})
export class SendService {

  private env: any = environment;
  private urlSend: any = this.env.baseURL + this.env.baseURI;
  private withCredentials: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  private requestFormat = (request) => new Observable(
    (observer) => {
      request.pipe(
        map((request: any) => {
          return request;
        })
      ).subscribe(
        sucess => {
          observer.next(sucess);
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      )
    }
  )

  public post<T>(url: string, body: object | Array<object>, options: sendServiceOptions = {}): Observable<any> {
    const headers = options.headers ? options.headers : new HttpHeaders;
    const params = options.params ? options.params : new HttpParams;

    const httpOptions: httpOptions = {
      headers,
      params,
      withCredentials: this.withCredentials
    }

    const urlFormated = this.makeUrl(url);

    const request = this.http.post(urlFormated, body, httpOptions);

    return this.requestFormat(request);

  }

  public get<T>(url: string, options: sendServiceOptions = {}): Observable<any> {
    const headers = options.headers ? options.headers : new HttpHeaders;
    const params = options.params ? options.params : new HttpParams;
    const responseType = options.responseType ? options.responseType : 'json';

    const httpOptions: httpOptions = {
      headers,
      params,
      responseType,
      withCredentials: this.withCredentials
    }

    const urlFormated = this.makeUrl(url);

    const request = this.http.get<T>(urlFormated, httpOptions);

    return this.requestFormat(request)

  }


  public delete<T>(url: string, options: sendServiceOptions = {}): Observable<any> {
    const headers = options.headers ? options.headers : new HttpHeaders;
    const params = options.params ? options.params : new HttpParams;
    const body = options.body ? options.body : {};

    const httpOptions: httpOptions = {
      headers,
      params,
      body,
      withCredentials: this.withCredentials
    }

    const urlFormated = this.makeUrl(url);
    const request = this.http.delete(urlFormated, httpOptions);

    return this.requestFormat(request)
  }

  private makeUrl(url: string): string {
    return url;
  }
}
