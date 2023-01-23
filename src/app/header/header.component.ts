import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public totalitem=0;
constructor(private cart:CartService){
 this.cart.getProduct().subscribe((res)=>{
  this.totalitem=res.length
 })
}
ngOnInit():void{
   let cartdata=localStorage.getItem('localcart')
   if(cartdata){
    this.totalitem=JSON.parse(cartdata).length
   }
   this.cart.cartData.subscribe((items)=>{
   this.totalitem=items.length  
   })
}
}
