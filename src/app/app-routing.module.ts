import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentRegistrationComponent } from "./appointment/appointment-registration/appointment-registration.component";
import {AppointmentListComponent} from "./appointment/appointment-list/appointment-list.component";
import {HomepageComponent} from "./homepage/homepage-component/homepage.component";
import {NotfoundComponent} from "./notfound/notfound.component";


const routes: Routes = [
  {path: '', redirectTo: '/homepage', pathMatch: 'full'},
  {path: 'home', loadChildren: './homepage/homepage.module#HomepageModule', data:{preload: true}},
  {path: 'appointments', loadChildren: './appointment/appointment.module#AppointmentModule', data: {preload: true}},
  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
