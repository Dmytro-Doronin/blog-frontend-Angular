import { NgModule } from '@angular/core'
import { ButtonComponent } from './ui/button/button.component'
import { TypographyComponent } from './ui/typography/typography.component'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { ErrorPageComponent } from './components/404/404.component'
import { AlertComponent } from './components/alert/alert.component'
import { AppLoaderComponent } from './components/app-loader/app-loader.component'
import { CardComponent } from './components/card/card.component'
import { LoaderComponent } from './components/loader/loader.component'
import { ModalComponent } from './components/modal/modal.component'
import { ParentAlertComponent } from './components/parent-alert/parent-alert.component'
import { HeaderComponentComponent } from './header/header-component/header-component.component'
import { IconSignOutComponent } from './header/icon-sign-out/icon-sign-out.component'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { AsideComponent } from './components/aside/aside.component'
import { BurgerComponent } from './components/icons/burger/burger.component'
import { PostLinkIconComponent } from './components/icons/post-link-icon/post-link-icon.component'
import { InputComponent } from './ui/input/input.component'
import { SearchIconComponent } from './components/icons/search-icon/search-icon.component'
import { SelectComponentComponent } from './ui/select-component/select-component.component'
import { NgSelectModule } from '@ng-select/ng-select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ArrowDownComponent } from './components/arrow-down/arrow-down.component'
import { ArrowUpComponent } from './components/arrow-up/arrow-up.component'
import { ContentPictureComponent } from './components/content-picture/content-picture.component'
import { EmptyPictureComponent } from './components/icons/empthy-picture/empty-picture.component'
import { MainPageComponent } from './components/main-page/main-page.component'
import { ArrowBackComponent } from './components/icons/arrow-back/arrow-back.component'
import { PointsIconComponent } from './components/icons/points-icon/points-icon.component'
import { ItemControlMenuComponent } from './components/item-control-menu/item-control-menu.component'
import { TrashIconComponent } from './components/icons/trash-icon/trash-icon.component'
import { ControlMenuComponent } from './components/control-menu/control-menu.component'
import { TriangleIconComponent } from './components/icons/triangle-icon/triangle-icon.component'
import { EditIconComponent } from './components/icons/edit-icon/edit-icon.component'
import { SearchComponent } from './components/search/search.component'
import { BlogItemComponent } from './components/blog-item/blog-item.component'
import { BlogControlMenuComponent } from './components/blog-control-menu/blog-control-menu.component'
import { PostItemComponent } from './components/post-item/post-item.component'
import { LikeIconComponent } from './components/icons/like-icon/like-icon.component'
import { DislikeIconComponent } from './components/icons/dislike-icon/dislike-icon.component'
import { LikeDislikeComponent } from './components/like-dislike/like-dislike.component'
import { IconSignInComponent } from './header/icon-sign-in/icon-sign-in.component'
import { PostControlMenuComponent } from './components/post-control-menu/post-control-menu.component'
import { CommentItemComponent } from './components/comment-item/comment-item.component'
import { CommentControlMenuComponent } from './components/comment-control-menu/comment-control-menu.component'
import { EditCommentFormComponent } from './components/comment-item/edit-comment-form/edit-comment-form.component'
import { LoginMenuComponent } from './components/login-menu/login-menu.component'
import { ItemSimpleComponent } from './components/item-simple/item-simple.component'
import { ChromeIconComponent } from './components/icons/chrome-icon/chrome-icon.component'
import { DeviceItemComponent } from './components/device-item/device-item.component'
import { BurgerMenuComponent } from './components/burger-menu/burger-menu.component'
import { PhoneIconComponent } from './components/icons/phone-icon/phone-icon.component'
import { DownloadImgComponent } from './components/download-img/download-img.component'

@NgModule({
  declarations: [
    ErrorPageComponent,
    AlertComponent,
    AppLoaderComponent,
    CardComponent,
    LoaderComponent,
    ModalComponent,
    ParentAlertComponent,
    HeaderComponentComponent,
    IconSignOutComponent,
    ButtonComponent,
    TypographyComponent,
    AsideComponent,
    BurgerComponent,
    PostLinkIconComponent,
    InputComponent,
    SearchIconComponent,
    SelectComponentComponent,
    ArrowDownComponent,
    ArrowUpComponent,
    ContentPictureComponent,
    EmptyPictureComponent,
    MainPageComponent,
    ArrowBackComponent,
    PointsIconComponent,
    ItemControlMenuComponent,
    TrashIconComponent,
    ControlMenuComponent,
    TriangleIconComponent,
    EditIconComponent,
    SearchComponent,
    BlogItemComponent,
    BlogControlMenuComponent,
    PostItemComponent,
    LikeIconComponent,
    DislikeIconComponent,
    LikeDislikeComponent,
    IconSignOutComponent,
    IconSignInComponent,
    PostControlMenuComponent,
    CommentItemComponent,
    CommentControlMenuComponent,
    EditCommentFormComponent,
    LoginMenuComponent,
    ItemSimpleComponent,
    ChromeIconComponent,
    DeviceItemComponent,
    BurgerMenuComponent,
    PhoneIconComponent,
    DownloadImgComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  exports: [
    ErrorPageComponent,
    AlertComponent,
    AppLoaderComponent,
    CardComponent,
    LoaderComponent,
    ModalComponent,
    ParentAlertComponent,
    ButtonComponent,
    TypographyComponent,
    CommonModule,
    HeaderComponentComponent,
    AsideComponent,
    BurgerComponent,
    PostLinkIconComponent,
    InputComponent,
    SearchIconComponent,
    SelectComponentComponent,
    NgSelectModule,
    FormsModule,
    ArrowDownComponent,
    ArrowUpComponent,
    ContentPictureComponent,
    EmptyPictureComponent,
    MainPageComponent,
    ArrowBackComponent,
    PointsIconComponent,
    ItemControlMenuComponent,
    TrashIconComponent,
    ControlMenuComponent,
    TriangleIconComponent,
    EditIconComponent,
    SearchComponent,
    BlogItemComponent,
    BlogControlMenuComponent,
    PostItemComponent,
    LikeIconComponent,
    DislikeIconComponent,
    LikeDislikeComponent,
    IconSignInComponent,
    PostControlMenuComponent,
    CommentItemComponent,
    CommentControlMenuComponent,
    EditCommentFormComponent,
    LoginMenuComponent,
    ItemSimpleComponent,
    ChromeIconComponent,
    DeviceItemComponent,
    BurgerMenuComponent,
    PhoneIconComponent,
    DownloadImgComponent,
  ],
})
export class SharedModule {}
