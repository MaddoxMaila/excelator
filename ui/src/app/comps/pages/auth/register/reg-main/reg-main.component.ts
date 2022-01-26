import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-reg-main',
  templateUrl: './reg-main.component.html',
  styleUrls: ['./reg-main.component.css']
})
export class RegMainComponent implements OnInit {

  user: User;

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit(): void {

    this.router.navigate(['/register','basic'])

    this.user = this.auth.seeUser()

    console.log(this.user)

  }


}
