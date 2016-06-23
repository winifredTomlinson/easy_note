export class CrossDomainMessage {
  private evtQueueMap: Map<string, Set<Function>> = new Map<string, Set<Function>>();
  constructor() {
    console.log('cross domain message init.');
  }

  init() {
    window.addEventListener('message', (evt) => {
      //todo: 校验evt.data合法性
      if (this.evtQueueMap.has(evt.data.eventName)) {
        let eventHandlerSet = this.evtQueueMap.get(evt.data.eventName);
        for (let i = 0; i < eventHandlerSet.size; i++) {
          eventHandlerSet[i].apply(null, evt.data);
        }
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
} 