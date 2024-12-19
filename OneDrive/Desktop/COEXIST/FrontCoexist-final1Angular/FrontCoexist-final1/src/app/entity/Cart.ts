// Cart.ts

import {UserModel} from "./User.model";
import {CartItem} from "./CartItem";
import {Product} from "./Product";

export class Cart {
  iD!: number;
  userId!: number;
  totalPrice!: number;
  cartItem!: CartItem[];
  productName:Product[];


  user!: UserModel;
}
