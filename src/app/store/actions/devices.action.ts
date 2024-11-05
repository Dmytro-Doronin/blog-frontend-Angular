import {createAction, props} from "@ngrx/store";
import {IDevice} from "../../types/devices.model";

export const getAllDevices = createAction('[Devices] get all devices')
export const successGetAllDevices = createAction('[Devices] success get all devices', props<{ devices: IDevice[] }>())
export const setDevicesLoading = createAction('[Devices] set devices loading', props<{ loading: boolean }>())
