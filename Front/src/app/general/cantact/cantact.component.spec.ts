import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CantactComponent } from './cantact.component';

describe('CantactComponent', () => {
  let component: CantactComponent;
  let fixture: ComponentFixture<CantactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CantactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CantactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
