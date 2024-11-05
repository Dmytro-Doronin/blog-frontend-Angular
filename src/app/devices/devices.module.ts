import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DevicesPageComponent} from "./pages/devices-page/devices-page.component";
import {DevicesRoutingModule} from "./devices-routing.module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [DevicesPageComponent],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    SharedModule
  ],
  exports: [DevicesPageComponent]
})
export class DevicesModule { }
