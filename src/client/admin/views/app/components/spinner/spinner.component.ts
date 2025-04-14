import { CommonModule } from '@angular/common';
import { Component, computed, effect, input } from '@angular/core';

@Component({
  selector: 'spinner',
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent {
  inputWidth = input<string>();
}
