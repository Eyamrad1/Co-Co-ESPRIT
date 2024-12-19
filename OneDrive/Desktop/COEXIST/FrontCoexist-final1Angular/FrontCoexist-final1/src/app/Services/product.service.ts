import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../entity/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl:string ='http://localhost:8000/api'

  constructor(private http:HttpClient) { }


  searchProducts(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/rechercheP/${keyword}`);
  }

  searchEventsByDate(Date: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/search/${Date}`);
  }

  searchEventsByDescription(Description: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/search/${Description}`);
  }


  addProduit(productData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/add-produit`, productData);
  }


  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/retrieveAllProducts`);
  }

  getProductById(idProduct: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/retrieveproduct/${idProduct}`);
  }

  updateProducts(product: Product,idProduct: number ): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/updateProduct/${idProduct}`, product);
  }

  removeProduct(productId: number): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/deleteProductById/${productId}`);
  }

  searchProductByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/search?name=${name}`);
  }


  getProductsLowStock(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/retrieveproductlowstock`);
  }



  countProductsByType(): Observable<Map<string, Object>[]> {
    return this.http.get<Map<string, Object>[]>(`${this.baseUrl}/countbytype`);
  }



  getProductsByType(type: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/byType?type=${type}`);
  }

  getFilteredProducts(minPrice: number, maxPrice: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/productsByMarge?minPrice=${minPrice}&maxPrice=${maxPrice}`);
  }






  applyDiscount(productId: number, discountPercentage: number): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${productId}/discount?discountPercentage=${discountPercentage}`, null);
  }





  getProductId(id:number):Observable<Product>{
    return this.http.get<Product>(this.baseUrl+"/retrieveProduct/"+id)
  }



  addProduct(product:FormData){
    return this.http.post(this.baseUrl+"/add", product);
  }




//removeProduct(idProduct):Observable<Product>{
//return this.http.delete<Product>(this.url+"/"+idProduct )
//}


}
