import { Component, Input } from '@angular/core'
import { NgSwitch, NgSwitchCase } from '@angular/common'

type VariantType =
  | 'large'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body1'
  | 'body2'
  | 'subtitle1'
  | 'subtitle2'
  | 'caption'
  | 'overline'
  | 'link1'
  | 'link2'
  | 'error'

@Component({
  selector: 'blog-typography',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase],
  templateUrl: './typography.component.html',
  styleUrl: './typography.component.scss',
})
export class TypographyComponent {
  @Input() variant: VariantType = 'body1'
  @Input() content: string = ''
  @Input() className: string = ''
}
