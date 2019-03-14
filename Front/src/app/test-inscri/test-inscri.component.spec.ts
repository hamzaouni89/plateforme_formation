import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInscriComponent } from './test-inscri.component';

describe('TestInscriComponent', () => {
  let component: TestInscriComponent;
  let fixture: ComponentFixture<TestInscriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInscriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInscriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
