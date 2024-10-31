import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { IComment, SendCommentsModel } from '../../types/comments.model'

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
}
