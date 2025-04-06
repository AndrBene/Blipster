import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  heroArrowRightStartOnRectangle,
  heroHome,
  heroUser,
} from '@ng-icons/heroicons/outline';
import { AuthService } from './services/auth.service';
import { SpinnerComponent } from './components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerComponent],
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
  private authService = inject(AuthService);
  query = this.authService.query;
}
