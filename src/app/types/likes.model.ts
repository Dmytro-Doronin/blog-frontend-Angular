export interface INewestLikes {
  addedAt: string
  userId: string
  login: string
}
export interface IExtendedLikesInfo {
  likesCount: number
  dislikesCount: number
  myStatus: 'Like' | 'Dislike' | 'None'
  newestLikes: INewestLikes[]
}
