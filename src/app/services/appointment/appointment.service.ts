import {Injectable, InjectionToken, Provider} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Appointment} from "../../entities/appointment.model";
import {Observable} from "rxjs";
import * as firebase from 'firebase';

import DocumentReference = firebase.firestore.DocumentReference;
import {ajaxPost} from "rxjs/internal-compatibility";
import {map} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";


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
              private toastr: ToastrService) {
    this.appointmentsCollection = firestore.collection<Appointment>('appointments', ref => ref.orderBy('unix', 'desc'));
    this.appointments = this.appointmentsCollection.snapshotChanges().
    pipe(
      map(actions => actions.map(a => {
        const data = (a.payload.doc.data() as Appointment);
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getAppointments(): Observable<Array<Appointment>>{
    return this.appointments;
  }

  getAppointmentById(id: string){
    return this.firestore.collection('appointments').doc(id).valueChanges();
  }

  getAppointmentsByAnimal(animal: string){
    return this.firestore.collection('appointments').ref.where("animal", "==", animal).get();
  }

  createAppointment(appointment: Appointment){
    const param = JSON.parse(JSON.stringify(appointment));
    return new Promise<any>((resolve, reject) =>{
      this.firestore
        .collection('appointments')
        .add(param)
        .then(res => {
          this.toastr.success("Programare adaugata cu succes!")
        },
              err => {
            reject(err),
            this.toastr.error("Adaugare esuata!")});
    });
  }

  deleteAppointment(appointment){
    this.firestore.doc('appointments/' + appointment.id).delete().then(
      res => {
        this.toastr.success("Programare stearsa cu succes!");
      }
    );
  }

  updateAppointment(appointment: Appointment, id: string){
    delete appointment.id;
    this.firestore.doc('appointments/' + id).update(appointment).then(
      res => {
        this.toastr.success("Programare editata cu succes!");
      },
    );
  }

}

export const APPOINTMENT_SERVICE = new InjectionToken<IAppointmentService>('APPOINTMENT_SERVICE');

export const AppointmentServiceProvider: Provider = {
  provide: APPOINTMENT_SERVICE,
  useClass: AppointmentService
}
