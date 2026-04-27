import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../services/authservice';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {
  const auth   = inject(Authservice);
  const router = inject(Router);

  if (auth.isLoggedIn() && auth.isSuperAdmin()) return true;

  router.navigate(['/login']);
  return false;
};