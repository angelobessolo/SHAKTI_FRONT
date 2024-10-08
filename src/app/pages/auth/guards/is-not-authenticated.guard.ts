import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces/auth-status.enum';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router      = inject(Router);
  console.log(authService.authStatus());
  if (authService.authStatus() === AuthStatus.authenticated) {
    // router.navigateByUrl('/dashboard'); 
    return false;
  }


  return true;
};
