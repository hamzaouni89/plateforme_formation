import { TestBed } from '@angular/core/testing';

import { TestInscriService } from './test-inscri.service';

describe('TestInscriService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestInscriService = TestBed.get(TestInscriService);
    expect(service).toBeTruthy();
  });
});
