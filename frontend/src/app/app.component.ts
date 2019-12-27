import { Component } from '@angular/core';
import { Cart } from '../../../backend/Cart';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cart: Cart;
  title = 'dorfladen';

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
}
