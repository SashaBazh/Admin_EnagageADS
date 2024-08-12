import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BanerComponent } from './pages/baner/baner.component';
import { TaskComponent } from './pages/task/task.component';
import { PrizeComponent } from './pages/prizes/prizes.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { MailingsComponent } from './pages/mailings/mailings.component';
import { PayoutsComponent } from './pages/payouts/payouts.component';

export const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'baner', component: BanerComponent },
    { path: 'task', component: TaskComponent },
    { path: 'prize', component: PrizeComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'mailings', component: MailingsComponent },
    { path: 'payouts', component: PayoutsComponent },
];