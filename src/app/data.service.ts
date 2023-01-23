import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { login, signup } from './data-type';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
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
      if (result && result.body) {
        localStorage.setItem('user', JSON.stringify(result.body[0]));
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


}
