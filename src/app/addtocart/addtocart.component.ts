import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { priceSummary } from '../data-type';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent {
  id: any;
  public productData!: any;
  cartData: any;
  productQuantity: number = 1;
  public grandTotal: any;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private cart: CartService) {

  }
  ngOnInit(): void {

    this.cartData = this.cart.getcartData()
    this.productData = JSON.parse(this.cartData)
    this.getTotalPrice()
    this.removeItem(this.id)
  }

  removeItem(id: any) {
    this.cart.removeItemFromCart(id)
  }
  empty() {
    localStorage.clear()

  }
  handleQuantity(val: string, item: any) {
    if (item.quantity < 20 && val === "plus") {
      item.quantity += 1;
      item.total = item.price * item.quantity
      this.getTotalPrice()
    } else if (item.quantity > 1 && val === "min") {
      item.quantity -= 1;
      item.total = item.price * item.quantity
      this.getTotalPrice()
    }
  }
  // getTotalPrice(): number {
  //   let grandTotal = 0;
  //   this.productData.map((a: any) => {
  //     grandTotal += a.total;
  //   })
  //   return grandTotal;
  // }
  getTotalPrice():number{
    let grandTotal=0
    this.productData.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
}



