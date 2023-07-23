import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(10000)
  const doubleCount = computed(() => count.value * 2)
  function add() {
    count.value++
  }

  return { count, doubleCount, add }
})
