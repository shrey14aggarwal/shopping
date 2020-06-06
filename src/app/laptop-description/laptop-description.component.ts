import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhoneDescriptionComponent } from '../products/phone-description/phone-description.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export interface description {
  network: string;
  display: string;
  os: string;
  memory: string;
  processor: string;
}

@Component({
  selector: 'app-laptop-description',
  templateUrl: './laptop-description.component.html',
  styleUrls: ['./laptop-description.component.css']
})
export class LaptopDescriptionComponent implements OnInit {

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

  lenovoT440: description = {

    network: "ThinkPad 11b/g/n, 2x2, Wi-Fi + Bluetooth combo adapter, M.2 Card",
    display: '14.0" HD TN (1366 x 768), Multi-touch technology',
    os: "Windows 8/8.1 Professional ( 64-bit)",
    memory: "320GB/5400rpm, 7mm high, SATA HDD",
    processor: "4th Gen Intel® Core™ i3-4010U (Up to 1.70 GHz, 3MB, L3, 1600 MHz FSB)"
  }

  MacBookAir: description = {

    network: "Wi-Fi : 802.11ac Wi-Fi wireless networking, IEEE 802.11a/b/g/n compatible, Bluetooth : Bluetooth 5.0 wireless technology",
    display: '13.3-inch (diagonal) LED-backlit display with IPS technology; 2560-by-1600 native resolution at 227 pixels per inch with support for millions of colors',
    os: "macOS",
    memory: "8GB (2,133MHz LPDDR3)",
    processor: "1.6GHz Intel Core i5-8210Y (dual-core, 4 threads, 4MB cache, up to 3.6GHz)"
  }

  onClose() {
    this.dialogRef.close();
  }


}
