import {NgModule} from "@angular/core";
import {PostComponent} from "./post/post.component";
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

//

@NgModule({
  declarations: [PostComponent],
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    NgClass,
    AsyncPipe,
  ],
  providers: [],
  exports: [
    PostComponent,
  ]
})

export class BlogsModule {}
