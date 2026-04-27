import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../services/authservice';
import { inject } from '@angular/core';

export const ownerGuard: CanActivateFn = () => {
  const auth   = inject(Authservice);
  const router = inject(Router);

  if (auth.isLoggedIn() && auth.isOwner()) return true;

  router.navigate(['/login']);
  return false;
};
