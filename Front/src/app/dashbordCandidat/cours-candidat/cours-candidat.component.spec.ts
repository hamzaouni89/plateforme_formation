import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursCandidatComponent } from './cours-candidat.component';

describe('CoursCandidatComponent', () => {
  let component: CoursCandidatComponent;
  let fixture: ComponentFixture<CoursCandidatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursCandidatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
