import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  data!: FormGroup;
  constructor(private _router: Router ,private service :DataService)  {

  }
  ngOnInit(): void {
    this.data = new FormGroup({
      email: new FormControl,
      password: new FormControl
    })
  }
  get input(): { [key: string]: AbstractControl } {
    return this.data.controls
  }
  login() {
    if(this.data.valid){
      this.service.userLogin(this.data.value)
       alert("User Login Successfully");
       this._router.navigateByUrl("")
    }else{
      alert("Invalid Email && Password")
    }
  }
}
