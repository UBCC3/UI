import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContainerComponent } from './container/dashboard-container.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { InProgressJobsTableComponent } from './components/in-progress-jobs-table/in-progress-jobs-table.component';
import { CompletedJobsTableComponent } from './components/completed-jobs-table/completed-jobs-table.component';

@NgModule({
    declarations: [DashboardContainerComponent, InProgressJobsTableComponent, CompletedJobsTableComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
    ],
})
export class DashboardModule {}
