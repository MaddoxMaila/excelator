import { Component, OnInit } from '@angular/core';
import { SheetSubmitted } from 'src/app/models/SheetSubmitted';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin-view-submissions',
  templateUrl: './admin-view-submissions.component.html',
  styleUrls: ['./admin-view-submissions.component.scss']
})
export class AdminViewSubmissionsComponent implements OnInit {

  timesheetSubmissions: SheetSubmitted[] = []

  stage = {
    message     : '',
    error       : false,
    loading     : true
  }

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {

    this.stage.loading = true

    this.adminService.getSubmissions(response => {

      response.submitted_sheets.forEach(sheet_submitted => {
        this.timesheetSubmissions.push(
            new SheetSubmitted(sheet_submitted)
          )
          console.log(this.timesheetSubmissions)
      })

      this.stage.loading = false
    })

  }

}
