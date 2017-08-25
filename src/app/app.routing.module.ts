import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DonateBloodComponent } from './donate-blood/donate-blood.component';
import { BloodBankComponent } from './blood-bank/blood-bank.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { CampsComponent } from './camps/camps.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'donate-blood', component: DonateBloodComponent },
    { path: 'blood-bank', component: BloodBankComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user-manager', component: UserManagerComponent },
    { path: 'camps', component: CampsComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
