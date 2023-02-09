import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Command } from '../../models';

export interface CommandObject {
  data: Command[];
}

@Injectable({
  providedIn: 'root',
})
export class CommandService {
  url = 'http://localhost:8888/commands';

  constructor(private http: HttpClient) {}

  getAllCommands(): Observable<CommandObject> {
    return this.http.get<CommandObject>(this.url);
  }

  addCommand(credentials: Command): Observable<Command> {
    console.log('credentials: ', credentials);

    return this.http.post<Command>(this.url + '/', credentials);
  }

  updateCommand(id: number | string, changes: Command): Observable<any> {
    return this.http.put(`${this.url}/${id}`, changes);
  }

  // getUser(id: string | null): Observable<any> {
  //   return this.http.get<any>(this.url + '/' + id);
  // }

  // deleteUser(id: number | string): Observable<any> {
  //   return this.http.delete(`${this.url}/${id}`);
  // }
}
