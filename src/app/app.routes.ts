import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BanerComponent } from './pages/baner/baner.component';
import { TaskComponent } from './pages/task/task.component';
import { PrizeComponent } from './pages/prizes/prizes.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { MailingsComponent } from './pages/mailings/mailings.component';
import { PayoutsComponent } from './pages/payouts/payouts.component';
import { TaskVerificationComponent } from './pages/task-verification/task-verification.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { TasksViewComponent } from './pages/tasks-view/tasks-view.component';
import { ServiceAssignmentsComponent } from './pages/service-assignments/service-assignments.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'baner', component: BanerComponent, canActivate: [AuthGuard] },
    { path: 'task', component: TaskComponent, canActivate: [AuthGuard] },
    { path: 'prize', component: PrizeComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'mailings', component: MailingsComponent, canActivate: [AuthGuard] },
    { path: 'payouts', component: PayoutsComponent, canActivate: [AuthGuard] },
    { path: 'task-verification', component: TaskVerificationComponent, canActivate: [AuthGuard] },
    { path: 'task-view', component: TasksViewComponent, canActivate: [AuthGuard] },
    { path: 'service_assignments', component: ServiceAssignmentsComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }