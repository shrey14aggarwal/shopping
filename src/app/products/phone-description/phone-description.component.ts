import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
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
  selector: 'app-phone-description',
  templateUrl: './phone-description.component.html',
  styleUrls: ['./phone-description.component.css']
})


export class PhoneDescriptionComponent implements OnInit {

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



  iphonex: description = {

    network: "GSM/HSPA/LTE",
    dimension: '143.6 x 70.9 x 7.7 mm (5.65 x 2.79 x 0.30 in)',
    weight: "174 g (6.14 oz)",
    display: "Super Retina OLED capacitive touchscreen, 16M colors",
    os: "iOS 11.1.1, upgradable to iOS 13.4",
    memory: "Internal : 64GB 3GB RAM, 256GB 3GB RAM, External : No",
    camera: " Main : 12 MP, f/1.8, 28mm (wide), 1/3, 1.22µm, dual pixel PDAF, OIS 12 MP, f/2.4, 52mm (telephoto), 1/3.4, 1.0µm, PDAF, OIS, 2x optical zoom"
  }

  iphoneSE: description = {

    network: "GSM / CDMA / HSPA / EVDO / LTE", 
    dimension: '123.8 x 58.6 x 7.6 mm (4.87 x 2.31 x 0.30 in)',
    weight: "113 g (3.99 oz)",
    display: "IPS LCD capacitive touchscreen, 16M colors",
    os: "iOS 9.3.2, upgradable to iOS 13.4",
    memory: "16GB 2GB RAM, 32GB 2GB RAM, 64GB 2GB RAM, 128GB 2GB RAM",
    camera: "12 MP, f/2.2, 29mm (standard), 1/3, 1.22µm, PDAF"

  }

  onClose() {
    this.dialogRef.close();
  }

}
