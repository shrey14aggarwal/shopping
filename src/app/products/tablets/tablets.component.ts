import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ShoppingService } from 'src/app/shopping.service';
import { Products } from 'src/app/models/product-model';
import { ProdType, ProdInfo, P } from 'src/app/models/prodinfo';
import { PhoneDescriptionComponent } from '../phone-description/phone-description.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { TabletDescriptionComponent } from 'src/app/tablet-description/tablet-description.component';

@Component({
  selector: 'app-tablets',
  templateUrl: './tablets.component.html',
  styleUrls: ['./tablets.component.css']
})
export class TabletsComponent implements OnInit {

  Email : String;
  quantity = [1, 2, 3, 4, 5];
  product: Products[];
  quant3 = 0;
  badge = 0;
  products: ProdType;
  prodinfo: ProdInfo;
  p: P[];
  tablet_name: ProdInfo[];
  prods: Products;
  quant : number;


  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private cookieService: CookieService,
    private shoppingService: ShoppingService,
    private router: Router,
    private dialog : MatDialog
  ) {

    this.matIconRegistry.addSvgIcon(
      `cart`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/shopping_cart.svg`)
    );
   }

  ngOnInit() {

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
    this.tablet_name = this.p[0].products.tablets;
  }

  add(name) {
    this.badge = this.badge + this.quant;
    this.prods = new Products();
    this.prods.item = name;
    this.prods.quantity = this.quant;

    for(let i =0; i <  this.p[0].products.tablets.length; i++)
    {
      if(this.p[0].products.tablets[i].name==name)
      {
        this.prods.price=this.p[0].products.tablets[i].price*this.quant;
      }
    }

    this.shoppingService.addProdInfo(this.Email, this.prods).subscribe(data => {

    }
    );
  }

  

  cart() {
    this.router.navigate(['cart']);
  }

  openDialog(name): void {
    console.log(name)
    const dialogRef = this.dialog.open( TabletDescriptionComponent, {
      data: { name: name },
  
      width: '550px',
    });
  }

  onProducts(){

    this.router.navigate(['products']);
  }

}
