import {NgModule} from "@angular/core";
import {TestComponent} from "./test/test.component";
import {Test2Component} from "./test2/test2.component";

//

@NgModule({
  declarations: [TestComponent, Test2Component],
  imports: [],
  providers: [],
  exports: [
    TestComponent,
    Test2Component
  ]
})

export class BlogsModule {}
