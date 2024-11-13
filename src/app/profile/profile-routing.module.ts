import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { ProfilePageComponent } from './profile-page/profile-page.component'

export const profileRoutes: Routes = [{ path: '', component: ProfilePageComponent }]

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
