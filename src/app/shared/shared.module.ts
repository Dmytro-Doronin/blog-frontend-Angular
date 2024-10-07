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
import {RouterLink, RouterLinkActive} from '@angular/router'
import {AsideComponent} from "./components/aside/aside.component";
import {BurgerComponent} from "./components/icons/burger/burger.component";
import {PostLinkIconComponent} from "./components/icons/post-link-icon/post-link-icon.component";

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
    PostLinkIconComponent
  ],
  imports: [CommonModule, RouterLink, RouterLinkActive],
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
    PostLinkIconComponent
  ],
})
export class SharedModule {}
