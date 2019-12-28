import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.httpClient.get('/api/cart/removeAll').subscribe();
    this.router.navigate(['']);
  }

}
