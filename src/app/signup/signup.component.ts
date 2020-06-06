import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ShoppingService } from '../shopping.service';
import { UserModel } from '../models/user-model';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm: any;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userModel: UserModel;

  constructor(private formBuilder: FormBuilder,

    private shoppingService: ShoppingService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private snackBar : MatSnackBar,
    public dialogRef: MatDialogRef<SignupComponent>) {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required]],
    });

    this.matIconRegistry.addSvgIcon(
      `close`,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/cancel-24px.svg`)
    );
  }

  ngOnInit() {
  }

  enter() {

    this.userModel = new UserModel();
    this.userModel.firstName = this.firstName;
    this.userModel.lastName = this.lastName;
    this.userModel.email = this.email;
    this.userModel.password = this.password;

    this.shoppingService.saveUser(this.userModel).subscribe(data => {

    }
    );

    this.snackBar.open("User created successfully", '', { duration: 2000 }
    );
    this.dialogRef.close();


  }

  onClose() {
    this.dialogRef.close();
  }

}
