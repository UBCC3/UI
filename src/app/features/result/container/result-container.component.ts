import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Job } from '../../../shared/models/jobs.model';
import { AppState } from '../../../store';
import { selectJobDetail, selectJobDetailAreLoaded } from '../../../store/selectors/job.select';
import { loadJobById } from '../../../store/actions/job.actions';

@Component({
    selector: 'app-result-container',
    templateUrl: './result-container.component.html',
    styleUrls: ['./result-container.component.scss'],
})
export class ResultContainerComponent implements OnInit {
    job$: Observable<Job | null> = this.store.pipe(select(selectJobDetail));
    isJobLoaded$: Observable<boolean> = this.store.pipe(select(selectJobDetailAreLoaded));
    jobId: string | null = null;

    constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.jobId = params.get('id');
            if (this.jobId) {
                this.store.dispatch(loadJobById({ jobId: this.jobId }));
            }
        });
    }
}
