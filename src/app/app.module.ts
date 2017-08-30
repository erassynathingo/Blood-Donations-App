import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//import { bootstrap } from '@angular/platform-browser-dynamic';
// Import angular2-fusioncharts




// Load FusionCharts Charts module
let Charts = require('fusioncharts/fusioncharts.charts');



import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { AppRoutingModule } from "./app.routing.module";
import { DonateBloodComponent } from "./donate-blood/donate-blood.component";
import { BloodBankComponent } from "./blood-bank/blood-bank.component";
import { APIFunctionsService } from "./services/api-functions.service";
import { Logger } from "./services/logger.service";
import { requestOptionsProvider } from "./services/default-request-options.service";
import { Pnotify } from "./services/pnotify.service";
import { UserManagerComponent } from "./user-manager/user-manager.component";
import { CampsComponent } from "./camps/camps.component";
import { HttpModule, BrowserXhr } from '@angular/http';
import { CORSService } from './services/cors.service';
import * as FusionCharts from 'fusioncharts';  // Import FusionCharts library
import { FusionChartsModule } from 'angular2-fusioncharts';  // Create FusionCharts provider function
//import { FusionChartsComponent } from 'angular2-fusioncharts';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DonateBloodComponent,
    BloodBankComponent,
    UserManagerComponent,
    CampsComponent,
    LoginComponent
    //FusionCharts
    
  ],
  imports: [BrowserModule, AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FusionChartsModule.forRoot(FusionChartsProvider)],
  providers: [APIFunctionsService, Logger, requestOptionsProvider, Pnotify],
  bootstrap: [AppComponent]
})
@NgModule({
//FusionChartsComponent
})
export class AppModule { }
export function FusionChartsProvider() {
  // Resolve charts dependency
  Charts(FusionCharts);

  return FusionCharts;
}

/*bootstrap(AppComponent, [
 HttpModule,
 provide(BrowserXhr,{useClass:CORSService})
]);
*/
