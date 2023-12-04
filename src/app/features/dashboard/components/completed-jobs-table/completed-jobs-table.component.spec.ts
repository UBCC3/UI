import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedJobsTableComponent } from './completed-jobs-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialCompletedJobsState, initialInProgressJobsState } from '../../../../store/reducers/job.reducers';

describe('CompletedJobsTableComponent', () => {
    let component: CompletedJobsTableComponent;
    let fixture: ComponentFixture<CompletedJobsTableComponent>;
    let store: MockStore;
    const initialState = {
        job: {
            completedJobs: initialCompletedJobsState,
            inProgressJobs: initialInProgressJobsState,
        },
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CompletedJobsTableComponent],
            imports: [NgxPaginationModule],
            providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(CompletedJobsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        store = TestBed.inject(MockStore);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
