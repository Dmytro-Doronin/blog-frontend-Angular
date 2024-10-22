import { Component, Input } from '@angular/core'
import { IPost } from '../../../types/posts.models'

@Component({
  selector: 'blog-post-item',
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss',
})
export class PostItemComponent {
  @Input() post?: IPost
}
