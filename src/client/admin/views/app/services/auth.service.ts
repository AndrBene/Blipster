import { effect, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { UserInfo } from '../models/user-info';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private toastrService = inject(ToastrService);
  private httpClient = inject(HttpClient);
  private url = '/api/v1/';

  query = injectQuery(() => ({
    queryKey: ['isAuthenticated'],
    queryFn: () => lastValueFrom(this.isLoggedIn()),
  }));

  errorEffect = effect(() => {
    if (this.query.isError()) {
      this.toastrService.error(
        "Couldn't fetch user authentication status",
      );
    }
  });

  login(username: string, password: string) {
    return this.httpClient.post<AuthResponse>(
      this.url + 'users/login',
      {
        username,
        password,
      },
      { withCredentials: true },
    );
  }

  logout() {
    return this.httpClient.get<AuthResponse>(
      this.url + 'users/logout',
      {
        withCredentials: true,
      },
    );
  }

  private isLoggedIn() {
    return this.httpClient.get<UserInfo>(
      this.url + 'users/is-logged-in',
      {
        withCredentials: true,
      },
    );
  }
}

interface AuthResponse {
  status: string;
}
