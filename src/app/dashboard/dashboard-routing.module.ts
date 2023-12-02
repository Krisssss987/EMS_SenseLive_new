import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { FeederComponent } from './feeder/feeder.component';
import { OverviewComponent } from './overview/overview.component';
import { ToolsComponent } from './tools/tools.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'feeder', component: FeederComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'tools', component: ToolsComponent},
  { path: 'report', component: ReportComponent},
  { path: '', redirectTo: 'overview', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
