import {
  ActivatedRoute,
  CanActivateFn,
  RedirectCommand,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const obsIsFetching = toObservable(authService.query.isFetching);
  const obsData = toObservable(authService.query.data);

  return obsIsFetching.pipe(
    filter((isFetching) => !isFetching), // Wait for fetch to complete
    switchMap(() => obsData), // Wait for the user auth data
    map((data) => {
      // map user auth data to boolean value
      if (authService.query.isError()) {
        return new RedirectCommand(router.parseUrl('/signin'));
      } else if (data?.authenticated) {
        return true;
      } else {
        return new RedirectCommand(router.parseUrl('/signin'));
      }
    }),
  );
};

export const authGuardAlreadyAuth: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const obsIsFetching = toObservable(authService.query.isFetching);
  const obsData = toObservable(authService.query.data);

  return obsIsFetching.pipe(
    filter((isFetching) => !isFetching), // Wait for fetch to complete
    switchMap(() => obsData), // Wait for the user auth data
    filter((data) => data !== undefined),
    map((data) => {
      // map user auth data to boolean value
      if (!data?.authenticated) {
        return true;
      } else {
        return new RedirectCommand(router.parseUrl('/'));
      }
    }),
  );
};
