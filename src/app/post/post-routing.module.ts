import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PostsPageComponent} from "./pages/posts-page/posts-page.component";

export const postsRoutes: Routes = [{ path: '', component: PostsPageComponent }]
@NgModule({
  imports: [RouterModule.forChild(postsRoutes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
