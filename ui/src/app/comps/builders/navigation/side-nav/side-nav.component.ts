import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  user: User

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getUser(user => {
      this.user = user
    })
  }

}
