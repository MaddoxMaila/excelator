import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authUser: User

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.auth.getUser(user => this.authUser = user)

  }

}
