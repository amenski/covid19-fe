import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import {first} from 'rxjs/operators';
import { DailyStatService } from 'app/services/daily-status.service';
import { ModelDailyCaseStatusList, ModelDailyCaseStatus } from 'app/generated';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public canvas : any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;

  private caseStats: Array<ModelDailyCaseStatus>;
  private totalCases: number[];

  constructor(private dailyStatusService: DailyStatService) {}

  ngOnInit() {
    this.dailyStatusService.getAllCaseStats().subscribe(result => {
        this.caseStats = result.list;
    })


    let gradientChartOptionsConfigurationWithTooltipRed: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest'
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: '#9a9a9a'
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(233,32,16,0.1)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            padding: 20,
            fontColor: '#9a9a9a'
          }
        }]
      }
    };





    this.canvas = document.getElementById('chartLineRed');
    this.ctx = this.canvas.getContext('2d');

    let gradientStroke1 = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke1.addColorStop(1, 'rgba(233,32,16,0.2)');
    gradientStroke1.addColorStop(0.4, 'rgba(233,32,16,0.0)');
    gradientStroke1.addColorStop(0, 'rgba(233,32,16,0)'); //red colors




    this.canvas = document.getElementById('chartLineGreen');
    this.ctx = this.canvas.getContext('2d');


    let gradientStroke2 = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke2.addColorStop(1, 'rgba(66,134,121,0.15)');
    gradientStroke2.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
    gradientStroke2.addColorStop(0, 'rgba(66,134,121,0)'); //green colors





    let chart_labels = ['MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    this.datasets = [
      [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
      [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
      [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
    ];
    this.data = this.datasets[0];



    this.canvas = document.getElementById('chartBig1');
    this.ctx = this.canvas.getContext('2d');

    let gradientStroke3 = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke3.addColorStop(1, 'rgba(233,32,16,0.2)');
    gradientStroke3.addColorStop(0.4, 'rgba(233,32,16,0.0)');
    gradientStroke3.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

    let config = {
      type: 'line',
      data: {
        labels: chart_labels,
        datasets: [{
          label: 'My First dataset',
          fill: true,
          backgroundColor: gradientStroke3,
          borderColor: '#ec250d',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#ec250d',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#ec250d',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.data,
        }]
      },
      options: gradientChartOptionsConfigurationWithTooltipRed
    };
    this.myChartData = new Chart(this.ctx, config);


    this.canvas = document.getElementById('CountryChart');
    this.ctx  = this.canvas.getContext('2d');
    let gradientStroke4 = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke4.addColorStop(1, 'rgba(29,140,248,0.2)');
    gradientStroke4.addColorStop(0.4, 'rgba(29,140,248,0.0)');
    gradientStroke4.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors



  }
  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }
}
