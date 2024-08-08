import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CasesComponent } from './pages/cases/cases.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { SiteServicesComponent } from './pages/site-services/site-services.component';

export const routes: Routes = [
    { path: '', component: HomeComponent,  pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'about-us', component: AboutUsComponent },
    { path: 'cases', component: CasesComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'site-services', component: SiteServicesComponent },
];
