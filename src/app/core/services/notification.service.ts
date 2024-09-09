import { Injectable } from '@angular/core'

@Injectable()
export class NotificationService {
  handleError(message: string) {
    console.log(message)
  }
}
