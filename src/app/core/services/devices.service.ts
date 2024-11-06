import { HttpClient } from '@angular/common/http'
import { PostResponse } from '../../types/posts.models'
import { IDevice } from '../../types/devices.model'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  constructor(private http: HttpClient) {}

  getAllDevices() {
    return this.http.get<IDevice[]>('http://localhost:3000/security/devices', {
      withCredentials: true,
    })
  }

  deleteDeviceById(deviceId: string) {
    return this.http.delete(`http://localhost:3000/security/devices/${deviceId}`, {
      withCredentials: true,
    })
  }

  deleteAllDevices() {
    return this.http.delete(`http://localhost:3000/security/devices`, {
      withCredentials: true,
    })
  }
}
