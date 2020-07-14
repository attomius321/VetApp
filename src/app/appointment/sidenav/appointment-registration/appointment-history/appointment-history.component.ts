import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Appointment} from "../../../../entities/appointment.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {APPOINTMENT_SERVICE, IAppointmentService} from "../../../../services/appointment/appointment.service";
import {INavigationService, NAVIGATION_SERVICE} from "../../../../services/navigation/navigation.service";

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.css']
})
export class AppointmentHistoryComponent implements OnInit {

  @Input() dataSource: MatTableDataSource<Appointment>;
  displayedColumns: Array<string> = ['animal','doc','unix','status','diagnostic'];

  constructor() {
  }

  ngOnInit(): void {
  }


}
