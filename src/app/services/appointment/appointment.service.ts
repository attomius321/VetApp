import {Injectable, InjectionToken, Provider} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Appointment} from "../../entities/appointment.model";
import {Observable} from "rxjs";
import * as firebase from 'firebase';

import DocumentReference = firebase.firestore.DocumentReference;
import {ajaxPost} from "rxjs/internal-compatibility";
import {map} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/appointments';

export interface IAppointmentService {

  getAppointments(): Observable<Array<Appointment>>;

  getAppointmentById(id: string);

  getAppointmentsByAnimal(name: string);

  createAppointment(appointment: Appointment);

  deleteAppointment(appointment: Appointment);

  updateAppointment(appointment: Appointment, id: string);

}

@Injectable()
export class AppointmentService implements IAppointmentService{

  appointments: Observable<Array<Appointment>>

  appointmentsCollection: AngularFirestoreCollection<Appointment>

  constructor(private firestore: AngularFirestore,
              private toastr: ToastrService,
              private http: HttpClient) {
  }

  getAppointments(): Observable<Array<Appointment>>{
      return this.http.get<Appointment[]>(baseUrl);
  }

  getAppointmentById(id: string){
    return this.http.get(`${baseUrl}/${id}`);
  }

  getAppointmentsByAnimal(animal: string){
    return this.firestore.collection('appointments').ref.where("animal", "==", animal).get();
  }

  createAppointment(appointment: Appointment){
    return this.http.post(baseUrl, appointment).subscribe(
      res => {
        this.toastr.success("Programare adaugata cu succes!");
      },
      error => {
        this.toastr.error("Programare a esuat!");
      }
    )
  }

  deleteAppointment(appointment){
    return this.http.delete(`${baseUrl}/${appointment.id}`).subscribe(
      res => {
        this.toastr.success("Programare stearsa cu succes!");
      },
      error => {
        this.toastr.error("Delete failed!");
      }
    );

  }

  updateAppointment(appointment: Appointment, id: string){
    return this.http.put(`${baseUrl}/${id}`, appointment).subscribe(
      res => {
        this.toastr.success("Programare editata cu succes!");
      },
      error => {
        this.toastr.error("Update failed")
      }
    );
  }

}

export const APPOINTMENT_SERVICE = new InjectionToken<IAppointmentService>('APPOINTMENT_SERVICE');

export const AppointmentServiceProvider: Provider = {
  provide: APPOINTMENT_SERVICE,
  useClass: AppointmentService
}
