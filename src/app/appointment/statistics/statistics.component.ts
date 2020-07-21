import {Component, Inject, OnInit} from '@angular/core';
import {APPOINTMENT_SERVICE, IAppointmentService} from "../../services/appointment/appointment.service";
import {Appointment} from "../../entities/appointment.model";

import {Observable} from "rxjs";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  appointments: Observable<Array<Appointment>>;
  public status = 0;

  constructor(@Inject(APPOINTMENT_SERVICE) private appService: IAppointmentService) {
  }

  ngOnInit() {
    this.appointments = this.appService.getAppointments();
  }

  selectStatus(st: number){
    this.status = st;
  }

  checkStatus(st: number){
    return this.status === st;
  }


}
