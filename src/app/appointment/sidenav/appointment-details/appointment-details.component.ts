import {Component, Inject, OnInit} from '@angular/core';
import {Appointment} from "../../../entities/appointment.model";
import {APPOINTMENT_SERVICE, IAppointmentService} from "../../../services/appointment/appointment.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TimeConverterService} from "../../../services/time-convertor/time-convertor.service";
import {MatDatepicker} from "@angular/material/datepicker";

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {

  public appointmentFormGroup: FormGroup;
  appointment: Appointment;
  minDate = new Date();

  constructor(@Inject(APPOINTMENT_SERVICE) private appService: IAppointmentService,
              private activatedRoute: ActivatedRoute,
              private timeConverterService: TimeConverterService) {

    this.minDate = new Date();

    this.appointment = new class implements Appointment {
      animal: string;
      diagnostic: string;
      doc: string;
      id: string;
      status: string;
      unix: number;
    }

    this.appointmentFormGroup = new FormGroup({
      animal: new FormControl("", [Validators.required]),
      data: new FormControl("", [Validators.required]),
      hour: new FormControl("", [Validators.required]),
      doc: new FormControl("", [Validators.required]),
      diagnostic: new FormControl(""),
      status: new FormControl("", [Validators.required])
    })

  }

  ngOnInit(): void {
    this.appService.getAppointmentById(this.activatedRoute.snapshot.params['id']).subscribe(
      appointment => {
        this.appointment = appointment;
        this.appointment.id = this.activatedRoute.snapshot.params['id'];
        this.appointmentFormGroup.patchValue({
          animal: appointment.animal,
          data: this.timeConverterService.convertUnixToDate(this.appointment.unix),
          hour: this.timeConverterService.convertUnixToHours(this.appointment.unix),
          doc: appointment.doc,
          diagnostic: appointment.diagnostic,
          status: appointment.status
        });
      },
    )
  }

  checkStatus(status: string){
    return this.appointment.status === status;
  }

  changeStatus(status: string){
    this.appointmentFormGroup.patchValue({
      status: status
    })
  }

  openPicker(picker: MatDatepicker<any>){
    this.appointment.status === 'CREATED' ? picker.open() : null;
  }

  disableButton(status: string) {
    return this.appointmentFormGroup.get('status').value === status;
  }

  disableDoneButton(status: string){
    if (this.appointmentFormGroup.get('status').value === status || this.appointmentFormGroup.get('diagnostic').value == ""){
      return true;
    } else {
      return false;
    }
  }

  checkDiagnostic(){
    if (this.appointmentFormGroup.get('diagnostic').value === ''){
      if(this.appointmentFormGroup.get('status').value == 'CONFIRMED'){
        this.appointmentFormGroup.patchValue({
          status: 'CONFIRMED'
        });
      }else {
        this.appointmentFormGroup.patchValue({
          status: 'CREATED'
        });
      }
      return true;
    }
  }

  onSubmit() {
    const data = this.appointmentFormGroup.get('data').value.getTime();
    const hour = this.appointmentFormGroup.get('hour').value.split(':');
    const id = this.activatedRoute.snapshot.params['id'];
    let unix = this.timeConverterService.convertTimeToUnix(data, hour);
    this.appointment.animal = this.appointmentFormGroup.value.animal;
    this.appointment.diagnostic = this.appointmentFormGroup.value.diagnostic;
    this.appointment.doc = this.appointmentFormGroup.value.doc;
    this.appointment.status = this.appointmentFormGroup.value.status;
    this.appointment.unix = unix;
    this.appService.updateAppointment(this.appointment, id);
  }

}
