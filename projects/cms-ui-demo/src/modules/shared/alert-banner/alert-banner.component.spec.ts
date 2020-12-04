import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertBannerComponent } from './alert-banner.component';

describe('AlertBannerComponent', () => {
    let component: AlertBannerComponent;
    let fixture: ComponentFixture<AlertBannerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AlertBannerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlertBannerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
