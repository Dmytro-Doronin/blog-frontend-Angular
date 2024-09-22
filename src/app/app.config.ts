import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { routes } from './app.routes'
import { provideState, provideStore } from '@ngrx/store'
import { AuthEffects } from './store/effects/auth.effects'
import { appReducer } from './store/reducers/app.reducer'
import { authReducer } from './store/reducers/auth.reducer'
import { TokenInterceptor } from './core/interceptors/token.interceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore(),
    provideState({ name: 'app', reducer: appReducer }),
    provideState({ name: 'auth', reducer: authReducer }),
    provideEffects(AuthEffects),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
}
