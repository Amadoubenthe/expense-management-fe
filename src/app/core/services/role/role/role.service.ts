import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Role {
  id: number;
  name: string;
  createdAt: Date;
}

export interface RoleObject {
  data: Role[];
}

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  url = 'http://localhost:8888/roles';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<RoleObject> {
    return this.http.get<RoleObject>(this.url);
  }
}
