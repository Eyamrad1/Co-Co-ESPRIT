import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ProductWishlist} from "../entity/productWhishlist";

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: ProductWishlist[] = [];

  constructor(private http:HttpClient) { }

  addToWishlist(ProductWishlist: ProductWishlist): void {
    this.wishlist.push(ProductWishlist);
    console.log(this.wishlist);
  }

  getWishlist(): ProductWishlist[] {
    return this.wishlist;
  }

  getWishlistLength(): number {
    return this.wishlist.length;
  }

  removeFromWishlist(ProductWishlist: ProductWishlist): void {
    const index = this.wishlist.indexOf(ProductWishlist);
    if (index !== -1) {
      this.wishlist.splice(index, 1);
    }
  }

  AddStripePayment(payment: any) {
    return this.http.post('http://localhost:9092/api/payment', payment);
  }
}
