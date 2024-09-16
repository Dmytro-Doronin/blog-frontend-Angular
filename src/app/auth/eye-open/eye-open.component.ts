import { Component, Input } from '@angular/core'

@Component({
  selector: 'blog-eye-open',
  standalone: true,
  imports: [],
  templateUrl: './eye-open.component.html',
  styleUrl: './eye-open.component.scss',
})
export class EyeOpenComponent {
  @Input() height: string = '20'
  @Input() width: string = '20'
  @Input() fillColor: string = '#000'
  @Input() clipRule: string = 'evenodd'
  @Input() fillRule: string = 'evenodd'
  pathD: string =
    'M12 4.5C7 4.5 2.73 7.6 1 12a11.83 11.83 0 0 0 22 0c-1.73-4.39-6-7.5-11-7.5zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'
}
