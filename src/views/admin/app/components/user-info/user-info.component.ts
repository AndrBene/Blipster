import { Component, input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'user-info',
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent {
  user = input<User | undefined>(undefined);
}
