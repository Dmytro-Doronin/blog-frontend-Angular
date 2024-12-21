import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MainComponent } from './main/main.component'
import { MainRouterModule } from './main-router.module'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRouterModule, SharedModule],
  exports: [MainComponent, SharedModule],
})
export class MainModule {}
