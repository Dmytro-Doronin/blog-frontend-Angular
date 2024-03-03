import {NgModule} from "@angular/core";
import {TestComponent} from "./test/test.component";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";

//

@NgModule({
  declarations: [TestComponent],
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    NgClass
  ],
  providers: [],
  exports: [
    TestComponent,
  ]
})

export class BlogsModule {}
