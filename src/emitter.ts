interface HandlerCollection {
  [prop: string]: Array<Function>;
}

class EventEmitter {
  private _handlers: HandlerCollection;

  constructor() {
    this._handlers = {};
  }

  on(event: string, handler: Function): void {
    const handlerBlock = this._handlers[event];

    if (!handlerBlock) {
      this._handlers[event] = [handler];
      return;
    }

    handlerBlock.push(handler);
    this._handlers[event] = handlerBlock;
  }

  emit(event: string, payload: any) {
    const handlers = this._handlers[event];

    if (!handlers) {
      return;
    }

    if (handlers.length === 0) {
      return;
    }

    handlers.forEach(handler => {
      handler(payload);
    });
  }
}

export default EventEmitter;
