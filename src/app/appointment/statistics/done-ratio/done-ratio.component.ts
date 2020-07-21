import {Component, Input, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {Observable} from "rxjs";
import {Appointment} from "../../../entities/appointment.model";
import {map} from "rxjs/operators";
import {PieChartService} from "../../../services/chart-creator/pie-chart.service";


@Component({
  selector: 'app-done-ratio',
  templateUrl: './done-ratio.component.html',
  styleUrls: ['./done-ratio.component.css']
})
export class DoneRatioComponent implements OnInit {

  @Input() appointments: Observable<Array<Appointment>>;
  private doneApp: number = 0;
  private inProgressApp: number = 0;

  constructor(public pieCreator: PieChartService) {
    this.pieCreator = new PieChartService();
    this.pieCreator.pieChartLabels = [['Done appointments'], ['In progress appointments']];
  }

  ngOnInit(): void {
    this.appointments.pipe(
      map(appArray => appArray.map(app => app.status)),
    ).subscribe(
      status => {
        for(let i=0; i<status.length; i++){
          if(status[i] == 'DONE'){
            this.doneApp++;
          } else {
            this.inProgressApp++;
          }
        }
        this.pieCreator.pieChartData = [this.doneApp, this.inProgressApp];
      }
    )
  }

}
