import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth-service.service';

@Component({
  selector: 'app-main-timesheet',
  templateUrl: './main-timesheet.component.html',
  styleUrls: ['./main-timesheet.component.scss']
})
export class MainTimesheetComponent implements OnInit {

  user: User

  constructor(private router: Router, private auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.user = this.auth.seeUser()

    !this.user && this.router.navigate(['/login'])

    this.route.params.subscribe(
      (params: Params) => {

        // if(params['id'] == this.user.getId()){
        //   this.router.navigate([`/timesheet/${this.user.getId()}/see`])
        // }else{

        // }

      }
  )

  }

}
