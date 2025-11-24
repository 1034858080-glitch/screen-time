<template>
  <div class="chart-container">
    <div ref="chartRef" class="chart"></div>
    <div class="summary">
      <div class="summary-item">
        <span class="dot social"></span>
        <span>社交: {{ formatTime(socialTotal) }}</span>
      </div>
      <div class="summary-item">
        <span class="dot creative"></span>
        <span>创意: {{ formatTime(creativeTotal) }}</span>
      </div>
      <div class="summary-item">
        <span class="dot shopping"></span>
        <span>购物与美食: {{ formatTime(shoppingTotal) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref(null);
const socialTotal = 63; // 1小时3分钟 = 63分钟
const creativeTotal = 52;
const shoppingTotal = 26;

// 格式化分钟数为小时和分钟
const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}小时${mins}分钟` : `${mins}分钟`;
};

// 模拟数据 - 根据图表分布生成
const generateData = () => {
  const hours = Array.from({ length: 19 }, (_, i) => i); // 0-18小时
  
  // 社交活动数据（蓝色）
  const socialData = [
    0, 0, 0, 0, 0, 5, 10, 15, 12, 8, 
    6, 4, 3, 0, 0, 0, 0, 0, 0
  ];
  
  // 创意活动数据（青色）
  const creativeData = [
    0, 0, 0, 0, 3, 5, 8, 10, 9, 7, 
    5, 3, 2, 0, 0, 0, 0, 0, 0
  ];
  
  // 购物与美食数据（橙色）
  const shoppingData = [
    0, 0, 0, 0, 2, 3, 4, 5, 4, 3, 
    2, 2, 1, 0, 0, 0, 0, 0, 0
  ];
  
  return { hours, socialData, creativeData, shoppingData };
};

onMounted(() => {
  if (!chartRef.value) return;
  
  const chart = echarts.init(chartRef.value);
  const { hours, socialData, creativeData, shoppingData } = generateData();
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params) => {
        const hour = params[0].axisValue;
        let result = `${hour}时<br/>`;
        
        params.forEach(param => {
          const value = param.value;
          if (value > 0) {
            result += `${param.marker}${param.seriesName}: ${value}分钟<br/>`;
          }
        });
        
        return result;
      }
    },
    legend: {
      data: ['社交', '创意', '购物与美食'],
      top: 0,
      left: 'center',
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        fontSize: 12,
        color: '#333'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: hours,
      name: '时间（时）',
      nameLocation: 'middle',
      nameGap: 25,
      axisLabel: {
        fontSize: 12,
        color: '#666',
        formatter: function(value) {
          // 只显示0时、6时、12时、18时这几个刻度
          if ([0, 6, 12, 18].includes(value)) {
            return value + '时';
          }
          return '';
        }
      },
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      },
      axisTick: {
        show: false
      },
      // 添加X轴网格线（虚线）
      splitLine: {
        show: true,
        lineStyle: {
          color: '#ddd',
          type: 'dashed',
          width: 1
        },
        // 只在0时、6时、12时、18时处显示网格线
        interval: (index, value) => [0, 6, 12, 18].includes(value)
      }
    },
    yAxis: {
      type: 'value',
      name: '分钟',
      nameLocation: 'middle',
      nameGap: 35,
      max: 60,
      interval: 10,
      axisLabel: {
        fontSize: 12,
        color: '#666'
      },
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      },
      // Y轴主要网格线（实线）
      splitLine: {
        show: true,
        lineStyle: {
          color: '#eee',
          type: 'solid',
          width: 1
        }
      },
      // 添加Y轴次要网格线（虚线）
      minorSplitLine: {
        show: true,
        lineStyle: {
          color: '#f0f0f0',
          type: 'dashed',
          width: 1
        }
      },
      minorTick: {
        show: true
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: '社交',
        type: 'bar',
        barWidth: '20%',
        data: socialData,
        itemStyle: {
          color: '#4285F4' // 蓝色
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      },
      {
        name: '创意',
        type: 'bar',
        barWidth: '20%',
        data: creativeData,
        itemStyle: {
          color: '#34A853' // 青色
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      },
      {
        name: '购物与美食',
        type: 'bar',
        barWidth: '20%',
        data: shoppingData,
        itemStyle: {
          color: '#FBBC05' // 橙色
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  
  chart.setOption(option);
  
  // 响应式调整
  window.addEventListener('resize', () => {
    chart.resize();
  });
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.chart {
  width: 90%;
  height: 200px;
}

.summary {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 30px;
  padding-bottom: 10px;
}

.summary-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}

.social {
  background-color: #4285F4;
}

.creative {
  background-color: #34A853;
}

.shopping {
  background-color: #FBBC05;
}
</style>