import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { DonateComponent } from './components/donate/donate.component';
import { ExploreComponent } from './components/explore/explore.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'donate', component: DonateComponent },
    { path: 'explore', component: ExploreComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
