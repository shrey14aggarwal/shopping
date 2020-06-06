import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, Injector, Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { Observable } from 'rxjs';

//Taking the incoming request and adding the auth token to it
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    auth: any;
   
 
    constructor( private loginComponent : LoginComponent){}
    intercept( req : HttpRequest<any>, next : HttpHandler ): Observable<HttpEvent<any>>{
        

      //  const authToken = this.loginComponent.getToken();
        const authToken = this.loginComponent.getToken();
        console.log("interceptor")
        console.log(authToken)
        const authRequest = req.clone({

            headers : req.headers.set('Authorization', 'Bearer '+ authToken)
        })

        console.log("auth request"+authRequest);
        return next.handle(authRequest);

    }
    }

    
