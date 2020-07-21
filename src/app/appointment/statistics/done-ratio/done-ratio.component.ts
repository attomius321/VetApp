import {Component, Input, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {Observable} from "rxjs";
import {Appointment} from "../../../entities/appointment.model";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-done-ratio',
  templateUrl: './done-ratio.component.html',
  styleUrls: ['./done-ratio.component.css']
})
export class DoneRatioComponent implements OnInit {

  @Input() appointments: Observable<Array<Appointment>>;
  private doneApp: number = 0;
  private inProgressApp: number = 0;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Done appointments'], ['In progress appointments']];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  constructor() { }

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
        this.pieChartData = [this.doneApp, this.inProgressApp];
      }
    )
  }

}
