import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { environment} from '../environments/environment';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AppointmentModule} from "./appointment/appointment.module";
import {HomepageModule} from "./homepage/homepage.module";
import { NotfoundComponent } from './notfound/notfound.component';
import {AngularFireAuthModule} from "@angular/fire/auth";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent
  ],
  imports: [
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: "toast-top-right"
    }),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AppointmentModule,
    HomepageModule,
    MatProgressSpinnerModule,
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
