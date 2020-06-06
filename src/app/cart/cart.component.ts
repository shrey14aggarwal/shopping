import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingService } from '../shopping.service';
import { Products } from '../models/product-model';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ProdType, ProdInfo, P } from '../models/prodinfo';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { UserModel } from '../models/user-model';
import { timer } from 'rxjs';
import {MatSort} from '@angular/material/sort';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  message: string;
  products: Products[];
  name: String;
  productName: String[] = [];
  item: String[];
  quantity = 0;
  displayedColumns: string[] = ['i', 'Item', 'Quantity', 'Price', 'Remove', 'Add'];
  Email: String;
  prodTyp: ProdType;
  prodinfo: ProdInfo;
  p: P[];
  price: number;
  userModel: UserModel;
  i: number;
  phone_name: ProdInfo[];
  tablet_name: ProdInfo[];
  laptop_name: ProdInfo[];
  home_appliance: ProdInfo[];
  prods: Products;
  total_price=0;


  constructor(private router: Router,
    private shoppingService: ShoppingService,
    private cookieService: CookieService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIcon(
      `add`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/add_circle-24px.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      `remove`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/remove_circle-24px.svg`)
    );
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.Email = this.cookieService.get('Email');
    this.shoppingService.sharedMessage.subscribe(message => this.message = message)
    this.shoppingService.delete(this.Email).subscribe(data=>{
      console.log(data);
    });
    this.shoppingService.getProducts(this.Email).subscribe(response => this.handleSuccessfulResponse(response))

    this.shoppingService.getprodInfo().subscribe(response => this.handleSuccessfulResponse1(response))

  }
  handleSuccessfulResponse1(response) {


    this.prodinfo = new ProdInfo();
    this.prodTyp = new ProdType();

    this.p = response;
    this.phone_name = this.p[0].products.mobiles;
    this.tablet_name = this.p[0].products.tablets;
    this.laptop_name = this.p[0].products.laptops;

  }
  handleSuccessfulResponse(response) {

    this.products = response;

    for (let i = 0; i < this.products.length; i++) {
      this.name = this.products[i].firstName;
      this.productName[i] = this.products[i]._id;
      this.quantity = this.quantity + this.products[i].quantity;
      this.price = this.products[i].price;
      this.total_price = this.total_price + this.products[i].price;
      console.log(this.total_price);
    }
  }

  onClick() {

    this.router.navigate(['products']);
  }

  dataSource = new MatTableDataSource(this.products);

  async onDelete(i, name) {

    this.products[i].quantity = this.products[i].quantity - 1;

    for (let j = 0; j < this.phone_name.length; j++) {
      if (this.phone_name[j].name == this.products[i]._id) {
        this.products[i].price = this.products[i].price - this.phone_name[j].price;
      }
    }

    for (let j = 0; j < this.tablet_name.length; j++) {
      if (this.tablet_name[j].name == this.products[i]._id) {
        this.products[i].price = this.products[i].price - this.tablet_name[j].price;
        console.log(this.products[i].price)
      }
    }

    for (let j = 0; j < this.laptop_name.length; j++) {
      if (this.laptop_name[j].name == this.products[i]._id) {
        this.products[i].price = this.products[i].price - this.laptop_name[j].price;
        console.log(this.products[i].price)
      }
    }

    this.prods = new Products();
    this.prods.item = <string>this.products[i]._id;
    this.prods.firstName = this.products[i].firstName;

    this.prods.price = this.products[i].price;
    this.prods.quantity = this.products[i].quantity;
    console.log(this.products)
    console.log(this.prods)

    this.shoppingService.updateProd(this.Email, this.prods).subscribe(data => {
      console.log(data);
    });


    await this.delay(300);

    this.shoppingService.addProdInfo(this.Email, this.prods).subscribe(data => {
      console.log("hello")
    });
    window.location.reload();
    

  }

  async onAdd(i, name) {
    this.products[i].quantity = this.products[i].quantity + 1;

    for (let j = 0; j < this.phone_name.length; j++) {
      if (this.phone_name[j].name == this.products[i]._id) {
        this.products[i].price = this.products[i].price + this.phone_name[j].price;
      }
    }

    for (let j = 0; j < this.tablet_name.length; j++) {
      if (this.tablet_name[j].name == this.products[i]._id) {
        this.products[i].price = this.products[i].price + this.tablet_name[j].price;
      }
    }

    for (let j = 0; j < this.laptop_name.length; j++) {
      if (this.laptop_name[j].name == this.products[i]._id) {
        this.products[i].price = this.products[i].price + this.laptop_name[j].price;
      }
    }

    this.prods = new Products();
    this.prods.item = <string>this.products[i]._id;
    this.prods.firstName = this.products[i].firstName;

    this.prods.price = this.products[i].price;
    this.prods.quantity = this.products[i].quantity;
    console.log(this.products)
    console.log(this.prods)

    this.shoppingService.updateProd(this.Email, this.prods).subscribe(data => {
    });

    await this.delay(300);

    this.shoppingService.addProdInfo(this.Email, this.prods).subscribe(data => {
      console.log("hello")
    });
    window.location.reload();

  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onLogout() {
    localStorage.removeItem("token");
    this.router.navigate(['']);
  }


}
