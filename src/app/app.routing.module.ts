import { RemoteComponent } from './remote/remote.component';
import { DonationsComponent } from './donations/donations.component';
import { AuthGuard } from './_guards/auth.guard';
import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DonateBloodComponent } from './donate-blood/donate-blood.component';
import { BloodBankComponent } from './blood-bank/blood-bank.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { CampsComponent } from './camps/camps.component';
import { RequestComponent } from './request/request.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'donate-blood', component: DonateBloodComponent },
    { path: 'blood-bank', component: BloodBankComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'user-manager', component: UserManagerComponent, canActivate: [AuthGuard] },
    { path: 'request', component: RequestComponent, canActivate: [AuthGuard] },
    { path: 'camps', component: CampsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'donations', component: DonationsComponent },
    { path: 'remote', component: RemoteComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
