import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {getAllDevices} from "../../../store/actions/devices.action";
import {Observable} from "rxjs";
import {IDevice} from "../../../types/devices.model";
import {selectAllDevices, selectDevicesLoading} from "../../../store/selectors/devices.selector";

@Component({
  selector: 'blog-devices-page',
  templateUrl: './devices-page.component.html',
  styleUrl: './devices-page.component.scss'
})
export class DevicesPageComponent implements OnInit {

  devices$?: Observable<IDevice[]>
  loading$?: Observable<boolean>
  constructor(
    private store: Store,
  ) {}

  ngOnInit() {
    this.loadAllDevices()
    this.getAllDevices()
    this.getLoading()
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
}
