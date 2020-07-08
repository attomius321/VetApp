import {Injectable, InjectionToken, Provider} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from "@angular/fire/firestore";
import {Appointment} from "../entities/appointment.model";
import {Observable} from "rxjs";
import * as firebase from 'firebase';

import DocumentReference = firebase.firestore.DocumentReference;
import {ajaxPost} from "rxjs/internal-compatibility";
import {map} from "rxjs/operators";
import App = firebase.app.App;

export interface IAppointmentService {

  getAppointments();

  createAppointment(appointment: Appointment);

  deleteAppointment(appointment: Appointment);

  updateAppointment(appointment: Appointment);

}

@Injectable()
export class AppointmentService implements IAppointmentService{

  appointments: Observable<Appointment[]>

  appointmentsCollection: AngularFirestoreCollection<Appointment>

  constructor(private firestore: AngularFirestore) {
    this.appointmentsCollection = firestore.collection<Appointment>('appointments')

    this.appointments = this.appointmentsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Appointment;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getAppointments(){
    return this.appointments;
  }

  createAppointment(appointment: Appointment){
    return new Promise<any>((resolve, reject) =>{
      this.firestore
        .collection('appointments')
        .add(appointment)
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
