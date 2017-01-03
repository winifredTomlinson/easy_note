import { Injectable } from '@angular/core';
import { NegUtil } from './negUtil';

let noop = function () { };

const defaults = {
  type: 'info',
  theme: 'flat',
  hideAfter: 3,
  showCloseButton: true,
  escapeText: true
};

declare let Messenger: any;

@Injectable()
export class NegAlert {
  private messageBox: any;
  constructor(private negUtil: NegUtil) {
    Messenger.options = {
      extraClasses: 'messenger-fixed messenger-on-top',
      theme: 'flat'
    };
    this.messageBox = Messenger();
    window['t'] = this;
  }

  info(message: string, callback?: Function, userOpt = {}) {
    let opt = Object.assign({}, userOpt, { type: 'info', callback, message });
    return this._post(opt);
  }

  success(message: string, callback?: Function, userOpt = {}) {
    let opt = Object.assign({}, userOpt, { type: 'success', callback, message });
    return this._post(opt);
  }

  error(message: string, callback?: Function, userOpt = {}) {
    let opt = Object.assign({}, userOpt, { type: 'error', callback, message });
    return this._post(opt);
  }

  alert(message: string, callback?: Function, userOpt = {}) {
    let opt = Object.assign({}, userOpt, {
      message,
      type: 'error',
      showCloseButton: false,
      seconds: 60 * 60 * 24,
      actions: {
        OK: callback || noop
      }
    });
    return this._post(opt);
  }

  confirm(message: string, okCallback?: Function, cancelCallback?: Function, userOpt = {}) {
    let opt = Object.assign({}, userOpt, {
      message,
      type: 'info',
      showCloseButton: false,
      seconds: 60 * 60 * 24,
      actions: {
        OK: okCallback || noop,
        CANCEL: cancelCallback || noop
      }
    });
    return this._post(opt);
  }

  show(message: string, userOpt = {}) {
    let opt = Object.assign({ type: 'info' }, userOpt, { message });
    return this._post(opt);
  }

  _post(options: any) {
    let opt: any = Object.assign({}, defaults);
    ['type', 'theme', 'closeButtonText', 'onClickClose', 'message'].forEach(p => {
      opt[p] = options[p];
    });
    if (options.showCloseButton === false) {
      opt.showCloseButton = false;
    }
    if (options.allowHtml) {
      opt.escapeText = false;
    }
    if (options.seconds) {
      opt.hideAfter = options.seconds;
    }
    if (options.actions) {
      opt.actions = {};
      Object.keys(options.actions).forEach((label, idx) => {
        opt.actions[`btn${idx + 1}`] = {
          label,
          action(evt, msg) {
            Promise.resolve(options.actions[label](msg))
              .then(notCancel => {
                if (notCancel !== false) {
                  msg.hide();
                }
              });
          }
        };
      });
    }
    let ins = this.messageBox.post(opt);
    if (typeof options.callback === 'function') {
      this.negUtil.addWatcher(ins, 'shown', newVal => {
        options.callback(ins);
      }, ins.shown);
    }
    return ins;
  }

  close(ins) {
    if (ins && typeof ins.hide === 'function') {
      ins.hide();
    }
  }

  closeAll() {
    this.messageBox.hideAll();
  }
};
