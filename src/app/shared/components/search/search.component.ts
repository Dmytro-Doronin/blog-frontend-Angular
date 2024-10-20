import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core'
import { IBlog } from '../../../types/blogs.models'

@Component({
  selector: 'blog-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input() blogs?: IBlog[] | null
  @Input() loading?: boolean | null

  // @Input() showDropDown?: boolean
  @Output() searchValueChange = new EventEmitter<string>()
  searchTerm: string = ''
  showDropdown: boolean = false

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement

    if (!target.closest('.search-container')) {
      this.showDropdown = false
    }
  }

  onSearchChange(value: string) {
    this.searchTerm = value
    this.showDropdown = value.trim().length > 0
    this.searchValueChange.emit(value)
  }

  onSearchFocus() {
    if (this.searchTerm.trim().length > 0) {
      this.showDropdown = true
    }
  }
}
