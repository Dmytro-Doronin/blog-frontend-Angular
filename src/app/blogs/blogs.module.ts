import {NgModule} from "@angular/core";
import {TestComponent} from "./test/test.component";
import {Test2Component} from "./test2/test2.component";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

//

@NgModule({
  declarations: [TestComponent, Test2Component],
  imports: [
    FormsModule,
    NgIf
  ],
  providers: [],
  exports: [
    TestComponent,
    Test2Component
  ]
})

export class BlogsModule {}
