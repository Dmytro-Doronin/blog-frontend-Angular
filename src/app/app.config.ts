import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideHttpClient } from '@angular/common/http'
import { routes } from './app.routes'
import { provideStore } from '@ngrx/store'
import { AuthEffects } from './store/effects/auth.effects'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideEffects(AuthEffects),
  ],
}
