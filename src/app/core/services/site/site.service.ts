import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface SiteObject {
  data: Site[];
}

export interface Site {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SiteService {
  url = 'http://localhost:8888/sites';

  constructor(private http: HttpClient) {}

  getSites(): Observable<SiteObject> {
    return this.http.get<SiteObject>(this.url);
  }
}
