import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

  public message: string = ""
  public showToast: boolean = false

  constructor() { }

  toast(text: string){

    this.showToast = true
    this.message = text
    setTimeout(() => {

      this.showToast = false
      this.message = ""

    }, 2000)


  }

}
