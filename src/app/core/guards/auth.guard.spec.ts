import { TestBed } from '@angular/core/testing'
import { Store } from '@ngrx/store'
import { Router } from '@angular/router'
import { of } from 'rxjs'
import { AuthGuard } from './auth-guard.guard'

describe('AuthGuard', () => {
  let guard: AuthGuard
  let store: jasmine.SpyObj<Store>
  let router: jasmine.SpyObj<Router>

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('Store', ['select'])
    const routerSpy = jasmine.createSpyObj('Router', ['navigate'])

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy },
      ],
    })

    guard = TestBed.inject(AuthGuard)
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>
  })

  it('should allow activation if authenticated', done => {
    store.select.and.returnValue(of(true))

    guard.canActivate().subscribe(result => {
      expect(result).toBeTrue()
      expect(router.navigate).not.toHaveBeenCalled()
      done()
    })
  })

  it('should redirect and block activation if not authenticated', done => {
    store.select.and.returnValue(of(false))

    guard.canActivate().subscribe(result => {
      expect(result).toBeFalse()
      expect(router.navigate).toHaveBeenCalledWith(['/main/blogs-page'])
      done()
    })
  })

  it('should work the same for canLoad as for canActivate', done => {
    store.select.and.returnValue(of(true))

    guard.canLoad({} as any, [] as any).subscribe(result => {
      expect(result).toBeTrue()
      done()
    })
  })
})
