import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent {
  orderData: order[] | undefined;

  constructor(private service: CartService) { }

  ngOnInit(): void {
    this.getOrderList();
  }
  cancelOrder(orderId: number | undefined) {
    orderId && this.service.cancelOeder(orderId).subscribe((result) => { 
      this.getOrderList();
    })
  }
  getOrderList() {
    this.service.orderList().subscribe((res) => {
      this.orderData = res
    })
  }
}
