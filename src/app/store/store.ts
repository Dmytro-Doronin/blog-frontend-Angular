import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from '../app.component'
import { provideStore } from '@ngrx/store'
import { appReducer } from './reducers/app.reducer'
import {authReducer} from "./reducers/auth.reducer";

const reducers = {
  app: appReducer,
  auth: authReducer
}

bootstrapApplication(AppComponent, {
  providers: [provideStore(reducers)],
}).catch(err => console.error(err))
