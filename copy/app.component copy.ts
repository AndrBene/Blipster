import { Component, effect, inject, signal } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowRightStartOnRectangle,
  heroHome,
  heroUser,
} from '@ng-icons/heroicons/outline';
import { AuthService } from './services/auth.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { QueryClient } from '@tanstack/angular-query-experimental';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIcon, RouterLink, SpinnerComponent],
  providers: [
    provideIcons({
      heroArrowRightStartOnRectangle,
      heroHome,
      heroUser,
    }),
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Blipster';

  pageSelected = signal<string>('Dashboard');

  private queryClient = inject(QueryClient);
  private router = inject(Router);
  private authService = inject(AuthService);
  // authData = this.authService.query.data;
  query = this.authService.query;

  constructor() {
    // console.log('route: ', this.router.url);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event.url == '/') {
          this.pageSelected.set('Dashboard');
        } else if (event.url == '/profile') {
          this.pageSelected.set('Profile');
        }
      });

    effect(() => {
      console.log('AppComponent - data:', this.query.data());
      console.log(
        'AppComponent - isPending:',
        this.query.isPending(),
      );
      console.log(
        'AppComponent - isLoading:',
        this.query.isLoading(),
      );
    });
  }

  changePage(page: string) {
    this.pageSelected.set(page);
  }

  logout() {
    this.authService.logout().subscribe({
      next: async () => {
        console.log('success');
        // this.router.navigate(['/login']);
        await this.queryClient.invalidateQueries({
          queryKey: ['isAuthenticated'],
        });
        this.router.navigate(['/login']);
      },
      error: () => {
        console.log('Error');
      },
    });
  }
}
