import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

function useStorageString(key: string) {
  let keyValue = uni.getStorageSync(key)
  let value = ref<string>(keyValue)
  watch(value, val => {
    if (val === undefined || val === null) {
      uni.removeStorage({ key })
    } else {
      uni.setStorage({
        key,
        data: val,
      })
    }
  })
  return value
}

export const useStore = defineStore('local', () => {
  const openid = useStorageString('openid')
  const token = useStorageString('token')
  const refreshToken = useStorageString('refreshToken')

  return {
    token,
    openid,
    refreshToken,
  }
})
