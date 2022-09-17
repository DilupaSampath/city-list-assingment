import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  // trigger global event through this service
  export class SharedEventDataHandlerService {
    private globalEventHandler = new BehaviorSubject<any>(null);
    globalEventHandler$ = this.globalEventHandler.asObservable();


    triggerGlobalEventHandler(data: any, event: any){
        const eventData = {
          EVENT: event,
          data
        }
        this.globalEventHandler.next(eventData);
      }
  }