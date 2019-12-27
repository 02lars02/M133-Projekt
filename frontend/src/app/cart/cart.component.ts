import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../../../../backend/Cart';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Cart;

  constructor(private httpClient: HttpClient) { }

  async ngOnInit() {
    this.cart = new Cart();
    this.cart = await this.getCart();
  }

  async getCart() {
    return this.httpClient.get('/api/cart').pipe(map(this.dataToCart)).toPromise();
  }

  private dataToCart(data: any): Cart {
    let cart = new Cart()
    data.products.forEach(product => {
      cart.add(product);
    });
    return cart;
  }

  add(id) {
    this.httpClient.get(`/api/cart/add/${id}`).subscribe();
    window.location.reload();
  }

  remove(id) {
    this.httpClient.get(`/api/cart/remove/${id}`).subscribe();
    window.location.reload();
  }
}
