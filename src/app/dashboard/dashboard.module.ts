import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { ToolsComponent } from './tools/tools.component';
import { OverviewComponent } from './overview/overview.component';
import { FeederComponent } from './feeder/feeder.component';
import { AnalyticsComponent } from './analytics/analytics.component';

import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card'
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { SummaryComponent } from './overview/summary/summary.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    ToolsComponent,
    OverviewComponent,
    FeederComponent,
    AnalyticsComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDividerModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class DashboardModule { }
