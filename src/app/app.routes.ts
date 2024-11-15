import { Routes } from '@angular/router';
import { GsComponent } from './gs/gs.component';
import { HomeComponent } from './home/home.component';
import { JsonCheckerComponent } from './json-checker/json-checker.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SpedetyprComponent } from './spedetypr/spedetypr.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'gs', component: GsComponent },
  { path: 'json', component: JsonCheckerComponent },
  { path: 'speed', component: SpedetyprComponent },
  { path: '**', component: NotFoundComponent },
];
