import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ShoppingService } from '../shopping.service';
import { CookieService } from 'ngx-cookie-service';
import { Products } from '../models/product-model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  Email: String;
  product : Products[];
  badge=0;
  quant3=0;

  constructor( private router : Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private shoppingService: ShoppingService,
    private cookieService: CookieService) {

      this.matIconRegistry.addSvgIcon(
        `cart`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/shopping_cart.svg`)
      );
     }

  ngOnInit() {
    this.Email = this.cookieService.get('Email');
    this.shoppingService.getProducts(this.Email).subscribe(response => this.handleSuccessfulResponse1(response))
  }
  handleSuccessfulResponse1(response) {
    this.product = response;
    for (let i = 0; i < this.product.length; i++) {

      this.quant3 = this.quant3 + this.product[i].quantity;
    }
    this.badge = this.quant3;
  }

  mobile(){
   this.router.navigate(['mobiles']);
  }

  laptop(){
    this.router.navigate(['laptops']);
  }

  smart(){
    this.router.navigate(['smart']);
  }

  tablet(){
    this.router.navigate(['tablets']);
  }

  cart() {
    this.router.navigate(['cart']);
  }

  logout(){

    localStorage.removeItem("token");
    this.router.navigate(['']);
  }
}
