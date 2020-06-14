import { Component, OnInit } from '@angular/core';
import { ChartService as DashboardService } from './dashboard-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboradComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          
        },
        {
          id: 'y-axis-1',
          position: 'right'
        }
      ]
    }
  };

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    { data: [], label: 'Confirmed Cases', yAxisID: 'y-axis-0', width: 1000, backgroundColor: 'rgba(0, 0, 255)' },
    { data: [], label: 'Active Cases', yAxisID: 'y-axis-1', width: 1000, backgroundColor: 'rgba(255, 0, 0)'}
  ];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dashboardService.getApiData().subscribe((res) => {
      this.pushData(res);
    });
  }

  pushData(res) {
    let data = res.cases_time_series;
    let sumofActiveDeceased = 0;
    for (let i = 0; i < data.length; i+=5) {
      this.barChartLabels.push(data[i].date);
      this.barChartData[0].data.push(data[i].dailyconfirmed);
      
      sumofActiveDeceased = +data[i].totaldeceased + (+data[i].totalrecovered);
      this.barChartData[1].data.push(+data[i].totalconfirmed - sumofActiveDeceased);
    }
  }
}
