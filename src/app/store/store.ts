import { appReducer } from './reducers/app.reducer'
import { authReducer } from './reducers/auth.reducer'
import { blogsReducer } from './reducers/blogs.reducer'

export const reducers = {
  app: appReducer,
  auth: authReducer,
  blogs: blogsReducer,
}

