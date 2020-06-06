import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ShoppingService } from '../shopping.service';
import { LoginUser } from '../models/login-user-model';
import { empty } from 'rxjs';
import { Input, EventEmitter, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: any;
  email: string;
  password: string;
  loginUer: LoginUser;
  l =[];
  message:string;
  auth_token : string;
  @Output() valueChange : EventEmitter<any> = new EventEmitter();


  constructor(private formBuilder: FormBuilder,
     private shoppingService: ShoppingService,
     private cookieService: CookieService,
    public dialog: MatDialog,
    private snackbar : MatSnackBar,
     private router: Router) {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]],
    });
    
  }

  ngOnInit() {
    this.shoppingService.sharedMessage.subscribe(message => this.message = message)
  }

  login() {

    this.loginUer = new LoginUser();
    
    this.loginUer.email = this.email;
    this.loginUer.password = this.password;

    this.shoppingService.getUser(this.loginUer.email).subscribe(response => this.handleSuccessfulResponse(response))


  }

  handleSuccessfulResponse(response) {
    
    console.log(response)
    localStorage.setItem("token",response);
    console.log(localStorage.getItem("token"));
    this.loginUer = response;

    if(this.loginUer==null)
    {
      this.snackbar.open("Invalid Credentials", '', { duration: 2000 }
      );
     
    }
   // else if (this.loginUer[0].email == this.email && this.loginUer[0].password == this.password) {
     // console.log("loggedin");
      //this.shoppingService.nextMessage(this.email);
      else{
      this.cookieService.set( 'Email', this.email );
      console.log(this.email)
      this.router.navigate(['products']);

      this.snackbar.open("Logged In successfully", '', { duration: 2000 }
      );}
    //}


  }

  createAccount() {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '40%',
      data: { name: this.email, animal: this.password }
    });
  }

  getToken(){
    console.log(localStorage.getItem("token"));
    return localStorage.getItem("token");
  }

 
}

