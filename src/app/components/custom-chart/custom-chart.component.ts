import { Component, OnInit } from '@angular/core';
import { ChartComponent } from '../../shared/components';

import { Options, DataPoint, ChartObject, SeriesObject } from 'highcharts';

import { tap, first } from 'rxjs/operators';

@Component({
  selector: 'ac-custom-chart',
  templateUrl: './custom-chart.component.html',
  styles: ['./custom-chart.component.css']
})
export class CustomChartComponent extends ChartComponent implements OnInit {

  ngOnInit() {
    console.log('ngOnInit - child');
  }

  onChartSave = () => {
    console.log('onChartSave');
    const localOptions: Options = {};

    localOptions.chart = { type: 'column' };
    localOptions.credits = { enabled: false };

    localOptions.series = [
      {
        data: [
          { x: Date.UTC(2018, 6, 16), y: 6 },
          { x: Date.UTC(2018, 6, 17), y: 5 },
          { x: Date.UTC(2018, 6, 18), y: 8 },
          { x: Date.UTC(2018, 6, 19), y: 5 }
        ],
        color: 'greenyellow'
      },
      // {
      //   data: [
      //     { x: Date.UTC(2018, 6, 16), y: 2.5 },
      //     { x: Date.UTC(2018, 6, 17), y: 2 },
      //     { x: Date.UTC(2018, 6, 18), y: 4 },
      //     { x: Date.UTC(2018, 6, 19), y: 3 }
      //   ],
      //   color: 'green'
      // }
    ];


    this.chartComponent.updateChart(localOptions);
  }

  add1 = () => {
    console.log('add');
    const newSerie = {
      type: 'line',
      data: [
        { x: Date.UTC(2018, 6, 16), y: 2.5 },
        { x: Date.UTC(2018, 6, 17), y: 2 },
        { x: Date.UTC(2018, 6, 18), y: 4 },
        { x: Date.UTC(2018, 6, 19), y: 3 }
      ],
      color: 'green'
    };

    const localOptions: Options = {};

    localOptions.series = [...this.chartComponent.chartOptions.series, newSerie];
    // localOptions.chart = { type: 'line' };
    // localOptions.credits = { enabled: true };

    // this.chartComponent.updateChart(localOptions);
    this.chartComponent.addSerie(newSerie);
  }


}