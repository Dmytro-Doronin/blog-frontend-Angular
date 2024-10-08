import { Component, Input } from '@angular/core'
import { Notify } from '../../../types/notification.models'

@Component({
  selector: 'blog-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input() message?: Notify | null
}
