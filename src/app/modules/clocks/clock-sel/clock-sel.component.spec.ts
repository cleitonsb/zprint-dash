import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockSelComponent } from './clock-sel.component';

describe('ClockSelComponent', () => {
  let component: ClockSelComponent;
  let fixture: ComponentFixture<ClockSelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClockSelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockSelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
