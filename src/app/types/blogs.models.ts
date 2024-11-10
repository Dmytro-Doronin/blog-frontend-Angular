export interface BlogQueryParams {
  searchNameTerm?: string
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  pageNumber?: number
  pageSize?: number
}

export interface IBlog {
  id: string
  name: string
  description: string
  websiteUrl: string
  createdAt: string
  isMembership: boolean
  userName: string
  userId: string
  imageUrl?: string
}

export interface BlogResponse {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  items: IBlog[]
}

export interface PostBlogModel {
  name: string
  description: string
  websiteUrl: string
  file: File
}

export interface EditBlogModel {
  name: string
  description: string
  websiteUrl: string
  blogId: string
}
