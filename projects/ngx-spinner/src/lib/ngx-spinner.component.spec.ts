import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSpinnerComponent } from './ngx-spinner.component';

describe('NgxSpinnerComponent', () => {
  let component: NgxSpinnerComponent;
  let fixture: ComponentFixture<NgxSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
