import { Component, input, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'stat-box',
  imports: [NgIcon, CommonModule],
  templateUrl: './stat-box.component.html',
  styleUrl: './stat-box.component.css',
})
export class StatBoxComponent {
  icon = input.required<string>();
  color = input.required<string>();
  text = input.required<string>();
  number = input.required<number>();

  selected = input.required<boolean>();
}
