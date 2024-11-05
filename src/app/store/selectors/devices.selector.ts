import {createFeatureSelector, createSelector} from "@ngrx/store";
import {DevicesState} from "../reducers/devices.reducer";
import {BlogsState} from "../reducers/blogs.reducer";
import {selectBlogsState} from "./blogs.selector";

export const selectDeviceState = createFeatureSelector<DevicesState>('devices')
export const selectDevicesLoading = createSelector(
  selectDeviceState,
  (state: DevicesState) => state.loading
)
export const selectAllDevices = createSelector(
  selectDeviceState,
  (state: DevicesState) => state.devices
)
