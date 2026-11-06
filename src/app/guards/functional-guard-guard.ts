import { CanActivateFn, Router } from '@angular/router';
import { AdultService } from '../services/adult-service';
import { inject } from '@angular/core';

export const functionalGuardGuard: CanActivateFn = (route, state) => {
  const adultModeService = inject(AdultService);
  const router = inject(Router);

  if (adultModeService.isAuthorized()) {
    router.navigate(['/']);
    return false;
  }

  return true;
};