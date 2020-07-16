import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppointmentRegistrationComponent} from "./sidenav/appointment-registration/appointment-registration.component";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {AppointmentDetailsComponent} from "./sidenav/appointment-details/appointment-details.component";
import {StatisticsComponent} from "./statistics/statistics.component";


const routes: Routes = [
  {path: '', component: SidenavComponent},
  {path: 'add', component: AppointmentRegistrationComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: ':id', component: AppointmentDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
