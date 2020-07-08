import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppointmentListComponent} from "./appointment-list/appointment-list.component";
import {AppointmentRegistrationComponent} from "./appointment-registration/appointment-registration.component";


const routes: Routes = [
  {path: '', component: AppointmentListComponent},
  {path: 'add', component: AppointmentRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
