import { IPost } from '../types/posts.models'

export const updatePostLikesStatus = (
  post: IPost,
  status: 'Like' | 'Dislike' | 'None',
  authorName: string = '',
  userId: string = ''
) => {
  const previousStatus = post.extendedLikesInfo.myStatus
  let { likesCount, dislikesCount, newestLikes } = post.extendedLikesInfo

  if (previousStatus === status) {
    status = 'None'
  }

  if (previousStatus === 'Like') {
    likesCount--
    newestLikes = newestLikes.filter(like => like.userId !== userId)
  } else if (previousStatus === 'Dislike') {
    dislikesCount--
  }

  // if (status === 'Like') {
  //   likesCount++
  // } else if (status === 'Dislike') {
  //   dislikesCount++
  // }

  if (status === 'Like') {
    likesCount++
    newestLikes = [
      { addedAt: new Date().toISOString(), userId, login: authorName },
      ...newestLikes,
    ].slice(0, 3)
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
      newestLikes: newestLikes,
    },
  }
}
