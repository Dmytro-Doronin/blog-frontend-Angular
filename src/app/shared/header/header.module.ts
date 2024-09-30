import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponentComponent } from './header-component/header-component.component'
import { RouterLink } from '@angular/router'
import {IconSignOutComponent} from "./icon-sign-out/icon-sign-out.component";
import {EyeCloseComponent} from "../../auth/eye-close/eye-close.component";

@NgModule({
  declarations: [HeaderComponentComponent],
  imports: [CommonModule, RouterLink, IconSignOutComponent],
  exports: [HeaderComponentComponent, IconSignOutComponent],
})
export class HeaderModule {}
