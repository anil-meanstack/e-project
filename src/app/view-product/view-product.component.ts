import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { cart, product } from '../data-type';
import { DataService } from '../data.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']                                       
})
export class ViewProductComponent {
  product: any;
  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined | any;
  constructor(private service: DataService, private route: ActivatedRoute, private cart: CartService) {
  }
  ngOnInit(): void {
    let productId: any = this.route.snapshot.url[1].path;
    productId && this.service.viewProduct(productId).subscribe((res) => {
      this.product = res
      let cartData = localStorage.getItem('localcart')
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: any) => productId == item.id.toString());
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('user')
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.cart.getcartList(userId);
        this.cart.cartData.subscribe((result) => {
          let item = result.filter((item: product) => productId?.toString() === item.productId?.toString())
          if (item.length) {
            this.cartData = item[0]
            this.removeCart = true;
          }
        })
      }
    })
  }
  handleQuantity(val: string, product: any) {
    if (this.productQuantity < 20 && val === "plus") {
      this.productQuantity += 1;
      product.total = product.price * product.quantity

    } else if (this.productQuantity > 1 && val === "min") {
      this.productQuantity -= 1;
      product.total = product.price * product.quantity
    }
  }
  addtocart() {
    if (this.product) {
      this.product.quantity = this.productQuantity;
      this.product.total = this.product.price * this.product.quantity
      if (!localStorage.getItem('user')) {
        this.cart.localAddToCart(this.product)
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id

        let cartData: cart = {
          ...this.product,
          userId,
          productId: this.product.id,
        }
        delete cartData.id;
        this.cart.addtocart(cartData).subscribe((result) => {
          if (result) {
            this.cart.getcartList(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }
  removetocart(id: any) {
    if (!localStorage.getItem('user')) {
      this.cart.removeItemFromCart(id)
      this.removeCart = false;
    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;

      this.cartData && this.cart.removeTocart(this.cartData.id).subscribe((result) => {
        if (result) {
          this.cart.getcartList(userId)
        }
      })
      this.removeCart = false;
    }
  }
}
