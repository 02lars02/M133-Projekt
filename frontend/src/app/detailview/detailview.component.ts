import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../backend/Product';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.scss']
})
export class DetailviewComponent implements OnInit {
  id: string;
  product: Product;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.getProduct()
    });
  }

  getProduct() {
    this.requestProductById(this.id).subscribe(
      data => {
        this.product = data;
      }, err => {
        console.log(err);
      }
    );
  }

  requestProductById(id: string): Observable<Product> {
    return this.httpClient.get(`/api/product/${id}`).pipe(map(data => this.dataAsProduct(data)));
  }

  dataAsProduct(data: any): Product {
    const product = new Product();
    product.id = data.id;
    product.productName = data.productName;
    product.specialOffer = data.specialOffer;
    product.normalPrice = data.normalPrice;
    product.imageName = data.imageName;
    product.description = data.description;
    return product;
  }

  addToChart() {
    this.httpClient.get(`/api/cart/add/${this.product.id}`).subscribe();
    window.location.reload();
  }
}
