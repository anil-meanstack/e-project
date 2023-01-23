import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  productData: any;
  
  constructor(private service: DataService, private _router: Router, private cart: CartService) {

  }
  ngOnInit(): void {
    this.service.productGet().subscribe((res) => {
      this.productData = res;


      this.productData.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price })
      });
    })
  }
  viewDetails(id: any) {
    this._router.navigateByUrl("/product-view/" + id)

  }

}
