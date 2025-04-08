import { Component, effect, inject, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { AuthService } from '../../services/auth.service';
import { QueryClient } from '@tanstack/angular-query-experimental';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, SpinnerComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  form = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.minLength(6), Validators.required],
    }),
  });

  private authService = inject(AuthService);
  private router = inject(Router);
  isLoading = signal(false);
  private queryClient = inject(QueryClient);
  private toastrService = inject(ToastrService);
  query = this.authService.query;

  redirectEffect = effect(() => {
    if (this.query.data()?.authenticated) {
      this.router.navigate(['/']);
    }
  });

  login() {
    if (
      this.form.controls.username.valid &&
      this.form.controls.password.valid
    ) {
      this.isLoading.set(true);
      this.authService
        .login(
          this.form.value.username as string,
          this.form.value.password as string,
        )
        .subscribe({
          next: async () => {
            this.isLoading.set(false);

            await this.queryClient.invalidateQueries({
              queryKey: ['isAuthenticated'],
            });

            this.form.reset();
            this.router.navigate(['/']);
            this.toastrService.success('Login successful!');
          },
          error: (err) => {
            this.isLoading.set(false);
            this.toastrService.error(err.error.message);
          },
        });
    }
  }
}
