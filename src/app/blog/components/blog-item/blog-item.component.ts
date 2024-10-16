import { Component, Input } from '@angular/core'
import { IBlog } from '../../../types/blogs.models'

@Component({
  selector: 'blog-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrl: './blog-item.component.scss',
})
export class BlogItemComponent {
  @Input() blog!: IBlog
  @Input() currentUserId?: string | null
  @Input() currentUserLogin?: string | null
}
