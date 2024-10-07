import {Component, Input} from '@angular/core';

@Component({
  selector: 'blog-post-link-icon',
  templateUrl: './post-link-icon.component.html',
  styleUrl: './post-link-icon.component.scss'
})
export class PostLinkIconComponent {
  @Input() routerLinkActive?: string
}
