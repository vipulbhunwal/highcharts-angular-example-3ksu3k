import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { components } from './components';

import { HighchartsModule } from './highcharts.module';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    // Material
    MaterialModule,

    // Highcharts
    HighchartsModule,
  ],
  declarations: [...components],
  exports: [
    // Angular
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    // Material
    MaterialModule,

    // Shared
    ...components
  ],
  entryComponents: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
