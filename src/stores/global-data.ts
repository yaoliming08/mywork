import { defineStore } from 'pinia'

import { ref } from 'vue'

export const useStore = defineStore('global-data', () => {
  const scene = ref('')
  return {
    scene,
  }
})
