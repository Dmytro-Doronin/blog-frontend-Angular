import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { PostsService } from './posts.service'

import { baseVercelUrl } from '../services-variable'

describe('PostsService', () => {
  let service: PostsService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService],
    })

    service = TestBed.inject(PostsService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should get posts with query params', () => {
    service
      .getPosts({
        sortBy: 'createdAt',
        sortDirection: 'desc',
        pageNumber: 1,
        pageSize: 10,
      })
      .subscribe()

    const req = httpMock.expectOne(
      r =>
        r.url === `${baseVercelUrl}/posts` &&
        r.params.get('sortBy') === 'createdAt' &&
        r.params.get('sortDirection') === 'desc' &&
        r.params.get('pageNumber') === '1' &&
        r.params.get('pageSize') === '10'
    )
    expect(req.request.method).toBe('GET')
    expect(req.request.withCredentials).toBeTrue()
    req.flush({})
  })

  it('should add new post with formData', () => {
    const file = new File([''], 'image.png')
    service
      .addNewPost({
        title: 'Post Title',
        shortDescription: 'Short desc',
        content: 'Post content',
        blogId: 'blog42',
        file,
      })
      .subscribe()

    const req = httpMock.expectOne(`${baseVercelUrl}/posts`)
    expect(req.request.method).toBe('POST')
    expect(req.request.withCredentials).toBeTrue()
    expect(req.request.body instanceof FormData).toBeTrue()
    req.flush({})
  })

  it('should set like/dislike status for post', () => {
    service.setLikeOrDislike('Like', 'post123').subscribe()

    const req = httpMock.expectOne(`${baseVercelUrl}/posts/post123/like-status`)
    expect(req.request.method).toBe('PUT')
    expect(req.request.body).toEqual({ likeStatus: 'Like' })
    expect(req.request.withCredentials).toBeTrue()
    req.flush({})
  })

  it('should delete post by ID', () => {
    service.deletePostById('post123').subscribe()

    const req = httpMock.expectOne(`${baseVercelUrl}/posts/post123`)
    expect(req.request.method).toBe('DELETE')
    expect(req.request.withCredentials).toBeTrue()
    req.flush({})
  })

  it('should get post by ID', () => {
    service.getPostById('post123').subscribe()

    const req = httpMock.expectOne(`${baseVercelUrl}/posts/post123`)
    expect(req.request.method).toBe('GET')
    expect(req.request.withCredentials).toBeTrue()
    req.flush({})
  })

  it('should edit post with formData', () => {
    const file = new File([''], 'edit.png')
    service
      .editPost({
        postId: 'post123',
        blogId: 'blog1',
        title: 'Updated title',
        shortDescription: 'Updated short',
        content: 'Updated content',
        file,
      })
      .subscribe()

    const req = httpMock.expectOne(`${baseVercelUrl}/posts/post123`)
    expect(req.request.method).toBe('PUT')
    expect(req.request.withCredentials).toBeTrue()
    expect(req.request.body instanceof FormData).toBeTrue()
    req.flush({})
  })
})
