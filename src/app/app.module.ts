import { DonationsComponent } from './donations/donations.component';
import { AboutComponent } from './about/about.component';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//import { bootstrap } from '@angular/platform-browser-dynamic';

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
import { HttpModule, BrowserXhr } from "@angular/http";
import { CORSService } from "./services/cors.service";
import { AgmCoreModule } from '@agm/core';
import { ChartsModule} from 'ng2-charts';
import { AuthGuard } from './_guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DonateBloodComponent,
    BloodBankComponent,
    UserManagerComponent,
    CampsComponent,
    LoginComponent,
    DonationsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB4BuwyFTlS1cU1EODuewOZiVH8Fto38rs'
    })
  ],
  providers: [APIFunctionsService, Logger, requestOptionsProvider, Pnotify, AuthGuard],
  bootstrap: [AppComponent]
})
@NgModule({})
export class AppModule {}
/*bootstrap(AppComponent, [
 HttpModule,
 provide(BrowserXhr,{useClass:CORSService})
]);
*/
