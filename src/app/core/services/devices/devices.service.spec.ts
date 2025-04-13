import { TestBed } from '@angular/core/testing'
import { DevicesService } from './devices.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { baseVercelUrl } from '../services-variable'

describe('DevicesService', () => {
  let service: DevicesService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DevicesService],
    })
    service = TestBed.inject(DevicesService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should get all devices with credentials', () => {
    service.getAllDevices().subscribe()

    const req = httpMock.expectOne(`${baseVercelUrl}/security/devices`)
    expect(req.request.method).toBe('GET')
    expect(req.request.withCredentials).toBeTrue()
    req.flush([])
  })

  it('should delete device by id with credentials', () => {
    service.deleteDeviceById('dev123').subscribe()

    const req = httpMock.expectOne(`${baseVercelUrl}/security/devices/dev123`)
    expect(req.request.method).toBe('DELETE')
    expect(req.request.withCredentials).toBeTrue()
    req.flush({})
  })

  it('should delete all devices with credentials', () => {
    service.deleteAllDevices().subscribe()

    const req = httpMock.expectOne(`${baseVercelUrl}/security/devices`)
    expect(req.request.method).toBe('DELETE')
    expect(req.request.withCredentials).toBeTrue()
    req.flush({})
  })
})
