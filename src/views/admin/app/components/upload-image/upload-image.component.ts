import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServerApiService } from '../../services/server-api.service';
import { AuthService } from '../../services/auth.service';
import { heroArrowUpTray } from '@ng-icons/heroicons/outline';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { QueryClient } from '@tanstack/angular-query-experimental';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'upload-image',
  imports: [ReactiveFormsModule, NgIcon],
  providers: [
    provideIcons({
      heroArrowUpTray,
    }),
    ServerApiService,
  ],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css',
})
export class UploadImageComponent {
  private serverApi = inject(ServerApiService);
  private authService = inject(AuthService);
  private queryClient = inject(QueryClient);
  private toastrService = inject(ToastrService);

  selectedFile: File | null = null;

  form = new FormGroup({
    file: new FormControl<File | null>(null, {
      validators: [Validators.required],
    }),
  });

  onImageSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  upload() {
    if (this.form.controls.file.valid) {
      const formData = new FormData();
      formData.append('profileImg', this.selectedFile!);

      if (this.authService.query.data()?.data?.user?.photo)
        formData.append(
          'previousProfileImg',
          this.authService.query.data()?.data?.user?.photo!,
        );

      this.serverApi
        .uploadAdminProfilePhoto(
          this.authService.query.data()?.data?.user?._id!,
          formData,
        )
        .subscribe({
          next: async () => {
            await this.queryClient.invalidateQueries({
              queryKey: ['isAuthenticated'],
            });

            this.form.reset();
            this.toastrService.success('Login successful!');
          },
          error: (err) => {
            this.toastrService.error(err.error.message);
          },
        });
    }
  }
}
