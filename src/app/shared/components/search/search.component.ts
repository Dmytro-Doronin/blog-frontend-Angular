import { Component, Input } from '@angular/core'
import { IBlog } from '../../../types/blogs.models'

@Component({
  selector: 'blog-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input() blogs?: IBlog[]
}
