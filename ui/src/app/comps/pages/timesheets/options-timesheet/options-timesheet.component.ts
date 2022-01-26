import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TimeSheet } from 'src/app/models/TimeSheet';
import { TimesheetService } from 'src/app/services/timesheets/timesheet.service';

@Component({
  selector: 'app-options-timesheet',
  templateUrl: './options-timesheet.component.html',
  styleUrls: ['./options-timesheet.component.scss']
})
export class OptionsTimesheetComponent implements OnInit {

  mTimeSheet: TimeSheet
  image : SafeUrl
  popup = {
    isOpen : false,
    which : ''
  }

  constructor(private tmService: TimesheetService, public sanitize: DomSanitizer) { }

  ngOnInit(): void {

    this.tmService.getSheet(tm => {

      this.mTimeSheet = tm
      this.image = this.sanitize.bypassSecurityTrustUrl(this.mTimeSheet?.getUser().getImage())
    })

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

}
