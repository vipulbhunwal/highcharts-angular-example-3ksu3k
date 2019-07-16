import { Optional, ViewChild, Output, OnInit, Component, ChangeDetectionStrategy, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

import * as Highcharts from 'highcharts';
import * as _ from 'lodash';

export const dateTimeLabelFormats = {
  millisecond: '%a, %e %b, %H:%M:%S.%L',
  second: '%a, %e %b, %H:%M:%S',
  minute: '%a, %e %b, %H:%M',
  hour: '%a, %e %b, %H:%M',
  day: '%a, %e %b, %Y',
  week: 'Week from %a, %e %b, %Y',
  month: '%b %Y',
  year: '%Y'
}

@Component({
  selector: 'ac-chart',
  exportAs: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ChartComponent implements OnInit {
  @Output() readonly chartSave = new EventEmitter<void>();

  // For child reference
  @ViewChild(ChartComponent) chartComponent: ChartComponent;

  // Highcharts Angular
  highcharts = Highcharts;
  chartConstructor = 'chart';
  chartOptions: Highcharts.Options;
  chartCallback = this.callback.bind(this)
  oneToOneFlag = true;

  private updateFlagSubject = new BehaviorSubject<boolean>(false);
  updateFlag$ = this.updateFlagSubject.asObservable().pipe(filter(u => !!u));

  private chartObjectSubject: Subject<Highcharts.ChartObject | undefined> = new BehaviorSubject(undefined);
  // tslint:disable-next-line:member-ordering
  chartObject$: Observable<Highcharts.ChartObject> = this.chartObjectSubject.asObservable().pipe(filter(c => !!c), tap(t => console.log(t)));

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {

    // this.chartOptions = {
    //   series: [{
    //     data: [1, 2, 3]
    //   }]
    // }
    console.log('ngOnInit - parent');
    this.initChart();
  }

  ngAfterViewInit() {
    // this.initChart();

  }

  onUpdateChange = (flag: boolean) => this.updateFlagSubject.next(flag);

  updateFromParent = () => {
    console.log('updateFromParent');
    this.updateChart({ chart: { type: 'line' } });
  }

  /** Add serie
   * @deprecated
   */
  addSerie = <T extends Highcharts.IndividualSeriesOptions>(newSerie: T) => {
    const newSeries = this.chartOptions.series ? [...this.chartOptions.series, newSerie] : [newSerie];
    this.updateChart({ series: [...newSeries] });
  };

  updateChart = (options: Highcharts.Options) => {
    // By default if the value of the object property is undefined lodash won't use this but keeps
    // the original after using _.merge(). We can customize the merge with _.mergeWith().
    // If we return undefined inside the customizer function lodash handles the merge like above not keeping the undefined value.
    // With deleting the property we trick lodash and with this the property gets undefined value after the merge.
    const customizer = (_objValue: Optional, srcValue: Optional, key: any, object: any) => {
      if (srcValue === undefined) delete object[key];
    };

    (this.chartOptions = _.mergeWith(this.chartOptions, options, customizer));
    this.updateFlagSubject.next(true);
    // console.log(this.chartOptions.series);
  };

  exportChartLocal = (type = 'image/png', filename = 'my-chart') =>
    this.chartObject$
      .pipe(first(), tap(c => console.log(c.options.chart.type)))
      .subscribe(chart => chart.exportChartLocal({ type, filename, sourceWidth: 2048 }));

  private initChart = () => {
    const chartOptions: Highcharts.Options = {};

    chartOptions.chart = { type: 'column', height: 400 },

      chartOptions.title = { text: null };

    chartOptions.tooltip = {
      shared: true
    }

    chartOptions.xAxis = [{
      type: 'datetime',
      dateTimeLabelFormats
    }];

    // chartOptions.series = []; 

    chartOptions.lang = { loading: 'Loading ...', noData: 'No data available, please try again' };

    // Exporting Module settings
    chartOptions.exporting = {
      enabled: true,
      fallbackToExportServer: false,
      chartOptions: {
        chart: { backgroundColor: 'white' }
      }
    };

    // Nodata module settings
    chartOptions.noData = {
      style: { fontSize: '15px', color: 'gray' },
      position: { align: 'left' }
    };

    this.chartOptions = chartOptions;
    // this.updateFlagSubject.next(true);

    // this.chartSave.emit();
  }

  private callback(chart: Highcharts.ChartObject) {
    console.log('callback');
    const options: Highcharts.Options = chart.options;
    // console.log(options.chart.type);
    // chart.showLoading();

    // Emit the chart object once initialised
    this.chartObjectSubject.next(chart);

    this.chartSave.emit();

  }
}