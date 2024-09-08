import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from '../app.component'
import { provideStore } from '@ngrx/store'
import { appReducer } from './reducers/app.reducer'

const reducers = {
  app: appReducer,
}

bootstrapApplication(AppComponent, {
  providers: [provideStore(reducers)],
}).catch(err => console.error(err))
