import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import {
  CommentResponse,
  CommentsQueryParams,
  IComment,
  SendCommentsModel,
} from '../../types/comments.model'

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  postComment({ content, postId }: SendCommentsModel) {
    return this.http.post<IComment>(
      `http://localhost:3000/posts/${postId}/comments`,
      {
        content,
      },
      { withCredentials: true }
    )
  }

  getAllComment(postId: string, params: CommentsQueryParams) {
    let httpCommentsParams = new HttpParams()

    if (params.sortBy) {
      httpCommentsParams = httpCommentsParams.set('sortBy', params.sortBy)
    }
    if (params.sortDirection) {
      httpCommentsParams = httpCommentsParams.set('sortDirection', params.sortDirection)
    }
    if (params.pageNumber !== undefined) {
      httpCommentsParams = httpCommentsParams.set('pageNumber', params.pageNumber.toString())
    }
    if (params.pageSize !== undefined) {
      httpCommentsParams = httpCommentsParams.set('pageSize', params.pageSize.toString())
    }
    return this.http.get<CommentResponse>(`http://localhost:3000/posts/${postId}/comments`, {
      params: httpCommentsParams,
      withCredentials: true,
    })
  }

  setLikeOrDislikeForComment(status: 'Like' | 'Dislike' | 'None', commentId: string) {
    return this.http.put(
      `http://localhost:3000/comments/${commentId}/like-status`,
      {
        likeStatus: status,
      },
      { withCredentials: true }
    )
  }

  deleteCommentById(commentId: string) {
    return this.http.delete(`http://localhost:3000/comments/${commentId}`, {
      withCredentials: true,
    })
  }
}
