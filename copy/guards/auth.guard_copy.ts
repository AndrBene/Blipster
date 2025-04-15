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

export const authGuardCopy: CanActivateFn = (route, state) => {
  // console.log('** authGuard');

  const router = inject(Router);
  // const activatedRoute = inject(ActivatedRoute);
  const authService = inject(AuthService);

  console.log(
    'authGuard - trying to access route: ',
    route.url.map((segment) => segment.path).join('/'),
  );
  console.log('isFetching: ', authService.query.isFetching());

  // console.log(
  //   '**** authGuard - query data:',
  //   authService.query.data(),
  // );
  // const retValue = authService.query.data()
  //   ? authService.query.data()!.authenticated
  //     ? true
  //     : new RedirectCommand(router.parseUrl('/login'))
  //   : false;

  // console.log('retValue:', retValue);
  // return retValue;

  // if (
  //   authService.query.data() &&
  //   !authService.query.isFetching() &&
  //   !authService.query.isPending()
  // ) {
  //   console.log(' - here');
  //   if (authService.query.data()!.authenticated) {
  //     console.log(' - true');
  //     return true;
  //   } else {
  //     console.log(' - false');
  //     return false;
  //   }
  // }

  // console.log('data:', authService.query.data());
  // console.log(
  //   'authenticated:',
  //   authService.query.data()?.authenticated,
  // );

  const obsIsFetching = toObservable(authService.query.isFetching);
  const obsData = toObservable(authService.query.data);

  return obsIsFetching.pipe(
    filter((isFetching) => !isFetching), // Wait for fetching to complete
    switchMap(() => obsData), // Now get the data
    // return toObservable(authService.query.data).pipe(
    //   filter((data) => data !== undefined),
    map((data) => {
      console.log('data auth 1: ', data);
      console.log('isFetching: ', authService.query.isFetching());
      if (authService.query.isError()) {
        return new RedirectCommand(router.parseUrl('/'));
      } else if (data?.authenticated) {
        console.log(
          'authGuard - GRANTED access to route: ',
          route.url.map((segment) => segment.path).join('/'),
        );
        return true;
      } else {
        console.log('authGuard - REDIRECT to /login');
        return new RedirectCommand(router.parseUrl('/signin'));
        // router.navigate(['/login']);
        // return false;
      }
    }),
  );

  return toObservable(authService.query.isFetching).pipe(
    filter((isFetching) => !isFetching), // Wait for fetching to complete
    switchMap(() => toObservable(authService.query.data)), // Now get the data
    // return toObservable(authService.query.data).pipe(
    //   filter((data) => data !== undefined),
    map((data) => {
      console.log('data auth 1: ', data);
      console.log('isFetching: ', authService.query.isFetching());
      if (data?.authenticated) {
        console.log(
          'authGuard - GRANTED access to route: ',
          route.url.map((segment) => segment.path).join('/'),
        );
        return true;
      } else {
        console.log('authGuard - REDIRECT to /login');
        return new RedirectCommand(router.parseUrl('/login'));
        // router.navigate(['/login']);
        // return false;
      }
    }),
  );

  // .subscribe({
  //   next: (data) => {
  //     if (data?.authenticated) {
  //       return true;
  //     } else {
  //       return new RedirectCommand(router.parseUrl('/login'));
  //     }
  //   },
  // });
  // return toObservable(authService.query.data);

  // if (
  //   !authService.query.data() ||
  //   authService.query.data()!.authenticated
  // )
  //   return true;

  // return new RedirectCommand(router.parseUrl('/login'));
};

export const authGuardAlreadyAuth: CanActivateFn = (route, state) => {
  // console.log('** authGuardAlreadyAuth');
  const authService = inject(AuthService);
  const activatedRoute = inject(ActivatedRoute);
  const router = inject(Router);
  console.log(
    'authGuardAlreadyAuth - trying to access route: ',
    route.url.map((segment) => segment.path).join('/'),
  );

  console.log(
    'authGuardAlreadyAuth - isFetching:',
    authService.query.isFetching(),
  );

  console.log(
    'authGuardAlreadyAuth - isPending:',
    authService.query.isPending(),
  );

  // if (
  //   authService.query.data() &&
  //   !authService.query.isFetching() &&
  //   !authService.query.isPending()
  // ) {
  //   console.log(' - here');
  //   if (authService.query.data()!.authenticated) {
  //     console.log(' - true');
  //     return new RedirectCommand(router.parseUrl('/'));
  //   } else {
  //     console.log(' - false');
  //     return true;
  //   }
  // }
  // if (
  //   authService.query.data() &&
  //   authService.query.data()!.authenticated
  // )
  //   return false;

  const obsIsFetching = toObservable(authService.query.isFetching);
  const obsData = toObservable(authService.query.data);

  return obsIsFetching.pipe(
    filter((isFetching) => !isFetching), // Wait for fetching to complete
    switchMap(() => obsData),
    filter((data) => data !== undefined),
    map((data) => {
      console.log('authGuardAlreadyAuth - data auth 2: ', data);
      if (!data?.authenticated) {
        // console.log('GRANTED access to route ', router.url);

        console.log(
          'authGuardAlreadyAuth - GRANTED access to route: ',
          route.url.map((segment) => segment.path).join('/'),
        );
        return true;
      } else {
        console.log('authGuardAlreadyAuth - REDIRECT to /');
        return new RedirectCommand(router.parseUrl('/'));
        // router.navigate(['/login']);
        // return false;
      }
    }),
  );
};
