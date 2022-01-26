import { Component, Input, OnInit } from '@angular/core';
import { TimeSheetRow } from 'src/app/models/TimeSheetRow';

@Component({
  selector: 'app-timesheet-row',
  templateUrl: './timesheet-row.component.html',
  styleUrls: ['./timesheet-row.component.scss']
})
export class TimesheetRowComponent implements OnInit {

  @Input() sheetRow: TimeSheetRow

  constructor() { }

  ngOnInit(): void {
    console.log(this.sheetRow)
  }

}
