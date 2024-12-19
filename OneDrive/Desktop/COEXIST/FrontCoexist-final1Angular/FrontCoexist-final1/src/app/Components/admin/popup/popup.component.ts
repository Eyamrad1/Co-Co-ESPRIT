import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { EvaluationService } from "../../../Services/evaluation.service";
import { Evaluation } from "../../../entity/Evaluation";
import {Chart} from "chart.js";




@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements AfterViewInit {
  chartdata: Evaluation[] = [];

  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];

  canvas: any;
  ctx: any;
  @ViewChild('pieCanvas') pieCanvas!: { nativeElement: any };
  pieChart: any;

  constructor(
    private service: EvaluationService,
    private http: HttpClient
  ) {
  }

  ngAfterViewInit(): void {
    this.pieChartBrowser();

    this.service.retrieveAllEvaluation().subscribe(result => {
      this.chartdata = result as Evaluation[];
      if (this.chartdata != null) {
        for (let i = 0; i < this.chartdata.length; i++) {
          console.log(this.chartdata[i]);
          if (this.chartdata[i].eventPosition) { // Check if label is defined
            this.labeldata.push(this.chartdata[i].eventPosition);
          }
        }
        this.RenderChart(this.labeldata, this.realdata, this.colordata, 'bar', 'barchart');
      }
    });
    console.log(this.chartdata)
  }


  RenderChart(labeldata: any, maindata: any, colordata: any, type: any, id: any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: ['GOOD', 'BAD', 'AVERAGE'],
        datasets: [{
          label: '# of Votes',
          data: maindata,
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)', // GOOD
            'rgba(255, 99, 132, 0.2)', // BAD (red color)
            'rgba(255, 206, 86, 0.2)'  // AVERAGE
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }


  pieChartBrowser(): void {
    this.canvas = this.pieCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    this.http.get<Map<string, number>>('http://localhost:8000/StatEvaluation').subscribe(
      (dataMap) => {
        const labels = Object.keys(dataMap);
        const data = Object.values(dataMap);

        this.pieChart = new Chart(this.ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                backgroundColor: [
                  '#af4c4c',
                  '#BEBEBE',
                  '#ffffff'
                ],
                data: data,
              },
            ],
          },
        });
      },
      (error) => {
        console.log('Erreur lors de la récupération des données du serveur', error);
      }
    );
  }

}
