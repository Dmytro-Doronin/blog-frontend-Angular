import { Component } from '@angular/core'
import { NgClass } from '@angular/common'

@Component({
  selector: 'blog-eye-close',
  standalone: true,
  imports: [NgClass],
  templateUrl: './eye-close.component.html',
  styleUrl: './eye-close.component.scss',
})
export class EyeCloseComponent {
  // @Input() eyeClass: string = ''
}
