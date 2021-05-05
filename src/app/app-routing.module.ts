import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IsLoggedIn } from './isLoggedIn.guard';

import { ListComponent } from './main/list/list.component';
import { PageComponent } from './main/list/page/page.component';
import { MainComponent } from './main/main.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'search', component: ListComponent },
  { path: 'page/:pageTitle', component: PageComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'authentication', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [IsLoggedIn] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
