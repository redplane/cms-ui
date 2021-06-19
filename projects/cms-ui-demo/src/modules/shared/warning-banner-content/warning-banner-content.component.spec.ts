import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningBannerContentComponent } from './warning-banner-content.component';

describe('AlertBannerComponent', () => {
    let component: WarningBannerContentComponent;
    let fixture: ComponentFixture<WarningBannerContentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WarningBannerContentComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WarningBannerContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
