import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordCandidatComponent } from './dashbordCandidat.component';

describe('DashbordCandidatComponent', () => {
  let component: DashbordCandidatComponent;
  let fixture: ComponentFixture<DashbordCandidatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashbordCandidatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
