// useClock.ts
import { onMounted, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'

export function useTimeNow() {
  const now = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
  const paused = ref(false)
  let intervalId: number | undefined

  const nowtime = () => {
    now.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
  }

  const updatetime = () => {
    now.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
    intervalId = window.setInterval(nowtime, 1000)
  }

  const pause = () => {
    console.log(intervalId)
    paused.value = true
    if (intervalId)
      clearInterval(intervalId)
  }

  const resume = () => {
    console.log(intervalId)
    paused.value = false
    updatetime()
  }

  onMounted(() => {
    updatetime()
  })

  onUnmounted(() => {
    if (intervalId)
      clearInterval(intervalId)
  })

  return {
    now,
    pause,
    resume,
  }
}
