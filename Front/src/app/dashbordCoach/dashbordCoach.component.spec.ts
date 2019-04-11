import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordCoachComponent } from './dashbordCoach.component';

describe('ProfilComponent', () => {
  let component: DashbordCoachComponent;
  let fixture: ComponentFixture<DashbordCoachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashbordCoachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
