import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierShowComponent } from './cashier-show.component';

describe('CashierShowComponent', () => {
  let component: CashierShowComponent;
  let fixture: ComponentFixture<CashierShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashierShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
