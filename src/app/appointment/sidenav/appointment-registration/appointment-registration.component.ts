import {Component, Inject, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Appointment} from "../../../entities/appointment.model";
import {APPOINTMENT_SERVICE, IAppointmentService} from "../../../services/appointment/appointment.service";
import {ToastrService} from "ngx-toastr";
import {INavigationService, NAVIGATION_SERVICE} from "../../../services/navigation/navigation.service";
import {AppointmentForm} from "./appointment-form.model";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-appointment-registration',
  templateUrl: './appointment-registration.component.html',
  styleUrls: ['./appointment-registration.component.css']
})
export class AppointmentRegistrationComponent implements OnInit {

  animals: string[] = [
    'Caine', 'Pisica', 'Girafa', 'Hipopotam', 'Dragon de Komodo', 'Dragoni', 'Urs'
  ];
  public dataSource: MatTableDataSource<Appointment>;
  public realAppointment: Appointment;
  public appointment: AppointmentForm;
  public appointmentList: Array<Appointment> = [];
  public minDate: Date;
  private date: number;
  private time: number;
  private state = 0;



  constructor(@Inject(APPOINTMENT_SERVICE) private appService: IAppointmentService,
              private toastr: ToastrService,
              @Inject(NAVIGATION_SERVICE) private nav: INavigationService) {
    this.minDate = new Date();
    this.appointment = new class implements AppointmentForm {
      animal: string;
      data: string;
      doc: string;
      hour: number;
    }
    this.realAppointment = new class implements Appointment {
      animal: string;
      diagnostic: string;
      doc: string;
      id: string;
      status: string;
      unix: number;
    }
  }

  ngOnInit(): void {
  }

  register(regForm: NgForm) {
    this.date = regForm.form.value.date.getTime();
    let split = regForm.form.value.hour.split(':');
    this.realAppointment.animal = this.appointment.animal;
    this.realAppointment.diagnostic = "TBD";
    this.realAppointment.doc = this.appointment.doc;
    this.realAppointment.status = "CREATA";
    this.realAppointment.unix = this.convertDateAndTime(this.date, split);
    this.save();
  }

  convertDateAndTime(date: number, split: number){
    this.time = (+split[0]) * 3600 + (+split[1]) * 60;
    return this.date + this.time * 1000;
  }

  save() {
    this.appService.createAppointment(this.realAppointment);
  }

  changeState(state: number){
    this.state = state;
    this.appointment.animal = "";
  }

  checkState(state: number){
    return this.state === state;
  }

  getAppointmentHistory(animal: string){
    this.appointmentList = [];
    this.appService.getAppointmentsByAnimal(animal)
      .then(
        querySnapshot => querySnapshot.forEach(
          doc => {
            let date = new Date().getTime();
            if(doc.data().unix < date){
              this.appointmentList.push(doc.data())
            }
          },
        ),
        this.dataSource = new MatTableDataSource<Appointment>(this.appointmentList),
      )
      .catch(
        err => console.log("Error getting documents", err)
      )
  }

  goBack() {
    this.nav.openAppointments();
  }

}
