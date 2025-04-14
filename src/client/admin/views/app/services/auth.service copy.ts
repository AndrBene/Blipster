import { effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RedirectCommand,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { lastValueFrom, tap } from 'rxjs';
import { UserInfo } from '../models/user-info';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private url = 'http://localhost:3000/api/v1/';

  query = injectQuery(() => ({
    queryKey: ['isAuthenticated'],
    queryFn: () => lastValueFrom(this.isLoggedIn()),
    // queryFn: () => this.isLoggedIn(),

    // queryFn: () =>
    // this.isLoggedIn().subscribe({
    //   next: (resData) => resData,
    // }),
  }));

  // private userInfo = signal<UserInfo | undefined>(undefined);

  // get isAuth() {
  //   return this.userInfo()?.authenticated || false;
  // }

  login(username: string, password: string) {
    return this.httpClient.post<Response>(
      this.url + 'users/login',
      {
        username,
        password,
      },
      { withCredentials: true },
    );
  }

  logout() {
    return this.httpClient.get<Response>(this.url + 'users/logout', {
      withCredentials: true,
    });
  }

  private isLoggedIn() {
    // console.log(
    //   'isLoggedIn - url: ',
    //   this.url + 'users/is-logged-in',
    // );
    console.log('AuthService - Fetching auth status');
    return this.httpClient.get<UserInfo>(
      this.url + 'users/is-logged-in',
      {
        withCredentials: true,
      },
    );
    // .pipe(
    //   tap((resData) => {
    //     this.userInfo.set(resData);
    //   }),
    // );
  }

  // authGuard: CanActivateFn = (
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot,
  // ) => {
  //   // return (
  //   //   this.userInfo()?.authenticated ||
  //   //   new RedirectCommand(this.router.parseUrl('/login'))
  //   // );
  //   // return this.query.isPending() && this.query.isFetching();
  //   // return this.query.data()?.subscribe({
  //   //   next: (resData) => resData.authenticated,
  //   // });
  //   return this.query.data()
  //     ? this.query.data()!.authenticated
  //       ? true
  //       : new RedirectCommand(this.router.parseUrl('/login'))
  //     : false;
  // };

  constructor() {
    effect(() => {
      console.log('***', this.query.data());
    });

    // toObservable(this.query.data).subscribe(() => {
    //   console.log('---------------------------------------------');
    //   console.log('**** effect - query data: ', this.query.data());
    //   if (this.query.data()) {
    //     console.log('here: ', this.router.url);
    //     this.router.navigate([this.router.url]);
    //     // this.router.navigate(['/'], {
    //     //   queryParams: { forceReload: new Date().getTime() },
    //     // });
    //   }
    // });

    // this.query.data.watch((isAuthenticated) => {
    //   if (!isAuthenticated) {
    //     // Redirect to login if not authenticated
    //     this.router.navigate(['/login']);
    //   }
    // });
  }
}
