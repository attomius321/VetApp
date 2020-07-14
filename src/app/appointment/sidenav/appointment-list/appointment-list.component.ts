import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {INavigationService, NAVIGATION_SERVICE} from "../../../services/navigation/navigation.service";
import {APPOINTMENT_SERVICE, IAppointmentService} from "../../../services/appointment/appointment.service";
import {MatTableDataSource} from "@angular/material/table";
import {Appointment} from "../../../entities/appointment.model";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  dataSource: MatTableDataSource<Appointment>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(@Inject(APPOINTMENT_SERVICE) private fb: IAppointmentService,
              @Inject(NAVIGATION_SERVICE) private nav: INavigationService) { }

  ngOnInit(): void {
    this.fb.getAppointments().subscribe(data =>
      {
        this.dataSource = new MatTableDataSource<Appointment>(data);
        this.dataSource.sort = this.sort;
      }
    )
  }

  goToAdd(): void {
    this.nav.openNewAppointment();
  }

}
