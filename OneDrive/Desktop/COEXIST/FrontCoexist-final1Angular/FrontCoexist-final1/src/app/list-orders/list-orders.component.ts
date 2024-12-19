import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CartService} from "../Services/cart.service";
import {Cart} from "../entity/Cart";
import {Product} from "../entity/Product";

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {
  carts: Cart[] = [];
  keyword: string = '';
  userId: number;
  currentPage: number = 1;
  pageSize: number = 3; // Number of events per page
  pagedProducts: Cart[] = [];
  constructor( private cartService : CartService, private router: Router) { }
  ngOnInit() {
    this.getAllCart();
  }
  getAllCart(){
    // Call the service to get the list of events
    this.cartService.getAllCarts().subscribe(
      data => {
        this.carts = data;
      },
      error => {
        console.error('Error loading events', error);
        // Handle error appropriately, show a message to the user, etc.
      }
    );
  }

  setPage(pageNumber: number): void {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = this.carts.slice(startIndex, endIndex);
    this.currentPage = pageNumber;
    console.log('Current Page:', this.currentPage);
    console.log('Paged Events:', this.pagedProducts);
  }

  onPrevPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.setPage(this.currentPage + 1);
    }
  }

  totalPages(): number {
    return Math.ceil(this.carts.length / this.pageSize);
  }



}
