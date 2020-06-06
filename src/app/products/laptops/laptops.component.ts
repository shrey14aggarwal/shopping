import { Component, OnInit } from '@angular/core';
import { ProdType, ProdInfo, P } from 'src/app/models/prodinfo';
import { Products } from 'src/app/models/product-model';
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer } from '@angular/platform-browser';
import { ShoppingService } from 'src/app/shopping.service';
import { MatDialog } from '@angular/material/dialog';
import { PhoneDescriptionComponent } from '../phone-description/phone-description.component';
import { LaptopDescriptionComponent } from 'src/app/laptop-description/laptop-description.component';

@Component({
  selector: 'app-laptops',
  templateUrl: './laptops.component.html',
  styleUrls: ['./laptops.component.css']
})
export class LaptopsComponent implements OnInit {

  quantity = [1, 2, 3, 4, 5];
  quant: number;
  quant1: number;
  quant3 = 0;
  badge = 0;
  disable = true;
  email: String;
  message: string;
  products: ProdType;
  prodinfo: ProdInfo;
  laptop_name: ProdInfo[];
  p: P[];
  prods: Products;
  Email: String;
  product: Products[];
  price : number[];
  disabled=true;


  constructor(private matIconRegistry: MatIconRegistry,
    private router: Router,
    private cookieService: CookieService,
    private domSanitizer: DomSanitizer,
    private shoppingService: ShoppingService,
    public dialog: MatDialog) {

    this.matIconRegistry.addSvgIcon(
      `cart`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/shopping_cart.svg`)
    );
  }

  ngOnInit() {

    this.shoppingService.sharedMessage.subscribe(message => this.message = message)
    this.Email = this.cookieService.get('Email');
    this.shoppingService.getprodInfo().subscribe(response => this.handleSuccessfulResponse(response))
    this.shoppingService.getProducts(this.Email).subscribe(response => this.handleSuccessfulResponse1(response))


  }
  handleSuccessfulResponse1(response): void {

    this.product = response;
    for (let i = 0; i < this.product.length; i++) {

      this.quant3 = this.quant3 + this.product[i].quantity;
    }
    this.badge = this.quant3;
  }
  handleSuccessfulResponse(response) {
    console.log(response);
    this.products = new ProdType();
    this.prodinfo = new ProdInfo();
    this.p = response;
    this.laptop_name = this.p[0].products.laptops;
  }

  add(name) {
    this.badge = this.badge + this.quant;
    this.prods = new Products();
    this.prods.item = name;
    this.prods.quantity = this.quant;

    for(let i =0; i <  this.p[0].products.laptops.length; i++)
    {
      if(this.p[0].products.laptops[i].name==name)
      {
        this.prods.price=this.p[0].products.laptops[i].price*this.quant;
      }
    }

    this.shoppingService.addProdInfo(this.Email, this.prods).subscribe(data => {

    }
    );
  }

  onClick(event) {
    this.email = event;
  }

  cart() {
    this.router.navigate(['cart']);
  }

  openDialog(name): void {
    console.log(name);
    const dialogRef = this.dialog.open( LaptopDescriptionComponent, {
      data: { name: name },
      width: '550px',
    });
  }

  onProducts(){

    this.router.navigate(['products']);
  }
  enabled(){
    this.disable=false;
  }

}
