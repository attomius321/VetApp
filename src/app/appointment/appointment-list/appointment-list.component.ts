import {Component, Inject, InjectionToken, OnInit} from '@angular/core';
import {Appointment} from "../../entities/appointment.model";
import {APPOINTMENT_SERVICE, AppointmentService, IAppointmentService} from "../../services/appointment.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  appointments: Array<Appointment>

  constructor(@Inject(APPOINTMENT_SERVICE) private fb: IAppointmentService) { }

  ngOnInit(): void {
    this.fb.getAppointments().subscribe(appointments => this.appointments = appointments);
  }

  delete() {
    this.fb.deleteAppointment(this.appointments[0]);
  }



}
