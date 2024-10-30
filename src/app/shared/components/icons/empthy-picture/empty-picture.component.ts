import { Component, Input } from '@angular/core'

@Component({
  selector: 'blog-empty-picture',
  templateUrl: './empty-picture.component.html',
  styleUrl: './empty-picture.component.scss',
})
export class EmptyPictureComponent {
  @Input() variant: 'small' | 'big' = 'big'
}
