import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowRightStartOnRectangle,
  heroHome,
  heroUser,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIcon, RouterLink],
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
}
