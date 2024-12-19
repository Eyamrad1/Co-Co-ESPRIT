import {Component, ViewChild} from '@angular/core';
import {DatePipe} from "@angular/common";
import {Product} from "../../../../entity/Product";
import {NgForm} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductService} from "../../../../Services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [DatePipe]  // Provide DatePipe here
})
export class AddProductComponent {
  product: Product = new Product();
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  @ViewChild('productForm') productForm!: NgForm;

  constructor(private snackBar: MatSnackBar,private productService: ProductService, private router: Router, private datePipe: DatePipe) {}

  addProduct(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('productName', this.product.productName);
      formData.append('description', this.product.description);
      if (this.product.Date) {
        const formattedDate = this.datePipe.transform(this.product.Date, 'yyyy-MM-dd\'T\'HH:mm:ss');
        if (formattedDate) {
          formData.append('Date', formattedDate);
        }
      }
      if (this.product.price) {
        formData.append('price', this.product.price.toString()); // Assuming this.product.price is a number
      }

      if (this.product.type) {
        formData.append('type', this.product.type.toString()); // Assuming typeProduit is an enum
      }

      if (this.product.stock > 0 ) {
        formData.append('stock', this.product.stock.toString()); // Assuming typeProduit is an enum
      }



      if (this.selectedFile) {
        formData.append('image', this.selectedFile); // Make sure 'image' matches the backend's expected part name
      }

      this.productService.addProduit(formData)
        .subscribe(
          response => {
            console.log('Product added successfully', response);
            this.router.navigate(['admin/show']);
            // Display success toast notification
            this.snackBar.open('Product added successfully!', 'Close', {
              duration: 7000,
            });
          },
          error => {
            console.error('Error adding event', error);

          }
        );

    } else {
      console.error('The form is not valid.');
    }
  }



  // Gérer la sélection de fichier pour l'image
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}

