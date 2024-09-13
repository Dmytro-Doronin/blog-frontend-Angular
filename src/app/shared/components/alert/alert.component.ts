import { Component, Input } from '@angular/core'
import { Notify } from '../../../types/notification.models'
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'blog-alert',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input() message?: Notify | null
}
