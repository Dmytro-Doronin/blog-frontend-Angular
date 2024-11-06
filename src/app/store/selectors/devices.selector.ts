import {createFeatureSelector, createSelector} from "@ngrx/store";
import {DevicesState} from "../reducers/devices.reducer";
import {BlogsState} from "../reducers/blogs.reducer";
import {selectBlogsState} from "./blogs.selector";
import {selectPosts} from "./posts.selector";

export const selectDeviceState = createFeatureSelector<DevicesState>('devices')
export const selectDevicesLoading = createSelector(
  selectDeviceState,
  (state: DevicesState) => state.loading
)
export const selectAllDevices = createSelector(
  selectDeviceState,
  (state: DevicesState) => state.devices
)
export const selectCurrentDeviceById = (deviceId: string | null) =>
  createSelector(selectAllDevices, devices => devices.find(device => device.deviceId === deviceId))
