import { HttpParams, HttpHeaders } from '@angular/common/http';

export interface sendServiceOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  params?: {
    [param: string]: string | string[];
  };
  query?: string;
  body?: any | null;
  responseType?: "json";
}

export interface httpOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: "body";
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: "json";
  withCredentials?: boolean;
  body?: any | null;
}

export interface simpleObject {
  [key: string]: string
}

