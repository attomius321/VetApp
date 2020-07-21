import { Injectable } from '@angular/core';
import {ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";
import * as pluginDataLabels from "chartjs-plugin-datalabels";

@Injectable({
  providedIn: 'root'
})
export class PieChartService {
  private _pieChartOptions: ChartOptions = {
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
  private _pieChartLabels: Label[] = [];
  private _pieChartData: number[] = [];
  private _pieChartType: ChartType = 'pie';
  private _pieChartLegend = true;
  private _pieChartPlugins = [pluginDataLabels];
  private _pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  constructor() { }


  get pieChartOptions(): Chart.ChartOptions {
    return this._pieChartOptions;
  }

  get pieChartLabels(): Label[] {
    return this._pieChartLabels;
  }

  get pieChartData(): number[] {
    return this._pieChartData;
  }

  get pieChartType(): Chart.ChartType {
    return this._pieChartType;
  }

  get pieChartLegend(): boolean {
    return this._pieChartLegend;
  }

  get pieChartPlugins() {
    return this._pieChartPlugins;
  }

  get pieChartColors(): { backgroundColor: string[] }[] {
    return this._pieChartColors;
  }


  set pieChartOptions(value: Chart.ChartOptions) {
    this._pieChartOptions = value;
  }

  set pieChartLabels(value: Label[]) {
    this._pieChartLabels = value;
  }

  set pieChartData(value: number[]) {
    this._pieChartData = value;
  }

  set pieChartType(value: Chart.ChartType) {
    this._pieChartType = value;
  }

  set pieChartLegend(value: boolean) {
    this._pieChartLegend = value;
  }

  set pieChartPlugins(value) {
    this._pieChartPlugins = value;
  }

  set pieChartColors(value: { backgroundColor: string[] }[]) {
    this._pieChartColors = value;
  }
}
