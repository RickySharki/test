<template>
  <div v-loading="loading" class="w-[100%] h-[100%]" />
</template>

<script setup lang="ts">
import { useCurrentElement, useResizeObserver } from '@vueuse/core'
import type { EChartsType } from 'echarts'
import * as echarts from 'echarts'
import { type PropType, nextTick } from 'vue'
import { onUnmounted, ref, watch } from 'vue'

type EChartsOptions = Parameters<EChartsType['setOption']>[0]
const props = defineProps({
  params: {
    type: Object,
    default: () => ({}),
  },
  getOption: {
    type: Function as PropType<(params: Object) => Promise<EChartsOptions> | EChartsOptions>,
    default: null,
  },
  autoSize: {
    type: Boolean,
    default: false,
  },
  notMerge: {
    type: Boolean,
    default: false,
  },
  noRebuilt: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['created', 'dispose'])

const loading = ref(false)
let rafId = 0
let charts: EChartsType | null = null
const el = useCurrentElement<HTMLElement>()
if (props.autoSize) {
  useResizeObserver(el, () => {
    if (rafId)
      cancelAnimationFrame(rafId)

    rafId = requestAnimationFrame(() => {
      charts?.resize()
    })
  })
}

const disposeChart = () => {
  charts?.dispose()
  charts = null
  emit('dispose')
}

const getOption = () => {
  return props.getOption?.(props.params) || props.params
}
const setOption = (option: EChartsOptions) => {
  if (charts)
    charts.setOption(option, { notMerge: props.notMerge })
}

const render = async () => {
  disposeChart()
  loading.value = true
  const [options] = await Promise.all([
    getOption(),
  ])
  loading.value = false
  nextTick(() => {
    charts = echarts.init(el.value)

    setOption(options)
    emit('created', charts)
  })
}

onUnmounted(() => {
  disposeChart()
})

watch(() => props.params, async () => {
  if (props.noRebuilt && charts) {
    const options = await getOption()
    setOption(options)
    return
  }
  nextTick(render)
}, { deep: true, immediate: true })

defineExpose({
  getEChartsInstance: () => charts, // 暴露一个方法可以获取ECharts实例
})
</script>
