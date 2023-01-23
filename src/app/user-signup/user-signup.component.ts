import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {
  data!: FormGroup;
  Issummited = false;
  constructor(private service: DataService, private _router: Router) {

  }
  ngOnInit(): void {
    this.data = new FormGroup({
      name: new FormControl,
      phone: new FormControl,
      address: new FormControl,
      email: new FormControl,
      password: new FormControl,
    })
  }
  get input(): { [key: string]: AbstractControl } {
    return this.data.controls
  }
  signup() {
    if(this.data.valid){
      this.service.userSignup(this.data.value)
      alert("User Register Successfully")
      this._router.navigateByUrl("/login")
    }else{
      alert("Enter your Information")
    }
    
  }
}
