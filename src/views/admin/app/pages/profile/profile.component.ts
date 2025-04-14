import { Component, inject, OnInit } from '@angular/core';
import { UserImageComponent } from '../../components/user-image/user-image.component';
import { UploadImageComponent } from '../../components/upload-image/upload-image.component';
import { AuthService } from '../../services/auth.service';
import { UserInfoComponent } from '../../components/user-info/user-info.component';

@Component({
  selector: 'app-profile',
  imports: [
    UserImageComponent,
    UploadImageComponent,
    UserInfoComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  userInfo = this.authService.query.data;

  ngOnInit() {}
}
