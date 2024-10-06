import {RouterModule, Routes} from "@angular/router";
import {ErrorPageComponent} from "../shared/components/404/404.component";
import {NgModule} from "@angular/core";

export const routes: Routes = [
  // { path: '', redirectTo: 'main/blogs', pathMatch: 'full' },
  // { path: '', loadChildren: () => import('../blog/blog.module').then(m => m.BlogModule) },
  { path: 'blogs', loadChildren: () => import('../blog/blog.module').then(m => m.BlogModule) },
  // { path: '**', component: ErrorPageComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class MainRouterModule {}
