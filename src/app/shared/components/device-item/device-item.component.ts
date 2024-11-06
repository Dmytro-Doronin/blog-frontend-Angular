import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { IDevice } from '../../../types/devices.model'

@Component({
  selector: 'blog-device-item',
  templateUrl: './device-item.component.html',
  styleUrl: './device-item.component.scss',
})
export class DeviceItemComponent implements OnInit {
  @Input() isMoreInfo: boolean = false
  @Input() device?: IDevice | null
  @Input() currentDeviceId?: string
  @Output() deleteDeviceSubmitted = new EventEmitter<{ deviceId: string }>()

  deleteDeviceByIdFn() {
    this.deleteDeviceSubmitted.emit({ deviceId: this.device!.deviceId })
  }

  ngOnInit() {
    console.log(this.device)
  }
}
