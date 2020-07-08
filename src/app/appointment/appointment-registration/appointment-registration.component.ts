import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Appointment} from "../../entities/appointment.model";
import {APPOINTMENT_SERVICE, AppointmentService, IAppointmentService} from "../../services/appointment.service";

@Component({
  selector: 'app-appointment-registration',
  templateUrl: './appointment-registration.component.html',
  styleUrls: ['./appointment-registration.component.css']
})
export class AppointmentRegistrationComponent implements OnInit {

  appointmentForm: Appointment;

  constructor(@Inject(APPOINTMENT_SERVICE) private fb: IAppointmentService) { }

  ngOnInit(): void {
  }

  register(regForm: NgForm) {
    this.appointmentForm = regForm.form.value;
    this.save();
  }

  save() {
    this.fb.createAppointment(this.appointmentForm);
  }
}
