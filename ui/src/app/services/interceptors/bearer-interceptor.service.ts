import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BearerInterceptorService implements HttpInterceptor{

  authToken: string
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.authToken = localStorage.getItem('auth-token')

    if(this.authToken){

      const addTokenToRequest = request.clone({headers: request.headers.set("Authorization", `Bearer ${this.authToken}`)})
      return next.handle(addTokenToRequest)
    }

    return next.handle(request)

  }

}
