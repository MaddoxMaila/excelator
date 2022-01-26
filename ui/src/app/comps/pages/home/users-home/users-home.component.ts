import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.scss']
})
export class UsersHomeComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.redirectToLogin()
  }

}
