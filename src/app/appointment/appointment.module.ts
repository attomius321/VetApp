import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AppointmentListComponent} from "./sidenav/appointment-list/appointment-list.component";
import {AppointmentRegistrationComponent} from "./sidenav/appointment-registration/appointment-registration.component";
import {AppointmentDetailsComponent} from "./sidenav/appointment-details/appointment-details.component";
import {AppointmentServiceProvider} from "../services/appointment.service";
import {AppointmentRoutingModule} from "./appointment-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatSidenavModule} from "@angular/material/sidenav";
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NavigationServiceProvider} from "../services/navigation.service";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import { AppointmentTableComponent } from './sidenav/appointment-list/appointment-table/appointment-table.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserModule} from "@angular/platform-browser";
import { ArraySortPipe } from './sidenav/appointment-list/appointment-table/pipes/array-sort.pipe';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";



@NgModule({
  declarations: [
    AppointmentListComponent,
    AppointmentRegistrationComponent,
    AppointmentDetailsComponent,
    SidenavComponent,
    AppointmentTableComponent,
    ArraySortPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppointmentRoutingModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [AppointmentServiceProvider, NavigationServiceProvider]
})
export class AppointmentModule { }
