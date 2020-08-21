import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Principal2Component } from './principal2.component';

describe('Principal2Component', () => {
  let component: Principal2Component;
  let fixture: ComponentFixture<Principal2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Principal2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Principal2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
