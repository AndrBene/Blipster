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

  return obsIsFetching.pipe(
    filter((isFetching) => !isFetching), // Wait for fetch to complete
    map(() => {
      if (authService.query.isError()) {
        return new RedirectCommand(router.parseUrl('/signin'));
      } else if (authService.query.data()?.authenticated) {
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

  return obsIsFetching.pipe(
    filter((isFetching) => !isFetching), // Wait for fetch to complete
    map(() => {
      // map user auth data to boolean value
      if (!authService.query.data()?.authenticated) {
        return true;
      } else {
        return new RedirectCommand(router.parseUrl('/'));
      }
    }),
  );
};
