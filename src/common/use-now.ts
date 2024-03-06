import { ref, type Ref } from 'vue'
import { useIntervalFn } from './use-interval-fn'
export function useNow(options: any) {
  return useNowWithControl(options)[0]
}

export function useNowWithControl(options: { interval: number } = { interval: 1000 }): [Ref<Date>, ReturnType<typeof useIntervalFn>] {
  const { interval = 1000 } = options
  const now = ref(new Date())
  const update = () => (now.value = new Date())
  const controls = useIntervalFn(update, interval, { immediate: true })
  return [now, controls]
}
