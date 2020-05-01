import {Component, OnInit, ViewChild} from '@angular/core';
import {ModelDailyCaseStatus} from "../../models/modelDailyCaseStatus";
import {DailyStatusService} from "../../services/daily-status.service";
import Chart from 'chart.js';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {AlertService} from "../../services/alert.service";


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /*Chart variables*/
  public canvas : any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;

  public myChart1;
  public myChart2;
  public myChart3;
  public myChart4;
  public gradientChartOptionsLogarithmicConfiguration: any;
  public gradientChartOptionsLinearConfiguration: any;

  /*variables to toggle between linear and logarithmic scales*/
  public clicked1: boolean = true;
  public clicked2: boolean = false;

  public totalDeath: number;
  public totalCase: any;
  public totalActiveCase: number;
  public maxNewCase: number;

  caseStats: ModelDailyCaseStatus[];
  public dailyTotalDeaths: number[] = [];
  public dailyTotalCases: number[] = [];
  public dailyNewCases: number[] = [];
  public dailyActiveCases: number[] = [];

  displayedColumns: string[] = ['reportDate', 'totalCases', 'newCases', 'totalDeaths', 'newDeaths', 'activeCases', 'criticalCases', 'recovered'];
  dataSource: any; /*holds cases stat data from BE*/

  constructor(private dailyStatusService: DailyStatusService, private alertService: AlertService) {
    this.dailyStatusService.getAllCaseStats().subscribe(result=>{
      this.caseStats = result.returnValue.list;

      this.dataSource =  new MatTableDataSource(this.caseStats);
      this.dataSource.sort = this.sort;

      this.dailyTotalDeaths = this.caseStats.map(res=>{
        return res.totalDeaths;
      })
      this.dailyTotalCases = this.caseStats.map(res=>{
        return res.totalCases;
      })
      this.dailyNewCases = this.caseStats.map(res=>{
        return res.newCases;
      })
      this.dailyActiveCases = this.caseStats.map(res=>{
        return res.activeCases;
      })
      this.maxNewCase = Math.max(...this.dailyNewCases);


      this.totalCase = Math.max(...this.dailyTotalCases)
      this.totalActiveCase = this.dailyActiveCases[this.dailyActiveCases.length-1];
      this.totalDeath = Math.max(...this.dailyTotalDeaths);

      let gradientChartOptionsConfigurationWithTooltipBlue: any = {
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
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#2380f7"
            }
          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#2380f7"
            }
          }]
        }
      };

      let gradientChartOptionsConfigurationWithTooltipPurple: any = {
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
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(225,78,202,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }]
        }
      };

      this.gradientChartOptionsLinearConfiguration = {
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
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            type: 'linear',
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(233,32,16,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }]
        }
      };


      this.gradientChartOptionsLogarithmicConfiguration = {
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
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            type: 'logarithmic',
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(233,32,16,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }]
        }
      };

      let gradientChartOptionsConfigurationWithTooltipOrange: any = {
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
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 110,
              padding: 20,
              fontColor: "#ff8a76"
            }
          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(220,53,69,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#ff8a76"
            }
          }]
        }
      };

      let gradientChartOptionsConfigurationWithTooltipGreen: any = {
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
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(0,242,195,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }]
        }
      };


      let gradientBarChartConfiguration: any = {
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
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{

            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 120,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }],

          xAxes: [{

            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }]
        }
      };

      this.canvas = document.getElementById("totalDeathChart");
      this.ctx = this.canvas.getContext("2d");

      let gradientStroke1 = this.ctx.createLinearGradient(0, 10, 0, 5);

      gradientStroke1.addColorStop(1, 'rgba(233,32,16,0.2)');
      gradientStroke1.addColorStop(0.4, 'rgba(233,32,16,0.0)');
      gradientStroke1.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

      /*****************************************TOTAL DEATHS****************************************************/

      let data1 = {
        labels: ['MAR 13', 'MAR 14', 'MAR 15', 'MAR 16', 'MAR 17', 'MAR 18', 'MAR 19', 'MAR 20', 'MAR 21', 'MAR 22',
          'MAR 23', 'MAR 24', 'MAR 25', 'MAR 26', 'MAR 27', 'MAR 28', 'MAR 29', 'MAR 30', 'MAR 31',
          'APR 01', 'APR 02', 'APR 03', 'APR 04', 'APR 05', 'APR 06', 'APR 07', 'APR 08', 'APR 09', 'APR 10', 'APR 11',
          'APR 12', 'APR 13', 'APR 14', 'APR 15', 'APR 16', 'APR 17', 'APR 18',
          'APR 19', 'APR 20', 'APR 21', 'APR 22', 'APR 23', 'APR 24', 'APR 25',
          'APR 26', 'APR 27', 'APR 28', 'APR 29', 'APR 30', 'MAY 01', 'MAY 02', 'MAY 03', 'MAY 04'],
        datasets: [{
          label: "Total Deaths Stat",
          fill: true,
          backgroundColor: gradientStroke1,
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
          pointRadius: 1,
          //data: [80, 100, 70, 80, 120, 80],
          data: this.dailyTotalDeaths,
        }]
      };
      this.myChart1 = new Chart(this.ctx, {
        type: 'line',
        data: data1,
        options: this.gradientChartOptionsLinearConfiguration
      });


      /**************************************************CURRENTLY INFECTED************************************************/
      this.canvas = document.getElementById("activeCaseChart");
      this.ctx = this.canvas.getContext("2d");


      let gradientStroke2 = this.ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke2.addColorStop(1, 'rgba(66,134,121,0.15)');
      gradientStroke2.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
      gradientStroke2.addColorStop(0, 'rgba(66,134,121,0)'); //green colors

      let data2 = {
        labels: ['MAR 13', 'MAR 14', 'MAR 15', 'MAR 16', 'MAR 17', 'MAR 18', 'MAR 19', 'MAR 20', 'MAR 21', 'MAR 22',
          'MAR 23', 'MAR 24', 'MAR 25', 'MAR 26', 'MAR 27', 'MAR 28', 'MAR 29', 'MAR 30', 'MAR 31',
          'APR 01', 'APR 02', 'APR 03', 'APR 04', 'APR 05', 'APR 06', 'APR 07', 'APR 08', 'APR 09', 'APR 10', 'APR 11',
          'APR 12', 'APR 13', 'APR 14', 'APR 15', 'APR 16', 'APR 17', 'APR 18',
          'APR 19', 'APR 20', 'APR 21', 'APR 22', 'APR 23', 'APR 24', 'APR 25',
          'APR 26', 'APR 27', 'APR 28', 'APR 29', 'APR 30', 'MAY 01', 'MAY 02', 'MAY 03', 'MAY 04'],
        datasets: [{
          label: "Currently active cases",
          fill: true,
          backgroundColor: gradientStroke2,
          borderColor: '#00d6b4',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#00d6b4',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#00d6b4',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 1,
          data: this.dailyActiveCases,
        }]
      };

      /*****************************************TOTAL COVID-19 CASES****************************************************/
      this.myChart2 = new Chart(this.ctx, {
        type: 'line',
        data: data2,
        options: gradientChartOptionsConfigurationWithTooltipGreen

      });

      let chart_labels = ['MAR 13', 'MAR 14', 'MAR 15', 'MAR 16', 'MAR 17', 'MAR 18', 'MAR 19', 'MAR 20', 'MAR 21', 'MAR 22',
        'MAR 23', 'MAR 24', 'MAR 25', 'MAR 26', 'MAR 27', 'MAR 28', 'MAR 29', 'MAR 30', 'MAR 31',
        'APR 01', 'APR 02', 'APR 03', 'APR 04', 'APR 05', 'APR 06', 'APR 07', 'APR 08', 'APR 09', 'APR 10', 'APR 11',
        'APR 12', 'APR 13', 'APR 14', 'APR 15', 'APR 16', 'APR 17', 'APR 18',
        'APR 19', 'APR 20', 'APR 21', 'APR 22', 'APR 23', 'APR 24', 'APR 25',
        'APR 26', 'APR 27', 'APR 28', 'APR 29', 'APR 30', 'MAY 01', 'MAY 02', 'MAY 03', 'MAY 04'];
      this.datasets = [
        [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
        [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
        [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
      ];
      //  this.data = this.datasets[0];
      this.data = this.dailyTotalCases;

      this.canvas = document.getElementById("totalCaseChart");
      this.ctx = this.canvas.getContext("2d");

      let gradientStroke3 = this.ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke3.addColorStop(1, 'rgba(233,32,16,0.2)');
      gradientStroke3.addColorStop(0.4, 'rgba(233,32,16,0.0)');
      gradientStroke3.addColorStop(0, 'rgba(233,32,16,0)'); //red colors

      // let config = {
      //
      // };
      this.myChartData = new Chart(this.ctx, {
        type: 'line',
        data: {
          type: 'category',
          labels: chart_labels,
          datasets: [{
            label: "Total Covid-19 Cases",
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
            pointRadius: 1,
            data: this.data,
          }]
        },
        options: this.gradientChartOptionsLinearConfiguration});


      /*********************************************DAILY NEW CASES********************************************/
      this.canvas = document.getElementById("dailyNewCaseChart");
      this.ctx  = this.canvas.getContext("2d");
      let gradientStroke4 = this.ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke4.addColorStop(1, 'rgba(29,140,248,0.2)');
      gradientStroke4.addColorStop(0.4, 'rgba(29,140,248,0.0)');
      gradientStroke4.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors


      this.myChart3 = new Chart(this.ctx, {
        type: 'bar',
        responsive: true,
        legend: {
          display: false
        },
        data: {
          labels: ['MAR 13', 'MAR 14', 'MAR 15', 'MAR 16', 'MAR 17', 'MAR 18', 'MAR 19', 'MAR 20', 'MAR 21', 'MAR 22',
            'MAR 23', 'MAR 24', 'MAR 25', 'MAR 26', 'MAR 27', 'MAR 28', 'MAR 29', 'MAR 30', 'MAR 31',
            'APR 01', 'APR 02', 'APR 03', 'APR 04', 'APR 05', 'APR 06', 'APR 07', 'APR 08', 'APR 09', 'APR 10', 'APR 11',
            'APR 12', 'APR 13', 'APR 14', 'APR 15', 'APR 16', 'APR 17', 'APR 18',
            'APR 19', 'APR 20', 'APR 21', 'APR 22', 'APR 23', 'APR 24', 'APR 25',
            'APR 26', 'APR 27', 'APR 28', 'APR 29', 'APR 30', 'MAY 01', 'MAY 02', 'MAY 03', 'MAY 04'],
          datasets: [{
            label: "New cases",
            fill: true,
            backgroundColor: gradientStroke4,
            hoverBackgroundColor: gradientStroke4,
            borderColor: '#1f8ef1',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: this.dailyNewCases
          }]
        },
        options: gradientBarChartConfiguration
      });



    }, error => this.alertService.warn("Error Loading Daily Status Data. Couldn't connect to server. Check your connection"))
  }

  ngOnInit() {
  }

  convertDate(date: string){
    let d =  new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }
  public updateOptions() {
  //   alert("updating scale: "+this.myChart1.options.scales.yAxes.type);
  //
  //  // if( this.myChart2.options===this.gradientChartOptionsLinearConfiguration){
  //     this.myChart2.options = this.gradientChartOptionsLogarithmicConfiguration;
  // ///  }
  //  // if( this.myChart2.options===this.gradientChartOptionsLogarithmicConfiguration){
  //    // this.myChart2.options = this.gradientChartOptionsLinearConfiguration;
  //  // }
  //
  //   this.myChart2.update();
  //  this.myChartData.data.datasets[0].data =  this.data;
  //  this.myChartData.update();
  }

}
