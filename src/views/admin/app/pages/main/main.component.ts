import { Component, inject, signal } from '@angular/core';
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

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, NgIcon, RouterLink],
  providers: [
    provideIcons({
      heroArrowRightStartOnRectangle,
      heroHome,
      heroUser,
    }),
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  title = 'Blipster';

  pageSelected = signal<string>('Dashboard');

  private queryClient = inject(QueryClient);
  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.url == '/') {
          this.pageSelected.set('Dashboard');
        }
      });
  }

  changePage(page: string) {
    this.pageSelected.set(page);
  }

  logout() {
    this.authService.logout().subscribe({
      next: async () => {
        await this.queryClient.invalidateQueries({
          queryKey: ['isAuthenticated'],
        });
        this.router.navigate(['/signin']);
      },
      error: () => {
        console.log('Error');
      },
    });
  }
}
