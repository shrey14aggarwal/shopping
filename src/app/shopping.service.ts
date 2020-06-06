import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './models/user-model';
import { LoginUser } from './models/login-user-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProdType, ProdInfo } from './models/prodinfo';
import { Products } from './models/product-model';


@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private message = new BehaviorSubject('First Message');
  sharedMessage = this.message.asObservable();

  constructor( private http : HttpClient) { }

  public saveUser(userModel){
    return this.http.post<UserModel>('http://localhost:3000/api/user', userModel);
  }

  //changing it to token json 
  public getUser(email:String){
    return this.http.post<String>('http://localhost:3000/api/users' +email, "" );
  }

  public getprodInfo() : Observable<ProdType>{
    return this.http.get<ProdType>('http://localhost:3000/api/prodInfo');

  }

  public addProdInfo(email, productModel){

    console.log(email, productModel)
    return this.http.put<Products>('http://localhost:3000/api/product'+ email, productModel);
  }

  public getProducts(email:String)
  {

    return this.http.get<Products>('http://localhost:3000/api/products' + email);
  }

  public updateProd(email, products){

    return this.http.post<Products>('http://localhost:3000/api/updateProd'+email, products);
  }

  public delete(email)
  {
    return this.http.put<String>('http://localhost:3000/api/delete'+email, "");
  }

  nextMessage(message: string) {
    this.message.next(message)
  }

}
