import { NgModule } from '@angular/core';

import { HighchartsChartModule } from 'highcharts-angular';

import * as Highcharts from 'highcharts';

// Highcharts modules
import BoostCanvas from 'highcharts/modules/boost-canvas';
import Boost from 'highcharts/modules/boost.src';
import HighchartsMore from 'highcharts/highcharts-more.src';
import Exporting from 'highcharts/modules/exporting.src';
import Heatmap from 'highcharts/modules/heatmap.src.js';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display.src';
import OfflineExporting from 'highcharts/modules/offline-exporting.src';
import SolidGauge from 'highcharts/modules/solid-gauge.src.js';
// import Annotations from 'highcharts/modules/annotations.src';

@NgModule({
  exports: [HighchartsChartModule],
})
export class HighchartsModule {
  constructor() {
    const globalOptions: Highcharts.GlobalObject = {
      // http://api.highcharts.com/highstock/global.timezoneOffset
      timezoneOffset: new Date().getTimezoneOffset()
    };

    Highcharts.setOptions({
      global: globalOptions
    });

    // Load modules
    BoostCanvas(Highcharts);
    Boost(Highcharts);
    HighchartsMore(Highcharts);
    Exporting(Highcharts);
    Heatmap(Highcharts);
    NoDataToDisplay(Highcharts);
    OfflineExporting(Highcharts);
    SolidGauge(Highcharts);
    // Annotations(Highcharts);
  }
}
