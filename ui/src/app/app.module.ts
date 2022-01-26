import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DesktopNavbarComponent } from './comps/builders/navigation/desktop-navbar/desktop-navbar.component';
import { LoginComponent } from './comps/pages/auth/login/login.component';
import { BasicInfoComponent } from './comps/pages/auth/register/basic-info/basic-info.component';
import { SecurityComponent } from './comps/pages/auth/register/security/security.component';
import { UsernameComponent } from './comps/pages/auth/register/username/username.component';
import { HomeComponent } from './comps/pages/home/home.component';
import { RegMainComponent } from './comps/pages/auth/register/reg-main/reg-main.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth/auth-service.service';
import { SideNavComponent } from './comps/builders/navigation/side-nav/side-nav.component';
import { NameComponent } from './comps/builders/name/name.component';
import { ButtonComponent } from './comps/builders/wrappers/button/button.component';
import { AdminHomeComponent } from './comps/pages/home/admin-home/admin-home.component';
import { UsersHomeComponent } from './comps/pages/home/users-home/users-home.component';
import { BearerInterceptorService } from './services/interceptors/bearer-interceptor.service';
import { NavbarItemsComponent } from './comps/builders/navigation/navbar-items/navbar-items.component';
import { NewTimesheetComponent } from './comps/pages/timesheets/new-timesheet/new-timesheet.component';
import { ViewTimesheetComponent } from './comps/pages/timesheets/view-timesheet/view-timesheet.component';
import { MainTimesheetComponent } from './comps/pages/timesheets/main-timesheet/main-timesheet.component';
import { OptionsTimesheetComponent } from './comps/pages/timesheets/options-timesheet/options-timesheet.component';
import { TimesheetService } from './services/timesheets/timesheet.service';
import { BackBtnComponent } from './comps/builders/navigation/back-btn/back-btn.component';
import { ToastComponent } from './comps/builders/wrappers/toast/toast.component';
import { AppService } from './services/app/app.service';
import { DropdownDirective } from './directives/dropdown.directive';
import { PopupComponent } from './comps/builders/wrappers/popup/popup.component';
import { TimesheetRowComponent } from './comps/builders/timesheets/timesheet-row/timesheet-row.component';
import { UserImageComponent } from './comps/builders/wrappers/user-image/user-image.component';
import { InitialsPipe } from './pipes/initials.pipe';
import { AdminViewSubmissionsComponent } from './comps/pages/admin/admin-view-submissions/admin-view-submissions.component';

@NgModule({
  declarations: [AppComponent, DesktopNavbarComponent, LoginComponent, BasicInfoComponent, SecurityComponent, UsernameComponent, HomeComponent, RegMainComponent, SideNavComponent, NameComponent, ButtonComponent, AdminHomeComponent, UsersHomeComponent, NavbarItemsComponent, NewTimesheetComponent, ViewTimesheetComponent, MainTimesheetComponent, OptionsTimesheetComponent, BackBtnComponent, ToastComponent, DropdownDirective, PopupComponent, TimesheetRowComponent, UserImageComponent, InitialsPipe, AdminViewSubmissionsComponent] ,
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    TimesheetService,
    AppService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BearerInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
