import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { SignupComponent } from './signup/signup.component';
import { ProductsComponent } from './products/products.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MobilesComponent } from './products/mobiles/mobiles.component';
import { LaptopsComponent } from './products/laptops/laptops.component';
import { SmartComponent } from './products/smart/smart.component';
import { TabletsComponent } from './products/tablets/tablets.component';
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';
import { CartComponent } from './cart/cart.component';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';


import { PhoneDescriptionComponent } from './products/phone-description/phone-description.component';
import { AuthInterceptor } from './auth-interceptor';
import { LaptopDescriptionComponent } from './laptop-description/laptop-description.component';
import { TabletDescriptionComponent } from './tablet-description/tablet-description.component';
import { AuthGuardComponent } from './auth-guard/auth-guard.component';



const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent }, 
  { path: 'products', component: ProductsComponent, canActivate :  [AuthGuardComponent] },
  { path: 'mobiles', component: MobilesComponent, canActivate :  [AuthGuardComponent] },
  { path: 'laptops', component: LaptopsComponent, canActivate :  [AuthGuardComponent] },
  { path: 'smart', component: SmartComponent, canActivate :  [AuthGuardComponent] },
  { path: 'tablets', component: TabletsComponent, canActivate :  [AuthGuardComponent] },
  { path: 'cart', component: CartComponent, canActivate :  [AuthGuardComponent] },
  { path: 'phoneDescription', component: PhoneDescriptionComponent },
  { path: 'laptopDescription', component: LaptopDescriptionComponent },
  { path: 'tabletDescription', component: TabletDescriptionComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProductsComponent,
    MobilesComponent,
    LaptopsComponent,
    SmartComponent,
    TabletsComponent,
    CartComponent,
    PhoneDescriptionComponent,
    LaptopDescriptionComponent,
    TabletDescriptionComponent,
    AuthGuardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    HttpClientModule,
    MatIconModule,
    MatSelectModule,
    MatBadgeModule,
    MatListModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    RouterModule.forRoot(
      appRoutes,
      {  } // <-- debugging purposes only
    )
  ],
  providers:  [AuthGuardComponent,LoginComponent ,CookieService, { provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
