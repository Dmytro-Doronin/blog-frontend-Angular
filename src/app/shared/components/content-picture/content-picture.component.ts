import { Component, Input } from '@angular/core'

@Component({
  selector: 'blog-content-picture',
  templateUrl: './content-picture.component.html',
  styleUrl: './content-picture.component.scss',
})
export class ContentPictureComponent {
  @Input() variant: 'round' | 'big-picture' | 'post-picture' = 'round'
}
