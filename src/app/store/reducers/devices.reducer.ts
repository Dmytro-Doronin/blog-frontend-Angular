import { createReducer, on } from '@ngrx/store'

import { IDevice } from '../../types/devices.model'
import {
  setDevicesLoading,
  successDeleteAllDevices,
  successDeleteDeviceById,
  successGetAllDevices,
} from '../actions/devices.action'

export interface DevicesState {
  devices: IDevice[]
  loading: boolean
}

export const initialState: DevicesState = {
  devices: [],
  loading: false,
}

export const devicesReducer = createReducer(
  initialState,
  on(successGetAllDevices, (state, { devices }) => ({
    ...state,
    devices: devices,
  })),
  on(setDevicesLoading, (state, { loading }) => ({
    ...state,
    loading: loading,
  })),
  on(successDeleteDeviceById, (state, { deviceId }) => ({
    ...state,
    devices: state.devices.filter(b => b.deviceId !== deviceId),
  })),
  on(successDeleteAllDevices, state => ({
    ...state,
    devices: [],
  }))
)
