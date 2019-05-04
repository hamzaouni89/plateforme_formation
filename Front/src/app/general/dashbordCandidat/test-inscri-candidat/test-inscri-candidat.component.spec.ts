import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInscriCandidatComponent } from './test-inscri-candidat.component';

describe('TestInscriCandidatComponent', () => {
  let component: TestInscriCandidatComponent;
  let fixture: ComponentFixture<TestInscriCandidatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInscriCandidatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInscriCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
