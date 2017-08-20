import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing.module';
import { DonateBloodComponent } from './donate-blood/donate-blood.component';
import { BloodBankComponent } from './blood-bank/blood-bank.component';
import { APIFunctionsService } from './services/api-functions.service';
import { Logger } from './services/logger.service';
import {requestOptionsProvider} from './services/default-request-options.service';
import { Pnotify } from './services/pnotify.service';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, DashboardComponent, DonateBloodComponent, BloodBankComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule
  ],
  providers: [APIFunctionsService, Logger, requestOptionsProvider, Pnotify],
  bootstrap: [AppComponent]
})
export class AppModule { }
