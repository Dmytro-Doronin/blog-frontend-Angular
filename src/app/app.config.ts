import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'

import { provideHttpClient } from '@angular/common/http'
import { routes } from './app.routes'
import { provideStore } from '@ngrx/store'

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideStore()],
}
