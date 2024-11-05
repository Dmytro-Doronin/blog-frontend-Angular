
import {RouterModule, Routes} from "@angular/router";
import {DevicesPageComponent} from "./pages/devices-page/devices-page.component";
import {NgModule} from "@angular/core";

export const devicesRoutes: Routes = [
  { path: '', component: DevicesPageComponent }
]

@NgModule({
  imports: [RouterModule.forChild(devicesRoutes)],
  exports: [RouterModule],
})
export class DevicesRoutingModule {}
