<template>
  <div ref="chartRef" style="width: 100%; height: 200px;"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const chartRef = ref(null)

onMounted(() => {
  const chart = echarts.init(chartRef.value)

  const option = {
    grid: { left: 20, right: 20, top: 20, bottom: 30 },
    xAxis: {
      type: 'category',
      data: ['0时', '6时', '9时', '12时', '15时', '18时'],
      axisLabel: { color: '#aaa' },
      axisLine: { lineStyle: { color: '#444' } }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#aaa' },
      splitLine: { lineStyle: { color: '#333' } }
    },
    series: [{
      type: 'bar',
      data: [5, 10, 20, 35, 30, 10],
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
        color: '#007aff'
      }
    }]
  }

  chart.setOption(option)
})
</script>
