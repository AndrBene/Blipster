import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { Toast } from 'ngx-toastr';

@Component({
  selector: 'custom-toast',
  imports: [NgIcon],
  templateUrl: './custom-toast.component.html',
  styleUrl: './custom-toast.component.css',
})
export class CustomToastComponent extends Toast {
  action(event: Event) {
    event.stopPropagation();
    this.toastPackage.triggerAction();
    return false;
  }
}
