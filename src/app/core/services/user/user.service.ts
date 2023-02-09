import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models';

export interface UsersObject {
  data: User[];
}

export interface oneUserObject {
  data: User;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:8888/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UsersObject> {
    return this.http.get<UsersObject>(this.url);
  }

  getUser(id: number): Observable<oneUserObject> {
    return this.http.get<oneUserObject>(this.url + '/' + id);
  }

  addUser(credentials: User): Observable<User> {
    return this.http.post<User>(this.url + '/', credentials);
  }

  updateUser(id: number | string, changes: User): Observable<any> {
    return this.http.put(`${this.url}/${id}`, changes);
  }

  deleteUser(id: number | string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
