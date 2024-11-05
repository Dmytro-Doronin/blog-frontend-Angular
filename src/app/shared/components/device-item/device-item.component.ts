import {Component, Input} from '@angular/core';

@Component({
  selector: 'blog-device-item',
  templateUrl: './device-item.component.html',
  styleUrl: './device-item.component.scss'
})
export class DeviceItemComponent {
  @Input() isMoreInfo: boolean = false;
  @Input() device?: any
}
