import {TypeProduit} from "./TypeProduit";
import {TypeStatus} from "./TypeStatus";

export class Product {

    idProduct:number;
    img:string;
    description:string;
    productName:string;
    price:number;
    stock:number

    status?:TypeStatus;
    type?:TypeProduit;
  Date: string;

}


