import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Appointment} from "../../../../entities/appointment.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {APPOINTMENT_SERVICE, IAppointmentService} from "../../../../services/appointment/appointment.service";
import {INavigationService, NAVIGATION_SERVICE} from "../../../../services/navigation/navigation.service";
import {TimeConverterService} from "../../../../services/time-convertor/time-convertor.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.css']
})
export class AppointmentTableComponent implements OnInit {

  dataSource: MatTableDataSource<Appointment>
  displayedColumns: Array<string> = ['animal','doc','unix','status','diagnostic','Edit', 'Delete'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(@Inject(APPOINTMENT_SERVICE) private fb: IAppointmentService,
              @Inject(NAVIGATION_SERVICE) private navService: INavigationService) { }

  ngOnInit(): void {
    this.fb.getAppointments().subscribe(data =>
      {
        this.dataSource = new MatTableDataSource<Appointment>(data);
        this.dataSource.sort = this.sort;
      }
    )
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isCreated(status: string){
    return status === "CREATED";
  }

  isConfirmed(status: string){
    return status === "CONFIRMED";
  }

  hasEnded(status: string){
    return status === "DONE";
  }

  deleteAppointment(appointment: Appointment){
    this.fb.deleteAppointment(appointment);
  }

  goToAppointment(appointment: Appointment){
    return this.navService.openAppointment(appointment.id);
  }

}
