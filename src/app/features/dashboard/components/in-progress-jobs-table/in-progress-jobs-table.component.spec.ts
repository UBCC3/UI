import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { InProgressJobsTableComponent } from './in-progress-jobs-table.component';
import { initialCompletedJobsState, initialInProgressJobsState } from '../../../../store/reducers/job.reducers';

describe('InProgressJobsTableComponent', () => {
    let component: InProgressJobsTableComponent;
    let fixture: ComponentFixture<InProgressJobsTableComponent>;
    let store: MockStore;
    const initialState = {
        job: {
            completedJobs: initialCompletedJobsState,
            inProgressJobs: initialInProgressJobsState,
        },
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [InProgressJobsTableComponent],
            providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(InProgressJobsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        store = TestBed.inject(MockStore);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
