import {Component, Inject, OnInit} from '@angular/core';
import {Appointment} from "../../../entities/appointment.model";
import {APPOINTMENT_SERVICE, IAppointmentService} from "../../../services/appointment/appointment.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {

  appointment: Appointment;

  constructor(@Inject(APPOINTMENT_SERVICE) private appService: IAppointmentService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.appService.getAppointmentById(this.activatedRoute.snapshot.params['id']).subscribe(
      appointment => this.appointment = appointment
    )
  }

}
