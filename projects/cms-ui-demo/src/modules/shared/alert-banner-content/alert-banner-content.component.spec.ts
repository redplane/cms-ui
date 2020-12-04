import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertBannerContentComponent } from './alert-banner-content.component';

describe('AlertBannerComponent', () => {
    let component: AlertBannerContentComponent;
    let fixture: ComponentFixture<AlertBannerContentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AlertBannerContentComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlertBannerContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
