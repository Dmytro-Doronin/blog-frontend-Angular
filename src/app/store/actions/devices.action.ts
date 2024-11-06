import { createAction, props } from '@ngrx/store'
import { IDevice } from '../../types/devices.model'

export const getAllDevices = createAction('[Devices] get all devices')
export const successGetAllDevices = createAction(
  '[Devices] success get all devices',
  props<{ devices: IDevice[] }>()
)
export const setDevicesLoading = createAction(
  '[Devices] set devices loading',
  props<{ loading: boolean }>()
)

export const deleteDeviceById = createAction(
  '[Devices] delete device by id',
  props<{ deviceId: string }>()
)
export const successDeleteDeviceById = createAction(
  '[Devices] success delete device by id',
  props<{ deviceId: string }>()
)

export const deleteAllDevices = createAction('[Devices] delete all devices')

export const successDeleteAllDevices = createAction('[Devices] success delete all devices')
