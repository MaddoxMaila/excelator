import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit {

  username: string = ''

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.username = `${this.auth.userRegister.name}${this.auth.userRegister.surname}`

  }

  collectUsernameForm(Form: NgForm){

    const form = Form.value

    console.log(form)

    this.auth.userRegister.username = form.username
    this.auth.userRegister.type = form.type

    this.router.navigate(['/register','security'])

  }

}
