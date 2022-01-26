import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./comps/pages/auth/login/login.component";
import { BasicInfoComponent } from "./comps/pages/auth/register/basic-info/basic-info.component";
import { RegMainComponent } from "./comps/pages/auth/register/reg-main/reg-main.component";
import { SecurityComponent } from "./comps/pages/auth/register/security/security.component";
import { UsernameComponent } from "./comps/pages/auth/register/username/username.component";
import { HomeComponent } from "./comps/pages/home/home.component";
import { MainTimesheetComponent } from "./comps/pages/timesheets/main-timesheet/main-timesheet.component";
import { NewTimesheetComponent } from "./comps/pages/timesheets/new-timesheet/new-timesheet.component";
import { ViewTimesheetComponent } from "./comps/pages/timesheets/view-timesheet/view-timesheet.component";


const appRoutes : Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path        : 'home',
        component   : HomeComponent
    },
    { 
        path: 'register',
        component: RegMainComponent,
        children: [
          {
              path      : 'basic',
              component : BasicInfoComponent
          },
          {
              path      : 'username',
              component : UsernameComponent
          },
          {
              path      : 'security',
              component : SecurityComponent
          }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path        : 'timesheet',
        component   : MainTimesheetComponent,
        children    : [
            {
                path        : 'new',
                component   : NewTimesheetComponent
            },
            {
                path        : ':id/see',
                component   : ViewTimesheetComponent
            }
        ]
    }

]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{

}