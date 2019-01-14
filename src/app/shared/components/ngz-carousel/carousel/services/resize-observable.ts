import {Observable} from 'rxjs';
import {debounceTime, finalize, tap} from 'rxjs/operators';
import ResizeObserver from 'resize-observer-polyfill';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An observable creator for element resize.
 * @param {?} elm the watch element.
 * @param {?} cb when resize complete, call back function.
 * @param {?=} time resize emit time, default is 200
 */

function resizeObservable(elm, cb, time = 200) {
  let elmObserve$;
  return Observable.create((observer) => {
    elmObserve$ = new ResizeObserver((entries, obs) => {
      observer.next(elmObserve$);
    });
    elmObserve$.observe(elm);
  }).pipe(debounceTime(time), tap(() => {
    cb();
  }), finalize(() => {
    elmObserve$.unobserve(elm);
    elmObserve$.disconnect();
  }));
}

export {resizeObservable};
