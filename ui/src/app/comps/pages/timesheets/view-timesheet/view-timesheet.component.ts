import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MONTHS } from 'src/app/constants/constants';
import { TimeSheet } from 'src/app/models/TimeSheet';
import { AppService } from 'src/app/services/app/app.service';
import { AuthService } from 'src/app/services/auth/auth-service.service';
import { TimesheetService } from 'src/app/services/timesheets/timesheet.service';
import { ErrorType } from 'src/app/types/typeDefs';

@Component({
  selector: 'app-view-timesheet',
  templateUrl: './view-timesheet.component.html',
  styleUrls: ['./view-timesheet.component.scss']
})
export class ViewTimesheetComponent implements OnInit {

  error: ErrorType = {
    error : false,
    message: ""
  }
  loading: boolean = true
  mTimeSheet: TimeSheet

  popup = {
    isOpen : false,
    which : ''
  }

  months: string[] = MONTHS
  userId: number

  constructor(private auth: AuthService, private tmService: TimesheetService, private app: AppService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.userId = +params['id']
        console.log(params)
        this.getAllSheets(this.useUserIdQuary())
      }
    )

  }

  getUserId(): number | string{
    return this.auth.isAdmin() ? this.userId : ''
  }

  useUserIdQuary(): string{
    return this.auth.isAdmin() ? `user_id=${this.getUserId()}` : ''
  }


  togglePopup(which: string): void {

    if(this.popup.isOpen){
      this.popup.isOpen = !this.popup.isOpen
      this.popup.which = ''
    }else{
      this.popup.isOpen = !this.popup.isOpen
      this.popup.which = which
    }

  }

  processResponse(timesheet: TimeSheet, error: boolean, message: string): void {

    if(error){
      this.error.error = error
      this.error.message = message
    }else{

      console.log(timesheet)
      this.tmService.setTimesheet(timesheet)

    }

    this.loading = false

  }

  deleteEntry(id: number): void {

    this.loading = true

    this.tmService.deleteSheetEntry(id, ({error, message}) => {

      this.app.toast(message)
      this.getAllSheets("")
      this.loading = false

    })

  }

  getByMonth(month: string): void {

    this.loading = true

    this.tmService.getTimeSheetPrecise(`month=${month}&${this.useUserIdQuary()}`, ({timesheet, error, message}) => {

      this.processResponse(timesheet, error, message)

      this.loading = false
    })

    this.tmService.getSheet(tm => this.mTimeSheet = tm)

  }

  getByDate(date: string): void {

    this.loading = true

    this.tmService.getTimeSheetPrecise(`date=${date}&${this.useUserIdQuary()}`, ({timesheet, error, message}) => {

      this.processResponse(timesheet, error, message)

      this.loading = false
    })

    this.tmService.getSheet(tm => this.mTimeSheet = tm)
    this.togglePopup('')

  }

  getByDateInterval(form: {startDate: string, endDate: string}){

    this.tmService.getTimeSheetPrecise(`sheet_from=${form.startDate}&sheet_to=${form.endDate}&${this.useUserIdQuary()}`, ({timesheet, error, message}) => {

      this.processResponse(timesheet, error, message)

      this.loading = false
    })

    this.tmService.getSheet(tm => this.mTimeSheet = tm)
    this.togglePopup('')

  }

  getAllSheets(param: string){

    this.loading = true

    this.tmService.viewMyTimesheet(param, ({timesheet, error, message}) => {

      this.processResponse(timesheet, error, message)

      this.loading = false
    })

    this.tmService.getSheet(tm => this.mTimeSheet = tm)

  }

}
