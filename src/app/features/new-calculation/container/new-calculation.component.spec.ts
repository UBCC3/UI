import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { NewCalculationComponent } from './new-calculation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppState } from '../../../store';
import { SharedModule } from '../../../shared/shared.module';

// NOTE: test suite is skipped
describe('NewCalculationComponent', () => {
    let component: NewCalculationComponent;
    let fixture: ComponentFixture<NewCalculationComponent>;
    let store: MockStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NewCalculationComponent],
            imports: [BrowserAnimationsModule, SharedModule],
            providers: [provideMockStore<AppState>()],
        });
        fixture = TestBed.createComponent(NewCalculationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        store = TestBed.inject(MockStore);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
