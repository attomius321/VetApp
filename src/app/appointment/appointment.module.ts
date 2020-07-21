import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppointmentListComponent} from "./sidenav/appointment-list/appointment-list.component";
import {AppointmentRegistrationComponent} from "./sidenav/appointment-registration/appointment-registration.component";
import {AppointmentDetailsComponent} from "./sidenav/appointment-details/appointment-details.component";
import {AppointmentServiceProvider} from "../services/appointment/appointment.service";
import {AppointmentRoutingModule} from "./appointment-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatSidenavModule} from "@angular/material/sidenav";
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NavigationServiceProvider} from "../services/navigation/navigation.service";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import { AppointmentTableComponent } from './sidenav/appointment-list/appointment-table/appointment-table.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { ArraySortPipe } from './sidenav/appointment-list/appointment-table/pipes/array-sort.pipe';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {AppointmentHistoryComponent} from "./sidenav/appointment-registration/appointment-history/appointment-history.component";
import { ToolbarComponent } from './dumb-components/toolbar/toolbar.component';
import { ParalelogComponent } from './dumb-components/paralelog/paralelog.component';
import { SidenavListComponent } from './sidenav/sidenav-list/sidenav-list.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {ChartsModule} from "ng2-charts";
import { TimeRatioComponent } from './statistics/time-ratio/time-ratio.component';
import { AnimalsRatioComponent } from './statistics/animals-ratio/animals-ratio.component';
import { DoneRatioComponent } from './statistics/done-ratio/done-ratio.component';


@NgModule({
  declarations: [
    AppointmentListComponent,
    AppointmentRegistrationComponent,
    AppointmentDetailsComponent,
    SidenavComponent,
    AppointmentTableComponent,
    ArraySortPipe,
    AppointmentHistoryComponent,
    ToolbarComponent,
    ParalelogComponent,
    SidenavListComponent,
    StatisticsComponent,
    TimeRatioComponent,
    AnimalsRatioComponent,
    DoneRatioComponent
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
        MatSelectModule,
        NgxMaterialTimepickerModule,
        ReactiveFormsModule,
        ChartsModule
    ],
  providers: [AppointmentServiceProvider, NavigationServiceProvider]
})
export class AppointmentModule { }
