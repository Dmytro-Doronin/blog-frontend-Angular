import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'blog-content-picture',
  templateUrl: './content-picture.component.html',
  styleUrl: './content-picture.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentPictureComponent implements OnInit {
  @Input() variant:
    | 'round'
    | 'big-picture'
    | 'post-picture'
    | 'small-round'
    | 'small-round-comment' = 'round'
  @Input() image?: string

  ngOnInit(): void {
    console.log(this.image)
  }
}
