import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { ErrorType, LoginFormType, LoginRespType } from 'src/app/types/typeDefs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: ErrorType = {
    error: false,
    message: ""
  }
  loading: boolean = false
  user: User

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    localStorage.getItem('auth-token') && this.router.navigate(['/home'])
  }

  login(loginData: LoginFormType){

    this.loading = true
    this.auth.login(loginData, ({error, message, access_token, refresh_token, user}: LoginRespType) => {
      
      this.error = {error, message}

      !this.error.error && this.auth.setUser(new User(user))
      !this.error.error && this.auth.saveToken(access_token)
      !this.error.error && this.router.navigate(['/home'])

      this.loading = false
    })
  }

}
