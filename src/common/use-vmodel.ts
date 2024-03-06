import vue, { UnwrapRef, Ref, WritableComputedRef, computed, ref } from 'vue'

function cloneFnJSON(source: any) {
  return JSON.parse(JSON.stringify(source))
}

export function useVModel<P extends object, K extends keyof P, Name extends string>(props: P, key?: K, emit?: (name: Name, ...args: any[]) => void): Ref<UnwrapRef<P[K]>> | WritableComputedRef<P[K]> {
  let initValue = cloneFnJSON(props[key])
  let proxy = ref(initValue)
  let emitKey: Name = ('update:' + String(key)) as Name
  const computValue = computed({
    get() {
      return proxy.value
    },
    set(val) {
      proxy.value = cloneFnJSON(val)
      emit(emitKey, proxy.value)
    },
  })

  return computValue
}
