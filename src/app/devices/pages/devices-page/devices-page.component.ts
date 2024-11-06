import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { getAllDevices, successDeleteDeviceById } from '../../../store/actions/devices.action'
import { Observable, Subscription } from 'rxjs'
import { IDevice } from '../../../types/devices.model'
import {
  selectAllDevices,
  selectCurrentDeviceById,
  selectDevicesLoading,
} from '../../../store/selectors/devices.selector'
import { selectDeviceId } from '../../../store/selectors/auth.selector'

@Component({
  selector: 'blog-devices-page',
  templateUrl: './devices-page.component.html',
  styleUrl: './devices-page.component.scss',
})
export class DevicesPageComponent implements OnInit, OnDestroy {
  devices$?: Observable<IDevice[]>
  loading$?: Observable<boolean>
  currentDeviceId?: string
  currentDevice$?: Observable<IDevice | undefined>
  private deviceIdSubscription: Subscription = new Subscription()

  constructor(private store: Store) {}

  ngOnInit() {
    this.loadAllDevices()
    this.getAllDevices()
    this.getLoading()
    this.getCurrentDeviceId()
    this.getCurrentDevice()
  }

  getCurrentDeviceId() {
    this.deviceIdSubscription = this.store.select(selectDeviceId).subscribe(deviceId => {
      this.currentDeviceId = deviceId
    })
  }

  getCurrentDevice() {
    this.currentDevice$ = this.store.select(selectCurrentDeviceById(this.currentDeviceId!))
  }

  loadAllDevices() {
    this.store.dispatch(getAllDevices())
  }

  getAllDevices() {
    this.devices$ = this.store.select(selectAllDevices)
    this.devices$.subscribe(item => console.log(item))
  }

  getLoading() {
    this.loading$ = this.store.select(selectDevicesLoading)
  }

  deleteDeviceById(data: { deviceId: string }) {
    this.store.dispatch(successDeleteDeviceById({ deviceId: data.deviceId }))
  }

  ngOnDestroy() {
    this.deviceIdSubscription.unsubscribe()
  }
}
