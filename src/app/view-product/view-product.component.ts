import { JsonpClientBackend } from '@angular/common/http';
import { Component } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent {
  product: any;
  productQuantity: number = 1;
  public grandTotal: any;
  removeCart = false;
  constructor(private service: DataService, private route: ActivatedRoute, private cart: CartService) {

  }
  ngOnInit(): void {
    let id: any = this.route.snapshot.url[1].path;
    id && this.service.viewProduct(id).subscribe((res) => {
      this.product = res

      let cartData = localStorage.getItem('localcart')
      if (id && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: any) => id == item.id.toString());
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }
    })
  }
  handleQuantity(val: string,product:any) {
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
      if (localStorage.getItem('user')) {
        this.cart.localAddToCart(this.product)
         this.removeCart = true;
      }
    }
  
  }
  removetocart(id: any) {
   this.cart.removeItemFromCart(id)
   this.removeCart = false;
  }
}
