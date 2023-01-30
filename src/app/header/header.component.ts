import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  cartItems = 0;

  constructor(private cart: CartService) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      this.cart.getcartList(userData.id)
    };

    let cartdata = localStorage.getItem('localCart');
    if (cartdata) {
      this.cartItems = JSON.parse(cartdata).length
    }
    this.cart.cartData.subscribe((items): void => {
      this.cartItems = items.length
    })
  }
}


