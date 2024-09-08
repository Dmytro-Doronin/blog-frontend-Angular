import { Component, Input } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'blog-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  @Input() message?: Observable<string | null>
}
