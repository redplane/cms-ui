import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationSummarizerComponent } from './validation-summarizer.component';

describe('ControlValidatorComponent', () => {
    let component: ValidationSummarizerComponent;
    let fixture: ComponentFixture<ValidationSummarizerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ValidationSummarizerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ValidationSummarizerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
