import { IPost } from './posts.models'

export interface CommentsQueryParams {
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  pageNumber?: number
  pageSize?: number
}

export interface IComment {
  id: string
  content: string
  commentatorInfo: {
    userId: string
    userLogin: string
    userImageUrl: string
  }
  createdAt: string
  likesInfo: {
    likesCount: number
    dislikesCount: number
    myStatus: 'Like' | 'Dislike' | 'None'
  }
}

export interface CommentResponse {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  items: IComment[]
}

export interface SendCommentsModel {
  postId: string
  content: string
  imageUrl: string
}
