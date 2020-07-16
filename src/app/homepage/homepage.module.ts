import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage-component/homepage.component';
import {HomepageRoutingModule} from "./homepage-routing.module";



@NgModule({
    declarations: [HomepageComponent],
    exports: [
        HomepageComponent
    ],
    imports: [
        CommonModule,
        HomepageRoutingModule
    ]
})
export class HomepageModule { }
