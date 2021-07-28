import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user = {
    email: '',
    password:''
  }
  constructor(private authservice:AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }

  signIn(){
    this.authservice.signIn(this.user)
    .subscribe(
      res=>{
        localStorage.setItem('token', res.token)
        this.router.navigate(['/private']);
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    )
  }
}
