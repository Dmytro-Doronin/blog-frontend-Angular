import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponentComponent } from './header-component/header-component.component'

@NgModule({
  declarations: [HeaderComponentComponent],
  imports: [CommonModule],
  exports: [HeaderComponentComponent],
})
export class HeaderModule {}
