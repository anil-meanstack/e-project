import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { cart, order, product } from './data-type';



function _window(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartdata: any;
  get nativeWindow(): any {
    return _window();
  }

  public productlist = new BehaviorSubject<any>([]);
  // public cartitemlist: any = [];
  public cartData = new EventEmitter<product[] | []>();

  constructor(private http: HttpClient) { }
  // get
  getProduct() {
    return this.productlist.asObservable()
  }

  // //store localstorage

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
  addtocart(cartData: cart) {
    return this.http.post("http://localhost:3000/cart", cartData)
  }

  getcartList(userId: number) {
    return this.http.get<product[]>("http://localhost:3000/cart?userId=" + userId, { observe: 'response' }).subscribe((res) => {
      if (res && res.body) {
        this.cartData.emit(res.body);
      }
    })
  }
  removeTocart(cartId: number) {
    return this.http.delete("http://localhost:3000/cart/" + cartId)
  }
  currentcart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>("http://localhost:3000/cart?userId=" + userData.id)
  }
  ordersNow(data: any) {
    return this.http.post("http://localhost:3000/orders", data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>("http://localhost:3000/orders?userId=" + userData.id);
  }
  deleteItemscart(cartId: number) {
    return this.http.delete("http://localhost:3000/cart/" + cartId, { observe: "response" }).subscribe((result) => {
      if (result) {
        this.cartData.emit([])
      }
    })
  }
  cancelOeder(orderId:number){
   return this.http.delete("http://localhost:3000/orders/"+orderId)
  }
}
