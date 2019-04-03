import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatsByNiveauComponent } from './candidats-by-niveau.component';

describe('CandidatsByNiveauComponent', () => {
  let component: CandidatsByNiveauComponent;
  let fixture: ComponentFixture<CandidatsByNiveauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatsByNiveauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatsByNiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
