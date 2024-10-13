import { NgModule } from '@angular/core'
import { ButtonComponent } from './ui/button/button.component'
import { TypographyComponent } from './ui/typography/typography.component'
import { CommonModule } from '@angular/common'
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
import { RoundPictureComponent } from './components/round-picture/round-picture.component'
import { EmptyPictureComponent } from './components/icons/empthy-picture/empty-picture.component'
import { MainPageComponent } from './components/main-page/main-page.component'
import { ArrowBackComponent } from './components/icons/arrow-back/arrow-back.component'

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
    RoundPictureComponent,
    EmptyPictureComponent,
    MainPageComponent,
    ArrowBackComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
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
    RoundPictureComponent,
    EmptyPictureComponent,
    MainPageComponent,
    ArrowBackComponent,
  ],
})
export class SharedModule {}
