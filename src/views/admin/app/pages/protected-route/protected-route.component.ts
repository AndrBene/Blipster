import { Component, effect, inject, signal } from '@angular/core';
import { QueryClient } from '@tanstack/angular-query-experimental';
import { AuthService } from '../../services/auth.service';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowRightStartOnRectangle,
  heroHome,
  heroUser,
} from '@ng-icons/heroicons/outline';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'protected-route',
  imports: [RouterOutlet, NgIcon, RouterLink, CommonModule],
  providers: [
    provideIcons({
      heroArrowRightStartOnRectangle,
      heroHome,
      heroUser,
    }),
  ],
  templateUrl: './protected-route.component.html',
  styleUrl: './protected-route.component.css',
})
export class ProtectedRouteComponent {
  private queryClient = inject(QueryClient);
  private router = inject(Router);

  pageSelected = signal<string>(
    (() => {
      if (this.router.url == '/profile') {
        return 'Profile';
      } else {
        return 'Dashboard';
      }
    })(),
  );

  private authService = inject(AuthService);
  private toastrService = inject(ToastrService);
  query = this.authService.query;

  redirectEffect = effect(() => {
    if (!this.query.data()?.authenticated || this.query.isError()) {
      this.router.navigate(['/signin']);
    }
  });

  constructor() {
    this.router.events
      .pipe(
        filter((event) => {
          return event instanceof NavigationEnd;
        }),
      )
      .subscribe({
        next: (event) => {
          if (event.url == '/') {
            this.pageSelected.set('Dashboard');
          } else if (event.url == '/profile') {
            this.pageSelected.set('Profile');
          }
        },
      });
  }

  changePage(page: string) {
    this.pageSelected.set(page);
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.queryClient.invalidateQueries({
          queryKey: ['isAuthenticated'],
        });
        this.toastrService.success('Logout successful!');
        this.router.navigate(['/signin']);
      },
      error: (err) => {
        this.toastrService.error(err.error.message);
      },
    });
  }
}
