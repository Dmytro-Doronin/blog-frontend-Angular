import { IPost } from '../types/posts.models'

export const updatePostLikesStatus = (post: IPost, status: 'Like' | 'Dislike' | 'None') => {
  const previousStatus = post.extendedLikesInfo.myStatus
  let { likesCount, dislikesCount } = post.extendedLikesInfo

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
    ...post,
    extendedLikesInfo: {
      ...post.extendedLikesInfo,
      myStatus: status,
      likesCount,
      dislikesCount,
    },
  }
}
