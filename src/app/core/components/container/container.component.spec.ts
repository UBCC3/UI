import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ContainerComponent } from './container.component';

describe('ContainerComponent', () => {
    let component: ContainerComponent;
    let fixture: ComponentFixture<ContainerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ContainerComponent],
        });
        fixture = TestBed.createComponent(ContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
