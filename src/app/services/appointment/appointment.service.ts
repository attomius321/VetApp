import {Injectable, InjectionToken, Provider} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Appointment} from "../entities/appointment.model";
import {Observable} from "rxjs";
import * as firebase from 'firebase';

import DocumentReference = firebase.firestore.DocumentReference;
import {ajaxPost} from "rxjs/internal-compatibility";
import {map} from "rxjs/operators";


export interface IAppointmentService {

  getAppointments();

  getAppointmentById(id: string);

  createAppointment(appointment: Appointment);

  deleteAppointment(appointment: Appointment);

  updateAppointment(appointment: Appointment);

}

@Injectable()
export class AppointmentService implements IAppointmentService{

  appointments: Observable<Array<Appointment>>

  appointmentsCollection: AngularFirestoreCollection<Appointment>

  constructor(private firestore: AngularFirestore) {
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

  getAppointments(){
    return this.appointments;
  }

  getAppointmentById(id: string){
    return this.firestore.collection('appointments').doc(id).valueChanges();
  }

  createAppointment(appointment: Appointment){
    const param = JSON.parse(JSON.stringify(appointment));
    return new Promise<any>((resolve, reject) =>{
      this.firestore
        .collection('appointments')
        .add(param)
        .then(res => {}, err => reject(err));
    });
  }

  deleteAppointment(appointment){
    this.firestore.doc('appointments/' + appointment.id).delete();
  }

  updateAppointment(appointment: Appointment){
    delete appointment.id;
    this.firestore.doc('appointments/' + appointment.id).update(appointment);
  }

}

export const APPOINTMENT_SERVICE = new InjectionToken<IAppointmentService>('APPOINTMENT_SERVICE');

export const AppointmentServiceProvider: Provider = {
  provide: APPOINTMENT_SERVICE,
  useClass: AppointmentService
}
