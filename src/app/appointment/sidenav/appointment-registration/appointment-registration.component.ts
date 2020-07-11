import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Appointment} from "../../entities/appointment.model";
import {APPOINTMENT_SERVICE, AppointmentService, IAppointmentService} from "../../services/appointment.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-appointment-registration',
  templateUrl: './appointment-registration.component.html',
  styleUrls: ['./appointment-registration.component.css']
})
export class AppointmentRegistrationComponent implements OnInit {

  appointmentForm: Appointment;

  constructor(@Inject(APPOINTMENT_SERVICE) private fb: IAppointmentService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register(regForm: NgForm) {
    this.appointmentForm = regForm.form.value;
    this.save();
    this.toastr.success(`Added new appointment succesfully`)
  }

  save() {
    this.fb.createAppointment(this.appointmentForm);
  }
}
