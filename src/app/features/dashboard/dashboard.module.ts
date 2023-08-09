import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContainerComponent } from './container/dashboard-container.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    declarations: [DashboardContainerComponent],
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
