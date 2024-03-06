import { ref, unref, isRef, watch, getCurrentScope, onScopeDispose } from 'vue'

function tryOnScopeDispose(fn: () => void) {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}
/**
 * vueuse 版本的useIntervalFn ，需要判断是否是在客户端模式，他的判断是 typeof window == 'undefined'， 这在小程序中是无法工作的， 这里去掉这个判断
 * @param cb
 * @param interval
 * @param options
 * @returns
 */
export function useIntervalFn(cb: CallableFunction, interval = 1000, options: { immediate?: boolean; immediateCallback?: boolean } = { immediate: true, immediateCallback: true }) {
  const { immediate = true, immediateCallback = false } = options
  let timer: any = null
  const isActive = ref(false)
  function clean() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }
  function pause() {
    isActive.value = false
    clean()
  }
  function resume() {
    if (unref(interval) <= 0) return
    isActive.value = true
    if (immediateCallback) cb()
    clean()
    timer = setInterval(cb, interval)
  }
  if (immediate) resume()
  if (isRef(interval)) {
    const stopWatch = watch(interval, () => {
      if (isActive.value) resume()
    })
    tryOnScopeDispose(stopWatch)
  }
  tryOnScopeDispose(pause)
  return {
    isActive,
    pause,
    resume,
  }
}
