import { TestBed } from '@angular/core/testing';

import { HasValueGuard } from './has-value.guard';

describe('HasValueGuard', () => {
  let guard: HasValueGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasValueGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
