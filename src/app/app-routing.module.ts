import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotfoundComponent} from "./notfound/notfound.component";
import {AuthGuard} from "./guard/auth.guard";


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', loadChildren: './homepage/homepage.module#HomepageModule', data: {preload: true}},
  {path: 'appointments', loadChildren: './appointment/appointment.module#AppointmentModule', data: {preload: true}, canActivate: [AuthGuard]},
  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
