import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierListComponent } from './cashier-list.component';

describe('CashierListComponent', () => {
  let component: CashierListComponent;
  let fixture: ComponentFixture<CashierListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashierListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
