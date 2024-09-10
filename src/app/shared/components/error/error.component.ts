import { Component, Input } from '@angular/core'

@Component({
  selector: 'blog-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  @Input() message?: string | null
}
