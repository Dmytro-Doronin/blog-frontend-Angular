import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from '../app.component'
import { provideStore } from '@ngrx/store'
import { appReducer } from './reducers/app.reducer'
import { authReducer } from './reducers/auth.reducer'
import { blogsReducer } from './reducers/blogs.reducer'

export const reducers = {
  app: appReducer,
  auth: authReducer,
  blogs: blogsReducer,
}

// bootstrapApplication(AppComponent, {
//   providers: [provideStore(reducers)],
// }).catch(err => console.error(err))
