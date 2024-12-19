import {ChangeDetectorRef, Component} from '@angular/core';
import {Product} from "../../entity/Product";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../Services/product.service";
import {CartService} from "../../Services/cart.service";
import {catchError, EMPTY} from "rxjs";
import {WishlistService} from "../../Services/wishlist.service";
import {ProductWishlist} from "../../entity/productWhishlist";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  products: Product[] = [];
  keyword: string = '';
  currentPage: number = 1;
  pageSize: number = 3; // Number of events per page
  pagedProducts: Product[] = [];
  hide2: boolean= false ;
  selectedQuantity: number = 1;
  userId:number


  constructor(private productService: ProductService, private router: Router, private cartService: CartService,
              private cdRef: ChangeDetectorRef,private ws:WishlistService ) {}
  selectedCardIndex: number | null = null;
  ngOnInit(): void {
    this.loadProducts();
  }
  search(): void {
    if (!this.keyword.trim()) {
      // If the search query is empty, load all events
      this.loadProducts();
      return;
    }
    // Check if the search query matches a date format

    // Check if the search query starts with a special character '@' to indicate location

    // Otherwise, search by description
    this.searchByDescription(this.keyword.trim());

    // Here you can call the searchEvents method
    this.productService.searchProducts(this.keyword).subscribe(
      (products1: Product[]) => {
        this.products = products1;

      },
      (error) => {
        console.log('Error occurred while searching events:', error);
      }
    );
  }



  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.setPage(1); // Initial page load
      },
      (error) => {
        console.error('Error loading events', error);
      }
    );
  }

  setPage(pageNumber: number): void {
    const startIndex = (pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = this.products.slice(startIndex, endIndex);
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
    return Math.ceil(this.products.length / this.pageSize);
  }




  searchByDescription(eventDescription: string): void {
    this.productService.searchEventsByDescription(eventDescription).subscribe(
      (data: Product[]) => {
        this.products = data;
        this.updateImageUrls(); // Update image URLs after getting search results
        this.setPage(1); // Reset to first page after search
      },
      (error) => {
        console.log('Error occurred while searching events by description:', error);
      }
    );
  }


  updateImageUrls(): void {
    const baseUrl = 'http://localhost:8000/images/'; // Adjust the base URL as needed
    this.products.forEach(product => {
      product.img = baseUrl + product.img; // Update image URL with full URL
    });
  }


  hideShow2(index: number) {
    if (this.selectedCardIndex === index) {
      // If the selected card index matches the provided index, toggle hide2
      this.hide2 = !this.hide2;
    } else {
      // If the selected card index doesn't match, set it to the provided index
      this.selectedCardIndex = index;
      this.hide2 = true; // Show the card
    }
  }


  addToWishlist(product: ProductWishlist): void {
    this.ws.addToWishlist(product);
  }
  addToCart(productId: number, quantity: number) {
    this.cartService.addToCart(this.userId,productId, quantity).subscribe(
      response => {
        console.log('Product added to cart:', response);

        const userId = localStorage.getItem('user_id');

        if (userId) {
          this.cartService.getCartItemsCount(+userId).subscribe(
            (count: number) => {
              alert("Product added to cart.");
              this.cartService.updateCartItemCount(count);
              this.cdRef.detectChanges();
              window.location.reload();
            },
            (error: any) => {
              console.error('Error fetching cart count:', error);
            }
          );
        }
      },
      (error: any) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }

}
