export interface INewestLikes {
  addedAt: string
  userId: string
  login: string
}
export interface IExtendedLikesInfo {
  likesCount: 0
  dislikesCount: 0
  myStatus: 'Like' | 'Dislike' | 'None'
  newestLikes: INewestLikes[]
}
