
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from 'src/app/constants/constants';
import { SheetSubmittedType } from 'src/app/types/typeDefs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getSubmissions(callback: (data: SheetSubmittedType) => void): void{

    this.http.get<SheetSubmittedType>(`${DOMAIN}/admin/view`)
    .subscribe(resp => callback(resp))

  }

}
