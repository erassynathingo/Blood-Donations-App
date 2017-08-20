import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/pnotify.js';
import 'pnotify/dist/pnotify.callbacks.js';
import 'pnotify/dist/pnotify.confirm.js';
@Injectable()
export class Pnotify {
  constructor() {
    PNotify.prototype.options.styling = 'bootstrap3';
    PNotify.prototype.options.styling = "fontawesome";
  }
  notify(settings: any) {
    return new PNotify(settings);
  }

  error(text: string, delay?: number, title?: string) {
    return this.notify({
      title: title || 'Error',
      text: text,
      type: 'error',
      delay: delay || 2000
    });
  }

  info(text: string, delay?: number, title?: string) {
    return this.notify({
      title: title || 'Info',
      text: text,
      type: 'info',
      delay: delay || 2000
    });
  }

  success(text: string, delay?: number, title?: string) {
    return this.notify({
      title: title || 'Success',
      text: text,
      type: 'success',
      delay: delay || 2000
    });
  }

  notice(text: string, delay?: number, title?: string) {
    return this.notify({
      title: title || 'Success',
      text: text,
      delay: delay || 2000
    });
  }
};
