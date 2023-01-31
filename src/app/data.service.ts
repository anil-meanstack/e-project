import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { login, signup } from './data-type';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  invalidUserAuth = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private _router: Router) { }
  // user Signup api
  userSignup(data: signup) {
    return this.http.post("http://localhost:3000/userSignup", data, { observe: 'response' }).subscribe
      ((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
        }
      })
  }
  //User Login api
  userLogin(data: login) {
    this.http.get<signup[]>(`http://localhost:3000/userSignup?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result) => {
      if (result && result.body?.length) {
        this.invalidUserAuth.emit(false)
        localStorage.setItem('user', JSON.stringify(result.body[0]));
      } else {
        this.invalidUserAuth.emit(true)
      }
    })
  }

  //  product get api

  productGet(): Observable<any> {
    return this.http.get("http://localhost:3000/Product");
  }

  //product view api 
  viewProduct(id: any) {
    return this.http.get("http://localhost:3000/Product/" + id)
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this._router.navigate(['/']);
    }
  }

}
