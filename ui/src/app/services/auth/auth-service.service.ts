import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DOMAIN } from 'src/app/constants/constants';
import { User } from 'src/app/models/User';
import { LoginFormType, LoginRespType, RegisterFormType, RegisterRespType, UserType, AuthRespType } from 'src/app/types/typeDefs';

@Injectable()
export class AuthService {

  public loading: boolean = false
  private authSubject = new Subject<User>()
  private authUser: User
  public RegisterInfo: RegisterFormType

  public regTimeKeeper: number = 1
  public userRegister: RegisterFormType = {
    name      : '',
    surname   : '',
    email     : '',
    type      : '',
    username  : '',
  }

  constructor(private http: HttpClient, private router: Router) {}

  isAdmin(): boolean {
    return this.authUser?.isAdmin()
  }

  seeUser(){
    return this.authUser
  }

  getUser(callback: (user: User) => void): void{
    this.authSubject.subscribe(user => callback(user))
  }

  setUser(user: User): void {
    this.authSubject.next(user)
    this.authUser = user
  }

  redirectToLogin(){
    !localStorage.getItem('auth-token') && this.router.navigate(['/login'])
  }

  requestAuthUser(callback: (data: any) => void) {
    this.loading = true
     this.http.post<AuthRespType>(
      `${DOMAIN}/auth`,
      null
    )
    .subscribe(resp => {
      this.loading = false
      callback(resp)
    })
  }

  login(loginData: LoginFormType, callback: (data: any) => void): void {

    this.loading = true
    this.http.post<LoginRespType>(
      `${DOMAIN}/login`,
      loginData
    )
    .subscribe(resp => {
      this.loading = false
       callback(resp)
    })

  }

  saveToken(token: string): void {

    localStorage.setItem('auth-token', token)

  }

  register(registerData: RegisterFormType, callback: (data: RegisterRespType) => void): void {
    this.loading = true
    this.http.post<RegisterRespType>(
      `${DOMAIN}/register`,
      registerData
    )
    .subscribe(resp => callback(resp))
  }

  logout(callback: () => void): void{

    localStorage.removeItem('auth-token')
    callback()

  }

}
