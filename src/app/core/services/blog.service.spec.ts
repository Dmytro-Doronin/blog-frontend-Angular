import { TestBed } from '@angular/core/testing'
import { BlogService } from './blog.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { baseVercelUrl } from './services-variable'

describe('BlogService', () => {
  let service: BlogService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogService],
    })
    service = TestBed.inject(BlogService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should get blogs with params', () => {
    service
      .getBlogs({
        searchNameTerm: 'angular',
        sortBy: 'date',
        sortDirection: 'desc',
        pageNumber: 2,
        pageSize: 10,
      })
      .subscribe()

    const req = httpMock.expectOne(
      req =>
        req.url === `${baseVercelUrl}/blogs` &&
        req.params.get('searchNameTerm') === 'angular' &&
        req.params.get('sortBy') === 'date' &&
        req.params.get('sortDirection') === 'desc' &&
        req.params.get('pageNumber') === '2' &&
        req.params.get('pageSize') === '10'
    )

    expect(req.request.method).toBe('GET')
    req.flush({})
  })

  it('should get user blogs with credentials', () => {
    service
      .getBlogsForUser({
        pageNumber: 1,
        pageSize: 5,
      })
      .subscribe()

    const req = httpMock.expectOne(
      req =>
        req.url === `${baseVercelUrl}/blogs/user-blogs` &&
        req.params.get('pageNumber') === '1' &&
        req.params.get('pageSize') === '5'
    )

    expect(req.request.method).toBe('GET')
    expect(req.request.withCredentials).toBeTrue()
    req.flush({})
  })

  it('should post blog with formData', () => {
    const fakeFile = new File([''], 'logo.png')
    service
      .postBlog({
        name: 'Blog 1',
        description: 'test',
        websiteUrl: 'https://test.com',
        file: fakeFile,
      })
      .subscribe()

    const req = httpMock.expectOne(`${baseVercelUrl}/blogs`)
    expect(req.request.method).toBe('POST')
    expect(req.request.body instanceof FormData).toBeTrue()
    expect(req.request.withCredentials).toBeTrue()
    req.flush({})
  })

  it('should edit blog with formData', () => {
    const fakeFile = new File([''], 'logo.png')
    service
      .editBlog({
        blogId: '123',
        name: 'New Name',
        description: 'Updated',
        websiteUrl: 'https://new.com',
        file: fakeFile,
      })
      .subscribe()

    const req = httpMock.expectOne(`${baseVercelUrl}/blogs/123`)
    expect(req.request.method).toBe('PUT')
    expect(req.request.body instanceof FormData).toBeTrue()
    req.flush({})
  })

  it('should get blog by ID', () => {
    service.getBlogById('abc').subscribe()

    const req = httpMock.expectOne(`${baseVercelUrl}/blogs/abc`)
    expect(req.request.method).toBe('GET')
    req.flush({})
  })

  it('should delete blog by ID with credentials', () => {
    service.deleteBlogById('abc').subscribe()

    const req = httpMock.expectOne(`${baseVercelUrl}/blogs/abc`)
    expect(req.request.method).toBe('DELETE')
    expect(req.request.withCredentials).toBeTrue()
    req.flush({})
  })

  it('should get posts for blog with query params', () => {
    service
      .getPostsForBlogs(
        {
          sortBy: 'createdAt',
          sortDirection: 'asc',
          pageNumber: 1,
          pageSize: 20,
        },
        'blogId123'
      )
      .subscribe()

    const req = httpMock.expectOne(
      r =>
        r.url === `${baseVercelUrl}/blogs/blogId123/posts` &&
        r.params.get('sortBy') === 'createdAt' &&
        r.params.get('sortDirection') === 'asc' &&
        r.params.get('pageNumber') === '1' &&
        r.params.get('pageSize') === '20'
    )
    expect(req.request.method).toBe('GET')
    expect(req.request.withCredentials).toBeTrue()
    req.flush({})
  })

  it('should add post to blog with formData', () => {
    const fakeFile = new File([''], 'post.png')
    service
      .addPostToBlog({
        blogId: 'blog42',
        title: 'Post title',
        shortDescription: 'Short',
        content: 'Full content',
        file: fakeFile,
      })
      .subscribe()

    const req = httpMock.expectOne(`${baseVercelUrl}/blogs/blog42/posts`)
    expect(req.request.method).toBe('POST')
    expect(req.request.body instanceof FormData).toBeTrue()
    expect(req.request.withCredentials).toBeTrue()
    req.flush({})
  })
})
