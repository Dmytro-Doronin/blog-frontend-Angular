import { createAction, props } from '@ngrx/store'
import { IPost, PostQueryParams } from '../../types/posts.models'
import { IBlog } from '../../types/blogs.models'
import { CommentsQueryParams } from '../../types/comments.model'

export const deletePost = createAction('[Post] delete post', props<{ postId: string }>())

export const loadPosts = createAction('[Posts] get all posts', props<{ params: PostQueryParams }>())
export const addNewPostAction = createAction(
  '[Posts] add new post 1',
  props<{
    tittle: string
    shortDescription: string
    content: string
    blogId: string
    file: File | null
  }>()
)

export const setAllPostsToState = createAction(
  '[Posts] Set all posts to state',
  props<{
    posts: IPost[]
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    hasMorePosts: boolean
  }>()
)

export const addPostsToStateAction = createAction(
  '[Posts] set all posts at first load posts',
  props<{
    posts: IPost[]
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    hasMorePosts: boolean
  }>()
)

export const setPostsLoadingAction = createAction(
  '[Posts] set post loading',
  props<{ loading: boolean }>()
)
export const setLoadMorePostsLoadingAction = createAction(
  '[Posts] set loadMorePostsLoading loading',
  props<{ loadMorePostsLoading: boolean }>()
)

export const setLikeOrDislikeAction = createAction(
  '[Posts] set like or dislike',
  props<{
    status: 'Like' | 'Dislike' | 'None'
    postId: string
    authorName?: string
    userId?: string
  }>()
)

export const setSortByDateForPost = createAction(
  '[Posts] Set Sort By Date',
  props<{ sortBy: 'createdAt'; sortDirection: 'asc' | 'desc' }>()
)

export const setSortByAlphabetForPost = createAction(
  '[Posts] Set Sort By Alphabet',
  props<{ sortDirection: 'asc' | 'desc' }>()
)

export const changeLikeStatusForPostAction = createAction(
  '[Posts] change like status for post',
  props<{
    postId: string
    status: 'Like' | 'Dislike' | 'None'
    authorName?: string
    userId?: string
  }>()
)

export const setLikeStatusAsNoneForPostsAction = createAction(
  '[Posts] set like status for posts as none',
  props<{ status: 'None' }>()
)

export const setCurrentPostId = createAction(
  '[Post] set current post id',
  props<{ currentPostId: string }>()
)

export const callDeletePostModalAction = createAction(
  '[Post] delete post modal',
  props<{ deletePostModal: boolean }>()
)

export const successDeletePost = createAction(
  '[Post] success delete post',
  props<{ postId: string }>()
)

export const updatePost = createAction(
  '[Post] Update Post',
  props<{
    title: string
    shortDescription: string
    content: string
    postId: string
    blogId: string
    file: File | null
  }>()
)

export const successUpdateDetailsPost = createAction(
  '[Post] Update post details',
  props<{ post: IPost }>()
)

export const getPostByIdAction = createAction('[Post] get post by id', props<{ postId: string }>())
export const setPostByIdAction = createAction('[post] set post by id', props<IPost>())
