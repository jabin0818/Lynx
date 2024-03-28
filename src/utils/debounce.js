/**
 * 函数防抖
 * @param fn 函数
 * @param delay 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function _debounce(fn, delay, immediate) {
  var delay = delay || 200;
  var timer;
  return function () {
    var th = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      var callNow = !timer
      timer = setTimeout(() => {
        timer = null;
      }, delay)
      if (callNow) fn.apply(th, args)
    } else {
      timer = setTimeout(function () {
        timer = null;
        fn.apply(th, args);
      }, delay)
    }
  }
}


/**
 * 函数节流
 * @param fn 函数
 * @param interval 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 * @param callback 回调
 * 时间戳和定时器区别：时间戳版本的函数触发是在时间段内开始的时候，而定时器版的函数触发是在时间段内结束的时候
 */
let previous = 0;
let timeout = null;
export function _throttle(fn, interval, type, callback) {
  var interval = interval || 200;
  return function () {
    var th = this;
    var args = arguments;
    if (type === 1) {
      let now = Date.now();
      if (now - previous > interval) {
        previous = now;
        fn.apply(th, args);
      } else {
        callback()
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          fn.apply(th, args)
        }, interval);
      } else {
        callback()
      }
    }
  }
}