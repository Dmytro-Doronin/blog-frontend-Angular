import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideHttpClient } from '@angular/common/http'
import { routes } from './app.routes'
import { provideState, provideStore } from '@ngrx/store'
import { AuthEffects } from './store/effects/auth.effects'
import { appReducer } from './store/reducers/app.reducer'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState({ name: 'app', reducer: appReducer }),
    provideEffects(AuthEffects),
  ],
}
