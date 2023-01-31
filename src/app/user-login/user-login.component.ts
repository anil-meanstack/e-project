import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { cart, product } from '../data-type';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  data!: FormGroup;
  authError: string = "";
  constructor(private _router: Router, private service: DataService, private cart: CartService) {

  }
  ngOnInit(): void {
    this.data = new FormGroup({
      email: new FormControl,
      password: new FormControl
    })
    this.service.userAuthReload();
  }
  get input(): { [key: string]: AbstractControl } {
    return this.data.controls
  }
  login() {
    this.service.userLogin(this.data.value);
    this.service.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = "Please enter valid user detalis"
      } else {

        this.localCartRemoteCart();
        this._router.navigateByUrl("")
      }
    })
  }

  localCartRemoteCart() {
    let data = localStorage.getItem('localcart')
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          userId,
          productId: product.id,
          total: 0
        }
        delete cartData.id;
        setTimeout(() => {
          this.cart.addtocart(cartData).subscribe((result) => {
            if (result) {
              console.log("Item stored in db")
            }
          })
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localcart')
          }
        }, 500);
      })
    }
    setTimeout(() => {
      this.cart.getcartList(userId)
    }, 2000)

  }
}
