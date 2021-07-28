import { Injectable } from '@angular/core';
import{HttpInterceptor} from '@angular/common/http'
import { AuthService } from '../services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authservices:AuthService) { }

  intercept(req:any,next:any){
    const tokenizeReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${this.authservices.getToken()}`
      }
    })
    return next.handle(tokenizeReq); 
  }

}
