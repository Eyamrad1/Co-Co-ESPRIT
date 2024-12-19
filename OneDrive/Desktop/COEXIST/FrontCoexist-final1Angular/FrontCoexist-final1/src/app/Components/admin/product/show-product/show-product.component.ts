import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../entity/Product";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductService} from "../../../../Services/product.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit{
  products: Product[] = [];
  keyword: string = '';
  currentPage: number = 1;
  pageSize: number = 3; // Number of events per page
  pagedProducts: Product[] = [];
  hide2: boolean= false ;


  constructor(private snackBar: MatSnackBar , private productService: ProductService, private router: Router) {}
  selectedCardIndex: number | null = null;
  ngOnInit(): void {
    this.loadProducts();
  }
  confirmDelete(product: Product): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.deleteProduct(product);
      window.location.reload();
      this.snackBar.open('Product deleted successfully!', 'Close', {
        duration: 10000,
      });
    }
  }
  search(): void {
    if (!this.keyword.trim()) {
      // If the search query is empty, load all events
      this.loadProducts();
      return;
    }
    // Check if the search query matches a date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(this.keyword.trim())) {
      this.searchByDate(this.keyword.trim());
      return;
    }
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


  searchByDate(eventDate: string): void {
    this.productService.searchEventsByDate(eventDate).subscribe(
      (data: Product[]) => {
        this.products = data;
        this.updateImageUrls(); // Update image URLs after getting search results
        this.setPage(1); // Reset to first page after search
      },
      (error) => {
        console.log('Error occurred while searching events by date:', error);
      }
    );
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


  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  protected readonly event = event;

  deleteProduct(product: Product): void {
    if (product && product.idProduct) {
      const idProduct = product.idProduct;

      this.productService.removeProduct(idProduct).subscribe(
        (response: any) => {
          console.log('Product deleted successfully', response);
          this.loadProducts();
          // Reload the page after successful deletion with a timestamp query parameter
          window.location.href = window.location.pathname + '?timestamp=' + new Date().getTime();
        },
        (error: any) => {
          console.error('Error deleting event', error);
          // Log the error details to the console
          if (error instanceof HttpErrorResponse) {
            console.error('Status:', error.status);
            console.error('Response body:', error.error);
          }
          // Handle error appropriately
        }
      );
    }
  }


}
