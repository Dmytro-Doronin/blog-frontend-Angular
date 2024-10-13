import { createAction, props } from '@ngrx/store'
import { PostBlogModel } from '../../types/blogs.models'

export const addBlogsAction = createAction('[Add blog] add blog', props<PostBlogModel>())
export const setBlogsLoadingAction = createAction(
  '[Set blog loading] set loading',
  props<{ loading: boolean }>()
)
