import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AppointmentListComponent} from "./appointment-list/appointment-list.component";
import {AppointmentRegistrationComponent} from "./appointment-registration/appointment-registration.component";
import {AppointmentDetailsComponent} from "./appointment-details/appointment-details.component";
import {AppointmentServiceProvider} from "../services/appointment.service";
import {AppointmentRoutingModule} from "./appointment-routing.module";



@NgModule({
  declarations: [
    AppointmentListComponent,
    AppointmentRegistrationComponent,
    AppointmentDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppointmentRoutingModule
  ],
  providers: [AppointmentServiceProvider]
})
export class AppointmentModule { }
