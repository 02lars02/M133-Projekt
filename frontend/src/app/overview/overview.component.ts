import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../../backend/Product';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  products: Product[];

  constructor(private httpClient: HttpClient){
  }

  ngOnInit() {
    this.getProducts().subscribe(products => this.products = products);
  }

  private getProducts(): Observable<Product[]> {
    return this.httpClient.get('/api/products').pipe(map(data => {
      const products: Product[] = [];
      (data as any[]).forEach(line => {
        products.push(this.dataToProduct(line));
      })
      return products;
    }));
  }

  private dataToProduct(data: any): Product {
    const product = new Product();
    product.id = data.id;
    product.productName = data.productName;
    product.specialOffer = data.specialOffer;
    product.normalPrice = data.normalPrice;
    product.imageName = data.imageName;
    product.description = data.description;
    return product;
  }
}
