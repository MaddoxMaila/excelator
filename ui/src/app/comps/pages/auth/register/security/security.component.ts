import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from 'src/app/services/app/app.service';
import { AuthService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  fullName: string = 'x'
  username: string = 'y'

  constructor(private auth: AuthService, private app: AppService) { }

  ngOnInit(): void {

    this.fullName = `${this.auth.userRegister.name} ${this.auth.userRegister.surname}`
    this.username = this.auth.userRegister.username

  }

  collectSecurityForm(Form: NgForm){

    const form = Form.value

    this.auth.userRegister.email = form.email

    this.auth.register(this.auth.userRegister, response => {
      console.log(response)
      this.app.toast(response.message)
    })

  }

}
