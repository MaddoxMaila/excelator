import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from 'src/app/services/app/app.service';
import { TimesheetService } from 'src/app/services/timesheets/timesheet.service';

@Component({
  selector: 'app-new-timesheet',
  templateUrl: './new-timesheet.component.html',
  styleUrls: ['./new-timesheet.component.scss']
})
export class NewTimesheetComponent implements OnInit {

  respCrumbs = {
    loading : false,
    error   : false,
    message : ""
  }

  constructor(private tmService: TimesheetService, public app: AppService) { }

  ngOnInit(): void {
  }

  addTimeSheetEntry(timesheetForm: NgForm){

    this.respCrumbs.loading = true

    this.tmService.saveTimesheetRow(timesheetForm.value, (data) => {

      console.log(data)

      this.respCrumbs.loading = false

      this.app.toast(data.message)

    })

  }

}
