import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { components } from './components';

@NgModule({
  imports: [BrowserAnimationsModule, BrowserModule, FormsModule, SharedModule.forRoot()],
  declarations: [AppComponent, ...components],
  bootstrap: [AppComponent]
})
export class AppModule { }
