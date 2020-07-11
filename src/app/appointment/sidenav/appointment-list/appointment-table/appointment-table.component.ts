import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Appointment} from "../../../../entities/appointment.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {APPOINTMENT_SERVICE, IAppointmentService} from "../../../../services/appointment.service";
import {INavigationService, NAVIGATION_SERVICE} from "../../../../services/navigation.service";

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.css']
})
export class AppointmentTableComponent implements OnInit {

  dataSource: MatTableDataSource<Appointment>
  displayedColumns: Array<string> = ['animal','doc','diagnostic','status','unix','Edit'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(@Inject(APPOINTMENT_SERVICE) private fb: IAppointmentService,
              @Inject(NAVIGATION_SERVICE) private navService: INavigationService) { }

  ngOnInit(): void {
    this.fb.getAppointments().subscribe(data =>
      {
        this.dataSource = new MatTableDataSource<Appointment>(data);
        this.dataSource.sort = this.sort;
        console.log("done");
      }
    )
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToAppointment(appointment: Appointment){
    return this.navService.openAppointment(appointment.id);
  }

}
