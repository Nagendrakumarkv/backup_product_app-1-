import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  produtListUrl = environment.apiUrl + '/products/';

  constructor(private http: HttpClient) {}

  addProducts(data: any) {
    return this.http.post<any>(this.produtListUrl, data);
  }
  getAllProducts() {
    return this.http.get<any>(this.produtListUrl);
  }
  getProductById(id:any) {
    return this.http.get<any>(this.produtListUrl+id);
  }

  putProduct(data: any, id: any) {
    console.log('putProduct');
    return this.http.put<any>(this.produtListUrl + id, data);
  }
  deleteProduct(id: any) {
    return this.http.delete<any>(this.produtListUrl + id);
  }
}
