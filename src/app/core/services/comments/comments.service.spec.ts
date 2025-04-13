import { TestBed } from '@angular/core/testing'
import { CommentsService } from './comments.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { baseVercelUrl } from '../services-variable'

describe('CommentsService', () => {
  let service: CommentsService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentsService],
    })

    service = TestBed.inject(CommentsService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should post comment to post', () => {
    service
      .postComment({ content: 'Nice!', postId: '123', imageUrl: 'https://example.com/avatar.jpg' })
      .subscribe()

    const req = httpMock.expectOne(`${baseVercelUrl}/posts/123/comments`)
    expect(req.request.method).toBe('POST')
    expect(req.request.withCredentials).toBeTrue()
    expect(req.request.body).toEqual({ content: 'Nice!' })
    req.flush({})
  })

  it('should get all comments with params', () => {
    service
      .getAllComment('123', {
        sortBy: 'date',
        sortDirection: 'asc',
        pageNumber: 1,
        pageSize: 10,
      })
      .subscribe()

    const req = httpMock.expectOne(
      r =>
        r.url === `${baseVercelUrl}/posts/123/comments` &&
        r.params.get('sortBy') === 'date' &&
        r.params.get('sortDirection') === 'asc' &&
        r.params.get('pageNumber') === '1' &&
        r.params.get('pageSize') === '10'
    )

    expect(req.request.method).toBe('GET')
    expect(req.request.withCredentials).toBeTrue()
    req.flush({})
  })

  it('should set like/dislike status for comment', () => {
    service.setLikeOrDislikeForComment('Like', 'cmt42').subscribe()

    const req = httpMock.expectOne(`${baseVercelUrl}/comments/cmt42/like-status`)
    expect(req.request.method).toBe('PUT')
    expect(req.request.body).toEqual({ likeStatus: 'Like' })
    expect(req.request.withCredentials).toBeTrue()
    req.flush({})
  })

  it('should change comment content', () => {
    service.changeComment('Updated content', 'cmt42').subscribe()

    const req = httpMock.expectOne(`${baseVercelUrl}/comments/cmt42`)
    expect(req.request.method).toBe('PUT')
    expect(req.request.body).toEqual({ content: 'Updated content' })
    expect(req.request.withCredentials).toBeTrue()
    req.flush({})
  })

  it('should delete comment by ID', () => {
    service.deleteCommentById('cmt42').subscribe()

    const req = httpMock.expectOne(`${baseVercelUrl}/comments/cmt42`)
    expect(req.request.method).toBe('DELETE')
    expect(req.request.withCredentials).toBeTrue()
    req.flush({})
  })

  it('should get comment by ID', () => {
    service.getCommentById('cmt42').subscribe()

    const req = httpMock.expectOne(`${baseVercelUrl}/comments/cmt42`)
    expect(req.request.method).toBe('GET')
    expect(req.request.withCredentials).toBeTrue()
    req.flush({})
  })
})
