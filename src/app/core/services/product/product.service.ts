import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../models';

export interface ProductObsect {
  message: string;
  data: Product[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'http://localhost:8888/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductObsect> {
    return this.http.get<ProductObsect>(this.url);
  }

  addProduct(credentials: Product): Observable<ProductObsect> {
    console.log('azertyu: ', credentials);

    return this.http.post<ProductObsect>(this.url + '/', credentials);
  }

  deleteProduct(id: number | string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
