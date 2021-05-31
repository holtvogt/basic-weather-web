import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NextWeekComponent } from './components/next-week/next-week.component';
import { ThisWeekComponent } from './components/this-week/this-week.component';
import { TodayComponent } from './components/today/today.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', component: MainComponent },
  { path: 'home', component: MainComponent },
  { path: 'today', component: TodayComponent },
  { path: 'thisWeek', component: ThisWeekComponent },
  { path: 'nextWeek', component: NextWeekComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}