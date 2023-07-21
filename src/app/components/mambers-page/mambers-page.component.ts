import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-mambers-page',
  templateUrl: './mambers-page.component.html',
  styleUrls: ['./mambers-page.component.css']
})
export class MambersPageComponent implements OnInit {
  constructor(private productService:ProductService, private route: ActivatedRoute, private cartService: CartService,private ws:WebSocketService){}
  product: Product = new Product();
  storage:Storage = sessionStorage;
  isShowDiscount = false;
  ngOnInit(): void {
    this.ws.getSocket().addEventListener('message', (event) => {
      this.isShowDiscount = event.data.includes('New discount arrived for '+this.storage.getItem('userEmail'));
        this.route.paramMap.subscribe(() => {
          this.handleDiscount();
      })
      
    });
  }
  handleDiscount(){
    this.productService.getProductwithDiscount().subscribe(
      data => {
        this.product = data;
      }
    )
  }
  addToCart() {

    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    let theCartItem = new CartItem(this.product.id, this.product.name, this.product.imageUrl, this.product.unitPrice);
    
    this.cartService.addToCart(theCartItem);
    
  }

}
