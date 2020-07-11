import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
import {Appointment} from "../../../entities/appointment.model";
import {APPOINTMENT_SERVICE, AppointmentService, IAppointmentService} from "../../../services/appointment.service";
import {ToastrService} from "ngx-toastr";
import {INavigationService, NAVIGATION_SERVICE} from "../../../services/navigation.service";

@Component({
  selector: 'app-appointment-registration',
  templateUrl: './appointment-registration.component.html',
  styleUrls: ['./appointment-registration.component.css']
})
export class AppointmentRegistrationComponent implements OnInit {

  appointmentForm: Appointment;
  date = new FormControl(new Date());

  constructor(@Inject(APPOINTMENT_SERVICE) private fb: IAppointmentService,
              private toastr: ToastrService,
              @Inject(NAVIGATION_SERVICE) private nav: INavigationService) { }

  ngOnInit(): void {
  }

  register(regForm: NgForm) {
    this.appointmentForm = regForm.form.value;
    this.save();
    this.toastr.success(`Added new appointment successfully`)
  }

  save() {
    this.fb.createAppointment(this.appointmentForm);
  }

  goBack() {
    this.nav.openAppointments();
  }

  verify(){
    console.log(this.date.value);
  }
}
