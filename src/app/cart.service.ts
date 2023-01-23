import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';



function _window(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  get nativeWindow(): any {
    return _window();
  }

  public productlist = new BehaviorSubject<any>([]);
  // public cartitemlist: any = [];
  cartData = new EventEmitter<any[] | []>();
  constructor(private http: HttpClient) { }
  // get
  getProduct() {
    return this.productlist.asObservable()
  }
  // add to cart
  // addtocart(product: any) {
  //   this.cartitemlist.push(product);
  //   this.productlist.next(this.cartitemlist)


  //   console.log("addd too carttttt")
  // }
  //  remove item api
  // removecartitem(product: any) {
  //   this.cartitemlist.map((a: any, index: any) => {
  //     if (product.id === a.id) {
  //       this.cartitemlist.splice(index, 1)
  //     }
  //   })
  //   this.productlist.next(this.cartitemlist)
  // }

  // empty or delete api
  // removeallcart() {
  //   this.cartitemlist = [];
  //   this.productlist.next(this.cartitemlist)
  // }


  //store localstorage

  localAddToCart(data: any) {
    let cartData = [];
    let localcart = localStorage.getItem('localcart')
    if (!localcart) {
      localStorage.setItem('localcart', JSON.stringify([data]))
    } else {
      cartData = JSON.parse(localcart);
      cartData.push(data);
      localStorage.setItem('localcart', JSON.stringify(cartData))
    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(id: any) {
    let cartdata = localStorage.getItem('localcart')
    if (cartdata) {
      let items: any[] = JSON.parse(cartdata);
      items = items.filter((item: any) => id !== item.id)
      localStorage.setItem('localcart', JSON.stringify(items))
      this.cartData.emit(items);
    }
  }

  getcartData() {
    let cartdata = localStorage.getItem('localcart')
    return cartdata;
  }
  orders(data:any):Observable<any>{
    return this.http.post("http://localhost:3000/orders", data);
  }
}
