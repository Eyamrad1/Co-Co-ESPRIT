import {Component, OnInit} from '@angular/core';
import {WishlistService} from "../../Services/wishlist.service";
import {HttpClient} from "@angular/common/http";
import {ProductWishlist} from "../../entity/productWhishlist";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {



  wishlistCount: number = 0;
  wishlistItems: any[] = [];
  totalSelectedPrice: number = 0;
  selectedQuantity: number = 1;
  constructor(private wishlistService: WishlistService, private http: HttpClient) { }


  ngOnInit(): void {
    this.updateWishlistData();
    // Refresh wishlist data every second
    setInterval(() => {
      this.updateWishlistData();
    }, 1000);
  }
  removeFromWishlist(item: ProductWishlist): void {
    this.wishlistService.removeFromWishlist(item);
  }


  updateWishlistData(): void {
    this.wishlistItems = this.wishlistService.getWishlist();
    this.calculateTotalSelectedPrice();
    this.wishlistCount = this.wishlistItems.length;
  }

  calculateTotalSelectedPrice(): void {
    this.totalSelectedPrice = this.wishlistItems.reduce((total, item) => total + item.price, 0);
  }

  pay() {

    let data:any= {

      "receiverWalletId": "660b6cffa9904097c9e486d1",
      "token": "TND",
      "amount": this.totalSelectedPrice*1000,
      "type": "immediate",
      "description": "payment description",
      "acceptedPaymentMethods": [
        "wallet",
        "bank_card",
        "e-DINAR"
      ],
      "lifespan": 10,
      "checkoutForm": true,
      "addPaymentFeesToAmount": true,
      "firstName": "John",
      "lastName": "Doe",
      "phoneNumber": "22777777",
      "email": "john.doe@gmail.com",
      "orderId": "1234657",
      "webhook": "https://merchant.tech/api/notification_payment",
      "silentWebhook": true,
      "successUrl": "http://localhost:4200/PayementSuccess",
      "failUrl": "https://dev.konnect.network/gateway/payment-failure",
      "theme": "light"
    }
    //http post link https://api.preprod.konnect.network/api/v2/payments/init-payment with header x-api-key header and data body
    this.http.post('https://api.preprod.konnect.network/api/v2/payments/init-payment', data, {
      headers: {
        'x-api-key': '660b6cffa9904097c9e486cd:jWu2qTo3pthZpMvkDgg'

      }
    }).subscribe((response) => {
      console.log(response);
      //redirect to the payment page from response the link is in response is payUrl external

      window.location.href = response['payUrl'];
    });
  }


}
