import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { MainComponent } from './main/main.component'

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'blogs', pathMatch: 'full' },
      { path: 'blogs', loadChildren: () => import('../blog/blog.module').then(m => m.BlogModule) },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRouterModule {}
