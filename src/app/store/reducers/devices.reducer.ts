import {Notify} from "../../types/notification.models";
import {createReducer, on} from "@ngrx/store";
import {addAlert, deleteAlert, setAppLoading, setAutoLogOut, setItemId} from "../actions/app.actions";
import {IDevice} from "../../types/devices.model";
import {setDevicesLoading, successGetAllDevices} from "../actions/devices.action";

export interface DevicesState {
  devices: IDevice[]
  loading: boolean
}

export const initialState: DevicesState = {
  devices: [],
  loading: false
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

)
