import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  rzp1: any;
  data!: any;
  // public getTotalPrice: number | undefined;
  productData: any;
  cart: any;
 
  constructor(private service: CartService,private _router:Router) {

  }
  ngOnInit(): void {
   
    this.data = new FormGroup({
      email: new FormControl,
      number: new FormControl,
      address: new FormControl,
      pinCode: new FormControl
    })
 
  }

  dataSubmit() {
    if(this.data.valid){
      this.service.orders(this.data.value).subscribe((result)=>{
        if(result){
          alert("your Order placed")
         this._router.navigateByUrl("/my-order")
        }
   })
  }
  }
  //  token="rzp_test_7HdkaZ1xFGPomB"
  options = {
    "key": "rzp_test_7HdkaZ1xFGPomB",
    "amount": "100",
    "currency": "INR",
    "name": "Acme Corp",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "",
    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "prefill": {
      "name": "Gaurav Kumar",
      "email": "gaurav.kumar@example.com",
      "contact": "9999999999"
    },
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "#3399cc"
    }
  };

  pey() {
    this.rzp1 = new this.service.nativeWindow.Razorpay(this.options);
    this.rzp1.open();
  }

}
