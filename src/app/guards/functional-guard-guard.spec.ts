import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { functionalGuardGuard } from './functional-guard-guard';

describe('functionalGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => functionalGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
