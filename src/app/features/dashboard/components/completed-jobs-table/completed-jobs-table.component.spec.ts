import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedJobsTableComponent } from './completed-jobs-table.component';
import { NgxPaginationModule } from 'ngx-pagination';

describe('CompletedJobsTableComponent', () => {
    let component: CompletedJobsTableComponent;
    let fixture: ComponentFixture<CompletedJobsTableComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CompletedJobsTableComponent],
            imports: [NgxPaginationModule],
        });
        fixture = TestBed.createComponent(CompletedJobsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
