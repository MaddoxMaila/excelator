import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/User';
import { AuthService } from './services/auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) {}

  async ngOnInit() {

    this.auth.redirectToLogin()

    localStorage.getItem('auth-token') && await this.auth.requestAuthUser(data => {
      
      console.log(data)

      data?.error && !data?.user && this.router.navigate(['/login'])

      data.user && this.auth.setUser(new User(data.user))
      console.log(data.user)

    })

  }

}
