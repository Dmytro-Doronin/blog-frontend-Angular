import { HttpClient } from '@angular/common/http'
import { PostResponse } from '../../types/posts.models'
import { IDevice } from '../../types/devices.model'
import { Injectable } from '@angular/core'
import { baseVercelUrl } from './services-variable'

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  constructor(private http: HttpClient) {}

  getAllDevices() {
    return this.http.get<IDevice[]>(`${baseVercelUrl}/security/devices`, {
      withCredentials: true,
    })
  }

  deleteDeviceById(deviceId: string) {
    return this.http.delete(`${baseVercelUrl}/security/devices/${deviceId}`, {
      withCredentials: true,
    })
  }

  deleteAllDevices() {
    return this.http.delete(`${baseVercelUrl}/security/devices`, {
      withCredentials: true,
    })
  }
}
