import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { product } from '../data-type';


@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent {
  productData: any;
  productQuantity: number = 1;
  grandTotal = 0; 
  Quantity = 0;
  cartData: product | undefined | any;
  removeCart = false;


  constructor(private cart: CartService) { }
  ngOnInit(): void {
    this.cart.currentcart().subscribe((res) => {
      this.productData = res
      this.productData.map((item: any) => {
        this.grandTotal += item.total
        this.Quantity += item.quantity
      });
    })
  }

  removeToCart(cartId: number | undefined) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    cartId && this.cart.removeTocart(cartId).subscribe((result) => {
      if (result) {
        this.cart.getcartList(userId)
      }
      this.removeCart = false
    })
  }


}



