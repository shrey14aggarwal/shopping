import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhoneDescriptionComponent } from '../products/phone-description/phone-description.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


export interface description {
  network: string;
  dimension: string;
  weight: string;
  display: string;
  os: string;
  memory: string;
  camera: string;
}

@Component({
  selector: 'app-tablet-description',
  templateUrl: './tablet-description.component.html',
  styleUrls: ['./tablet-description.component.css']
})


export class TabletDescriptionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PhoneDescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, ) {
    this.matIconRegistry.addSvgIcon(
      `close`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/cancel-24px.svg`)
    );
  }

  ngOnInit() {
  }



  galaxyTab10: description = {

    network: "No cellular connectivity",
    dimension: '256.7 x 175.3 x 8.6 mm (10.11 x 6.90 x 0.34 in)',
    weight: "560 g (1.23 lb)",
    display: "PLS TFT capacitive touchscreen, 16M colors, Size : 10.1 inches, 295.8 cm2 (~65.7% screen-to-body ratio), Resolution	: 800 x 1280 pixels, 16:10 ratio (~149 ppi density), Protection :	Corning Gorilla Glasss",
    os: "Android 3.0 (Honeycomb), upgradable to 4.0 (Ice Cream Sandwich); TouchWiz UX UI",
    memory: "Internal : 16GB 1GB RAM, 32GB 1GB RAM, 64GB 1GB RAM, External : No",
    camera: " Main : 3.15 MP, AF, Selfie : 2MP"
  }

  ipadMini: description = {
    
    network: "GSM / HSPA / LTE", 
    dimension: '203.2 x 134.8 x 6.1 mm (8.0 x 5.31 x 0.24 in)',
    weight: "300.5 g (Wi-Fi) / 308.2 g (3G/LTE) (10.86 oz)",
    display: "IPS LCD capacitive touchscreen, 16M colors, Size : 7.9 inches, 193.3 cm2 (~70.6% screen-to-body ratio)",
    os: "iOS 12.1.3, upgradable to iPadOS 13.4",
    memory: "64GB 3GB RAM, 256GB 3GB RAM, External : No",
    camera: "8 MP, f/2.4, 32mm (standard), 1.12µm, AF, Selfie : 7 MP, f/2.2, 31mm (standard)"

  }

  ipadAir: description = {

    network: "GSM / HSPA / LTE", 
    dimension: '250.6 x 174.1 x 6.1 mm (9.87 x 6.85 x 0.24 in)',
    weight: "456 g (Wi-Fi) / 464 g (3G/LTE) (1.01 lb)",
    display: "IPS LCD capacitive touchscreen, 16M colors, Size : 10.5 inches, 341.4 cm2 (~78.3% screen-to-body ratio)",
    os: "iOS 12.1.3, upgradable to iPadOS 13.4",
    memory: "64GB 3GB RAM, 256GB 3GB RAM, External : No",
    camera: "8 MP, f/2.4, 31mm (standard), 1.12µm, AF, Selfie : 7 MP, f/2.2, 31mm (standard)"
  }

  onClose() {
    this.dialogRef.close();
  }

}
