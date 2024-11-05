import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {addBlogsAction, setBlogsLoadingAction} from "../actions/blogs.actions";
import {catchError, concatMap, mergeMap} from "rxjs/operators";
import {concat, of} from "rxjs";
import {addAuthAlert} from "../actions/auth.actions";
import {DevicesService} from "../../core/services/devices.service";
import {getAllDevices, setDevicesLoading, successGetAllDevices} from "../actions/devices.action";
import {IDevice} from "../../types/devices.model";

@Injectable()
export class DeviceEffects {
  constructor(
    private actions$: Actions,
    private deviceService: DevicesService,
    private router: Router
  ) {}

  blogAdd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllDevices),
      concatMap(action =>
        concat(
          of(setDevicesLoading({ loading: true })),
          this.deviceService
            .getAllDevices()
            .pipe(
              mergeMap((response: IDevice[]) => {
                return [
                  // addAuthAlert({ severity: 'success', message: 'Blog has been added!' }),
                  successGetAllDevices({devices: response}),
                  setDevicesLoading({ loading: false }),
                ]
              }),
              catchError(error => {
                const message = error.error.errorsMessages[0].message
                return of(
                  setDevicesLoading({ loading: false }),
                  addAuthAlert({ severity: 'error', message: message })
                )
              })
            )
        )
      )
    )
  )
}
