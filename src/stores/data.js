import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userData = defineStore('userData', {
 state: () => ({ 
    
    
    currentTable: {}

}),
    actions: {
      increment() {
        this.count++
      },
    },
  })
