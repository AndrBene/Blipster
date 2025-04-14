import { Component, effect, input } from '@angular/core';

@Component({
  selector: 'user-image',
  imports: [],
  templateUrl: './user-image.component.html',
  styleUrl: './user-image.component.css',
})
export class UserImageComponent {
  image = input<string | undefined>(undefined);
}
