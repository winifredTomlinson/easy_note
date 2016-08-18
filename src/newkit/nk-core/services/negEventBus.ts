import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

interface Event {
  source: Subject<any>,
  observable: any
}

const eventMap: Map<string, Event> = new Map<string, Event>();

@Injectable()
export class NegEventBus {



  constructor() { }

  emit(eventName: string, data?: any): boolean {
    if (eventMap.has(eventName)) {
      eventMap.get(eventName).source.next(data);
      return true;
    };
    return false;
  }

  on(eventName: string, handler: Function): Subscription {
    let eventObservable;
    if (!eventMap.has(eventName)) {
      let eventSource = new Subject<any>();
      eventObservable = eventSource.asObservable();
      eventMap.set(eventName, { source: eventSource, observable: eventObservable });
    } else {
      eventObservable = eventMap.get(eventName).observable;
    }
    return eventObservable.subscribe(handler);
  }
}