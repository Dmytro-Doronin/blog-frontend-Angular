import { Component, Input } from '@angular/core'
import { Notify } from '../../../types/notification.models'

@Component({
  selector: 'blog-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  @Input() message?: Notify | null
}
