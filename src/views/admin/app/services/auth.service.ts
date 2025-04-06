import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { UserInfo } from '../models/user-info';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private url = 'http://localhost:3000/api/v1/';

  query = injectQuery(() => ({
    queryKey: ['isAuthenticated'],
    queryFn: () => lastValueFrom(this.isLoggedIn()),
  }));

  private isLoggedIn() {
    return this.httpClient.get<UserInfo>(
      this.url + 'users/is-logged-in',
      {
        withCredentials: true,
      },
    );
  }
}
