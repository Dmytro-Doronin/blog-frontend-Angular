import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectIsAuthenticated, selectUserLogin } from '../../../store/selectors/auth.selector'
import { logOut } from '../../../store/actions/auth.actions'
import { selectAppLoading } from '../../../store/selectors/app.selector'

@Component({
  selector: 'blog-header-component',
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.scss',
})
export class HeaderComponentComponent implements OnInit {
  isAuthenticated$?: Observable<boolean>
  userLogin$?: Observable<string>
  headerLoading$?: Observable<boolean>
  isModal: boolean = false
  isMenuOpen = false;


  constructor(private store: Store, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.loader()
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated)
    if (this.isAuthenticated$) {
      this.userLogin$ = this.store.select(selectUserLogin)
    }
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  loader() {
    this.headerLoading$ = this.store.select(selectAppLoading)
  }

  onClose() {
    this.isModal = false
  }

  onOpen() {
    this.isModal = true
  }


  logOut() {
    this.store.dispatch(logOut())
    this.onClose()
  }

}
