import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePrintComponent } from './service-print.component';

describe('ServicePrintComponent', () => {
  let component: ServicePrintComponent;
  let fixture: ComponentFixture<ServicePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
