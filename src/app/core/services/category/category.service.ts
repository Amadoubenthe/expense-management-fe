import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CategoryObject {
  data: Category[];
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  userId: number;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = 'http://localhost:8888/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryObject> {
    return this.http.get<CategoryObject>(this.url);
  }
}
