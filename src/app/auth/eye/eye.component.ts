import { Component } from '@angular/core'
import { NgClass } from '@angular/common'

@Component({
  selector: 'blog-eye',
  standalone: true,
  imports: [NgClass],
  templateUrl: './eye.component.html',
  styleUrl: './eye.component.scss',
})
export class EyeComponent {
  // @Input() eyeClass: string = ''
}
