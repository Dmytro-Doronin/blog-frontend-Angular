import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../shared/shared.module'
import { ProfileRoutingModule } from './profile-routing.module'
import { ProfilePageComponent } from './profile-page/profile-page.component'
import { ProfileEditFormComponent } from './profile-edit-form/profile-edit-form.component'

@NgModule({
  declarations: [ProfilePageComponent, ProfileEditFormComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule],
  exports: [ProfilePageComponent, ProfileEditFormComponent],
})
export class ProfileModule {}
