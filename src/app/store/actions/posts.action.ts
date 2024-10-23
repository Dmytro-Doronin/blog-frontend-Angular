import { createAction, props } from '@ngrx/store'

export const setLikeOrDislikeAction = createAction(
  '[Posts] set like or dislike',
  props<{ status: 'Like' | 'Dislike' | 'None'; postId: string }>()
)
