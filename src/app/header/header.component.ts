import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userName: string = "";
  menuType: string = 'default';
  cartItems = 0;

  constructor(private cart: CartService, private route: Router) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      console.log("header conosle.log", val)
      if (localStorage.getItem('user')) {
        let userStore = localStorage.getItem('user');
        let userData = userStore && JSON.parse(userStore);
        this.userName = userData.name;
        this.menuType = 'user';
        this.cart.getcartList(userData.id)
      } else {
        this.menuType = "default";
      };
      let cartdata = localStorage.getItem('localCart');
      if (cartdata) {
        this.cartItems = JSON.parse(cartdata).length
      }
      this.cart.cartData.subscribe((items): void => {
        this.cartItems = items.length
      })
    })
  }
  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/login'])
  }
}

