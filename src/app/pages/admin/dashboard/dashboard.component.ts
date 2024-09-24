import { Component, ViewChild } from '@angular/core';
import overviewData from '../../../../assets/data/pages/demo-one/overviewData.json';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexPlotOptions,
  ApexLegend,
  ApexTooltip,
  ApexStates,
  ApexFill,
} from "ng-apexcharts";
import { DatePipe } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  states: ApexStates;
  fill: ApexFill;
  colors: string[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  showContent = false;
  altasPendientes:number = 0;
  medicamentosCaducos:number = 0;
  diasUltimoInventario:number = 0;
  fechas:string[]=[];
  appOverviewData = overviewData;
  filteredOverviewData = this.appOverviewData.filter(item => item.id >= 5 && item.id <= 8);



  ngOnInit() {
    this.showContent = true;

    
    
  }


  //--------
  sellingTab: string = 'week';
  handleClick(tab: string): void {
    this.sellingTab = tab;
  }



  constructor(private datePipe: DatePipe) {
  


   
  }

}
