import { TestBed } from '@angular/core/testing';

import { HasNameGuard } from './has-name.guard';

describe('HasNameGuard', () => {
  let guard: HasNameGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasNameGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
