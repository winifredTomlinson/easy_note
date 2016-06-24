import {Injectable} from '@angular/core'

@Injectable()
export class CrossDomainMessage {
  private evtQueueMap: Map<string, Set<Function>> = new Map<string, Set<Function>>();
  constructor() {
    console.log('cross domain message init.');
  }

  init() {
    window.addEventListener('message', (evt) => {
      let data = evt.data;
      if (typeof data !== 'object' || !data.eventName || !data.data) {
        console.log('eventName or data not found.');
        return;
      }
      if (this.evtQueueMap.has(data.eventName)) {
        let eventHandlerSet = this.evtQueueMap.get(data.eventName);
        eventHandlerSet.forEach((hanlder) => {
          hanlder.apply(null, [data.data]);
        });
      }
    }, false);
  }

  register(eventName, handlerFunc) {
    let self = this;
    if (!self.evtQueueMap.has(eventName)) {
      self.evtQueueMap.set(eventName, new Set<Function>());
    }
    self.evtQueueMap.get(eventName).add(handlerFunc);
    return function () {
      self.evtQueueMap.get(eventName).delete(handlerFunc);
    };
  }

  unregister(eventName, handlerFunc) {
    let self = this;
    if (this.evtQueueMap.has(eventName)) {
      this.evtQueueMap.get(eventName).delete(handlerFunc);
      return true;
    }
    return false;
  }

  emit(eventName, data) {
    let postMsg = {
      eventName: eventName,
      data: data
    };
    window.frames[0].postMessage(postMsg, '*');
  }
} 