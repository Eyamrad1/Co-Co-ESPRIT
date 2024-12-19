import {Component, ViewChild} from '@angular/core';
import {Product} from "../entity/Product";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../Services/product.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {

  product: Product = new Product();
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  @ViewChild('productForm') productForm!: NgForm;
  productId!: number;
  productData: FormData = new FormData();



  constructor(private router: Router,private route: ActivatedRoute, private http: HttpClient, private productService: ProductService, private datePipe: DatePipe) {}

  ngOnInit() {
    // Retrieve eventId from route parameters
    this.route.params.subscribe(params => {
      const eventId = params['id'];
      // Fetch event details using eventId
      this.productService.getProductId(eventId).subscribe(response => {
        this.product = response;
      }, error => {
        console.error('Error fetching event details', error);
        // Handle error appropriately
      });
    });
  }
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
  confirmUpdate(): void {
    if (confirm("Are you sure you want to update this product?")) {
      this.updateProduct();
    }
  }


  updateProduct() {
    // Check if event and eventId are defined
    if (this.product && this.product.idProduct) {
      // Check if eventDate is defined
      if (this.product.Date) {
        // Ensure that eventDate is a string
        const productDateStr: string = typeof this.product.Date === 'string' ? this.product.Date : '';

        // Format eventDate to match the server-side format
        this.product.Date = this.datePipe.transform(new Date(productDateStr), 'yyyy-MM-ddTHH:mm:ss') || '';
      }

      this.productService.updateProducts(this.product, this.product.idProduct)
        .subscribe(response => {
          console.log('Product updated successfully', response);
          this.router.navigate(['admin/show']);
        }, error => {
          console.error('Error updating event', error);
          // Handle error appropriately
        });
    }
  }

}
