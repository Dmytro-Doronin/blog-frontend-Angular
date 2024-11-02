import { IComment } from '../types/comments.model'

export const updatePostLikesStatusForComment = (
  comment: IComment,
  status: 'Like' | 'Dislike' | 'None'
) => {
  const previousStatus = comment.likesInfo.myStatus
  let { likesCount, dislikesCount } = comment.likesInfo

  if (previousStatus === status) {
    status = 'None'
  }

  if (previousStatus === 'Like') {
    likesCount--
  } else if (previousStatus === 'Dislike') {
    dislikesCount--
  }

  if (status === 'Like') {
    likesCount++
  } else if (status === 'Dislike') {
    dislikesCount++
  }

  return {
    ...comment,
    likesInfo: {
      ...comment.likesInfo,
      myStatus: status,
      likesCount,
      dislikesCount,
    },
  }
}
