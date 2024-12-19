import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cart} from "../entity/Cart";

export interface CartItem {
  imgUrl: any;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  subTotal: number;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseApiUrl = 'http://localhost:8000';

  getAllCarts():Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.baseApiUrl}/cart/getAllCarts`);
  }
  constructor(private http: HttpClient) {}
  addToCart(userId:number , productId: number, quantity: number): Observable<any> {
    //const userId = localStorage.getItem('user_id');

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    });

    return this.http.post<number>(`http://localhost:8000/cart/${userId}/${productId}/${quantity}`, {}, { headers });
  }

  updateCartItemCount(count: number) {
    console.log('Updated cart item count:', count);
  }

  getCartItemsCount(userId: number): Observable<number> {
    const apiUrl = `${this.baseApiUrl}/cart/${userId}`;
    return this.http.get<number>(apiUrl);
  }

  getCartItems(userId: number): Observable<CartItem[]> {
    const apiUrl = `${this.baseApiUrl}/cart/${userId}`;
    return this.http.get<CartItem[]>(apiUrl);
  }

  removeCartItem(userId: number, productId: number): Observable<CartItem[]> {
    const apiUrl = `${this.baseApiUrl}/cart/${userId}/${productId}`;
    return this.http.delete<CartItem[]>(apiUrl);
  }
}
