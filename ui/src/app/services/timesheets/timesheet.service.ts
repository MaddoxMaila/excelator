import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { DOMAIN } from 'src/app/constants/constants';
import { TimeSheet } from 'src/app/models/TimeSheet';
import { ErrorType, TimesheetFormType, TimeSheetType } from 'src/app/types/typeDefs';
import { AuthService } from '../auth/auth-service.service';

@Injectable()
export class TimesheetService {

  userId: number
  SheetSubject = new Subject<TimeSheet>()
  timeSheet: TimeSheet
  

  constructor(private auth: AuthService, private route: ActivatedRoute, private http: HttpClient) {


   }

  
   deleteSheetEntry(sheetId: number, callback: (data: ErrorType) => void): void {

    this.http.delete<ErrorType>(
      `${DOMAIN}/timesheet/delete?id=${sheetId}`
      )
    .subscribe(resp => callback({message: resp.message, error: resp.error}))

   }

   setTimesheet(timesheet: TimeSheet){
     this.SheetSubject.next(timesheet)
   }

   getSheet(callback: (tm: TimeSheet) => void): void {
     this.SheetSubject.subscribe(tm => callback(tm))
   }

   viewMyTimesheet(queryParams: string, callback: (data: {timesheet?: TimeSheet, error: boolean, message: string}) => void): void {

    this.http.get<TimeSheetType>(
      `${DOMAIN}/timesheet/see?${queryParams}`
    ).subscribe(resp => {

      if(resp.error) return callback(resp)

      callback({
        timesheet: new TimeSheet(resp),
        error : resp.error,
        message: resp.message
      })

    })

   }

   saveTimesheetRow(timesheetFormData: TimesheetFormType, callback: (data) => void ){

    this.http.post<TimeSheetType>(
      `${DOMAIN}/timesheet/save`,
      timesheetFormData
    ).subscribe(resp => callback(resp))

   }

   getTimeSheetPrecise(queryParams, callback: (data: {timesheet?: TimeSheet, error: boolean, message: string}) => void): void {

    this.http.get<TimeSheetType>(
      `${DOMAIN}/timesheet/see?${queryParams}`
    ).subscribe(resp => {
      if(resp.error) return callback(resp)

      callback({
        timesheet: new TimeSheet(resp),
        error : resp.error,
        message: resp.message
      })
    })

   }

}
