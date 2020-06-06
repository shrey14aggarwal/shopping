import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ShoppingService } from 'src/app/shopping.service';
import { ProdType, ProdInfo, P } from 'src/app/models/prodinfo';
import { ThrowStmt } from '@angular/compiler';
import { Products } from 'src/app/models/product-model';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PhoneDescriptionComponent } from '../phone-description/phone-description.component';


@Component({
  selector: 'app-mobiles',
  templateUrl: './mobiles.component.html',
  styleUrls: ['./mobiles.component.css']
})
export class MobilesComponent implements OnInit {

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
  phone_name: ProdInfo[];
  p: P[];
  prods: Products;
  Email: String;
  product: Products[];
  price : number[];


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
    this.phone_name = this.p[0].products.mobiles;
  }

  add(name) {
    this.badge = this.badge + this.quant;
    this.prods = new Products();
    this.prods.item = name;
    this.prods.quantity = this.quant;

    for(let i =0; i <  this.p[0].products.mobiles.length; i++)
    {
      if(this.p[0].products.mobiles[i].name==name)
      {
        this.prods.price=this.p[0].products.mobiles[i].price*this.quant;
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

  openDialog(name: String): void {
    const dialogRef = this.dialog.open( PhoneDescriptionComponent, {
      data: { name: name },
      width: '550px',
    });
  }

  onProducts(){

    this.router.navigate(['products']);
  }

}
