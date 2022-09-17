import { Injectable, Injector } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CityService } from "src/app/modules/cities/services/city.service";
import { UserService } from "src/app/modules/users/services/user.service";
import { SharedEventDataHandlerService } from "src/app/shared/services/shared-event-data-handler.service";
import { NotificationService } from "./notification.service";
@Injectable({
  providedIn: 'root'
})
/**
 * This is the global facade for all services in the application. WThis is a bridge to all common services. 
 * So no need to import each and every services. Just Inject this service and we can use other services 
 * throug this. Implemented with facade pattern
 */
export class GlobalFacadeService {

  constructor(private injector: Injector) {
  }

  private _sharedEventDataHandlerService!: SharedEventDataHandlerService;
  private _cityService!: CityService;
  private _userService!: UserService;
  private _notificationService!: NotificationService


  // global event handller
  public get sharedEventDataHandlerService(): SharedEventDataHandlerService {
    if (!this._sharedEventDataHandlerService) {
      this._sharedEventDataHandlerService = this.injector.get(SharedEventDataHandlerService);
    }
    return this._sharedEventDataHandlerService;
  }

  public get cityService(): CityService {
    if (!this._cityService) {
      this._cityService = this.injector.get(CityService);
    }
    return this._cityService;
  }

  public get userService(): UserService {
    if (!this._userService) {
      this._userService = this.injector.get(UserService);
    }
    return this._userService;
  }
  public get notificationService(): NotificationService {
    if (!this._notificationService) {
      this._notificationService = this.injector.get(NotificationService);
    }
    return this._notificationService;
  }
}