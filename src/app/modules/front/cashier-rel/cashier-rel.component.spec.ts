import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierRelComponent } from './cashier-rel.component';

describe('CashierRelComponent', () => {
  let component: CashierRelComponent;
  let fixture: ComponentFixture<CashierRelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashierRelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierRelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
