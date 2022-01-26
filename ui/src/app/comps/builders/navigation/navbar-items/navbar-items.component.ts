import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-navbar-items',
  templateUrl: './navbar-items.component.html',
  styleUrls: ['./navbar-items.component.scss']
})
export class NavbarItemsComponent implements OnInit{

  authUser: User
  authIsAdmin: boolean = false

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.authIsAdmin = this.auth?.isAdmin()
    console.log(this.authIsAdmin)

  }

  logout(): void{

    this.auth.logout(() => {
      this.auth.setUser(null)
      this.router.navigate(['/login'])
    })

  }

}
