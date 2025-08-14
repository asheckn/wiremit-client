import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // This would normally check for a valid JWT token or session
  return authService.isLoggedIn() ? true : router.parseUrl('/sign-in');
};
