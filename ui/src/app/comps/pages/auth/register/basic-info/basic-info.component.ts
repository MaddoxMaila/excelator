import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  collectBasicForm(Form: NgForm): void{

    const form = Form.value

    console.log(form)

    this.auth.userRegister.name = form.name
    this.auth.userRegister.surname = form.surname

    this.router.navigate(['/register','username'])
  }

}
