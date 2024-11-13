import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../shared/shared.module'
import { ProfileRoutingModule } from './profile-routing.module'
import { ProfilePageComponent } from './profile-page/profile-page.component'

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule],
  exports: [ProfilePageComponent],
})
export class ProfileModule {}
