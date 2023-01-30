import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { cart, order } from '../data-type';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  // rzp1: any;
  data!: any;
  grandTotal = 0;
  cartData: cart[] | undefined;
  orderMsg:string|undefined
 

  constructor(private service: CartService, private _router: Router) {

  }
  ngOnInit(): void {

    this.data = new FormGroup({
      email: new FormControl,
      number: new FormControl,
      address: new FormControl,
      pinCode: new FormControl
    })
    this.service.currentcart().subscribe((res) => {
      this.cartData = res;

      res.map((item: any) => {
        this.grandTotal += item.total
      });
    })
  }

  dataSubmit(data: { email: string, number: string, address: string, pinCode: string, pincode: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.grandTotal) {
      let oderData: order = {
        ...data,
        totalPrice: this.grandTotal,
        userId,
        id: undefined,
      }
      this.cartData?.forEach((item:any) => {
        setTimeout(() => {
          item.id && this.service.deleteItemscart(item.id);
        }, 700)
      })
      this.service.ordersNow(oderData).subscribe((result) => {
        if (result) {
          this.orderMsg="Your order has been placed"
         setTimeout(()=>{
          this._router.navigateByUrl("/my-order")
          this.orderMsg=undefined
         },2000)
        }
      })

    }

  }
  // getTotalPrice(): number {
  //   let totalPrice = 0;
  //   this.productData.map((a: any) => {
  //     totalPrice += a.total;
  //   })
  //   return totalPrice;
  // }
  //  token="rzp_test_7HdkaZ1xFGPomB"
  // options = {
  //   "key": "rzp_test_7HdkaZ1xFGPomB",
  //   "amount": "100",
  //   "currency": "INR",
  //   "name": "Acme Corp",
  //   "description": "Test Transaction",
  //   "image": "https://example.com/your_logo",
  //   "order_id": "",
  //   "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
  //   "prefill": {
  //     "name": "Gaurav Kumar",
  //     "email": "gaurav.kumar@example.com",
  //     "contact": "9999999999"
  //   },
  //   "notes": {
  //     "address": "Razorpay Corporate Office"
  //   },
  //   "theme": {
  //     "color": "#3399cc"
  //   }
  // };

  // pey() {
  //   // this.rzp1 = new this.service.nativeWindow.Razorpay(this.options);
  //   // this.rzp1.open();
  // }

}
function id(id: any) {
  throw new Error('Function not implemented.');
}

