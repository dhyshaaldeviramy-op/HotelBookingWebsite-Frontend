import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../services/authservice';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const auth = inject(Authservice);
  const router = inject(Router);



  if (auth.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
