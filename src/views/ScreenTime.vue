<template>
    <div class="screen-time">
        <!-- 顶部导航 -->
        <div class="nav-bar">
            <span class="back">返回</span>
            <span class="title">所有设备</span>
            <span class="setting">设备</span>
        </div>

        <div class="timetype">
            <div>每周</div>
            <div class="active">每天</div>
        </div>

        <div class="usetit">屏幕使用时间</div>
        <!-- 日期与总时长 -->
        <div class="panle">
            <div class="summary">
                <div class="date">11月10日 今天</div>
                <div class="duration">3小时44分钟</div>
            </div>

            <!-- 顶部柱状图（每周视图） -->
            <div class="chart-week" ref="weekChartRef"></div>
            <div class="chart-hour" ref="hourChartRef"></div>
            <div class="category-stats">
                <div class="item">
                    <div class="blue">社交</div>
                    <div class="time">1小时3分钟</div>
                </div>
                <div class="item">
                    <div class="green">创意</div>
                    <div class="time">52分钟</div>
                </div>
                <div class="item">
                    <div class="orange">购物与美食</div>
                    <div class="time">26分钟</div>
                </div>
            </div>
        </div>
        <div class="updatetime">更新于：今天 14:46</div>
        <div class="updates">
            <div>最常使用</div>
            <div class="updates-right">显示类别</div>
        </div>

        <!--  -->
        <div class="panle">
            <div class="app-list">
                <div class="app-item" v-for="(app, index) in apps" :key="index" @click="onAppClick(app)">
                    <div class="left">
                        <img :src="app.icon" class="icon" />
                        <!-- <span class="name">{{ app.name }}</span> -->
                    </div>
                    <div class="app-right">
                        <div class="name">{{ app.name }}</div>
                        <div class="proflex">
                            <div class="progress-bar" :style="{ width: app.percent + '%' }"></div>

                            <div class="right">
                                <span class="time">{{ app.time }}分钟</span>
                            </div>
                        </div>
                    </div>
                    <van-icon name="arrow" color="#ccc" size="16px"  />

                </div>
            </div>

        </div>

        <!-- 分类统计 -->


        <!-- 应用使用列表 -->
        <!-- <div class="app-list">
            <van-cell title="抖音" label="52分钟" icon="video-o" />
            <van-cell title="微信" label="50分钟" icon="chat-o" />
            <van-cell title="淘宝" label="19分钟" icon="shopping-cart-o" />
            <van-cell title="Fuzozo芙蕾" label="16分钟" icon="smile-o" />
        </div> -->
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { Icon } from 'vant'
import 'vant/es/icon/style'

const weekChartRef = ref(null)
const hourChartRef = ref(null)
const apps = ref([
    {
        name: '抖音',
        time: 52,
        percent: 70,
        icon: 'src/assets/images/douyin.png',
    },
    {
        name: '微信',
        time: 50,
        percent: 65,
        icon: 'src/assets/images/weixin.jpg',
    },
    {
        name: '淘宝',
        time: 19,
        percent: 40,
        icon: 'src/assets/images/taobao.jpeg',
    },

])

onMounted(() => {
    // --- 每周柱状图 ---
    const weekChart = echarts.init(weekChartRef.value)
    const weekOption = {
        grid: { top: 10, bottom: 30, left: 15, right: 30 },
        xAxis: {
            type: 'category',
            data: ['日', '一', '二', '三', '四', '五', '六'],
            axisLabel: { color: '#aaa', fontSize: 11 },
            axisLine: { lineStyle: { color: '#cecece' } },
            axisTick: { show: false },
            splitLine: {
                show: true,
                height: 250,
                lineStyle: {
                    color: '#eee',
                    type: 'dashed',
                    width: 1
                },

            },
        },
        yAxis: {
            type: 'value',
            max: 10,
            splitLine: { lineStyle: { color: '#ececec', type: 'slid' } },
            position: 'right',
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
                color: '#ccc',
                fontSize: 11,
                formatter: function (value) {
                    if (value === 10) {
                        return value + '小时';
                    }
                    if (value === 0) {
                        return 0
                    }
                    return '';
                }
            },
        },
        series: [
            {
                name: '社交',
                type: 'bar',
                stack: 'total',
                barWidth: '50%',
                itemStyle: {
                    color: '#3A8BFF', // 蓝色

                },
                data: [0, 1.2, 0, 0, 0, 0, 0],
                label: {
                    show: false
                }
            },
            {
                name: '创意',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                    color: '#FCA00F' // 橙色
                },
                data: [0, 1.7, 0, 0, 0, 0]
            },
            {
                name: '购物与美食',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                    color: '#40C8E0' // 蓝绿色
                },
                data: [0, 1, 0.5, 0, 0, 0,]
            },
            {
                name: '其他',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                    borderRadius: [4, 4, 0, 0],
                    color: '#d2d1d7' // 灰色
                },
                data: [7, 2, 1, 0]
            }
        ]
    }
    weekChart.setOption(weekOption)

    // --- 每小时柱状图 ---


    let chartInstance = null;

    // 初始化图表
    const initChart = () => {
        if (!hourChartRef.value) return;

        chartInstance = echarts.init(hourChartRef.value);

        const option = {
            // backgroundColor: '#000',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (params) {
                    let result = `${params[0].name}<br>`;
                    params.forEach(item => {
                        const hours = Math.floor(item.value / 60);
                        const minutes = item.value % 60;
                        const timeStr = hours > 0 ? `${hours}小时${minutes}分钟` : `${minutes}分钟`;
                        result += `${item.marker} ${item.seriesName}: ${timeStr}<br>`;
                    });
                    return result;
                }
            },

            grid: { top: 10, bottom: 30, left: 15, right: 30 },
            xAxis: {
                type: 'category',
                data: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时'],
                axisLine: {
                    lineStyle: {
                        color: '#666'
                    }
                },
                axisLabel: {
                    color: '#ccc',
                    fontSize: 11,
                    interval: 5 // 每3个显示一个标签：0时, 3时, 6时, 9时, 12时, 15时, 18时
                },
                splitLine: {
                    show: true,
                    height: 250,
                    lineStyle: {
                        color: '#eee',
                        type: 'dashed',
                        width: 1
                    },

                },

            },
            yAxis: {
                type: 'value',
                splitLine: { lineStyle: { color: '#cecece', type: 'line' } },
                position: 'right',
                axisLabel: {
                    color: '#ccc',
                    fontSize: 11,
                    formatter: function (value) {
                        if (value === 30 || value === 60) {
                            return value + '分钟';
                        }
                        if (value === 0) {
                            return 0
                        }
                        return ''; // 
                    }
                },
                axisLine: { show: false },
                axisTick: { show: false },
                max: 60,
                min: 0

            },
            series: [
                {
                    name: '社交',
                    type: 'bar',
                    stack: 'total',
                    barWidth: '80%',
                    itemStyle: {
                        color: '#3A8BFF', // 准确的蓝色

                    },
                    data: [0, 0, 0, 0, 0, 0, 0, 8, 5, 12, 18, 0],
                    label: {
                        show: false
                    }
                },
                {
                    name: '创意',
                    type: 'bar',
                    stack: 'total',
                    itemStyle: {
                        color: '#FCA00F' // 橙色
                    },
                    data: [0, 0, 0, 0, 0, 0, 0, 12, 18, 10, 10, 0]
                },
                {
                    name: '购物与美食',
                    type: 'bar',
                    stack: 'total',
                    itemStyle: {
                        color: '#40C8E0' // 蓝绿色
                    },
                    data: [0, 0, 0, 0, 0, 0, 10, 15, 18, 12, 8,]
                },
                {
                    name: '其他',
                    type: 'bar',
                    stack: 'total',
                    itemStyle: {
                        borderRadius: [2, 2, 0, 0],
                        color: '#d2d1d7' // 准确的灰色
                    },
                    data: [0, 0, 0, 0, 0, 2, 15, 10, 10, 8, 12, 31]
                }
            ]
        };

        chartInstance.setOption(option);
    };

   
    const handleResize = () => {
        chartInstance?.resize();
    };

    initChart();
    handleResize()

})
</script>

<style scoped>
.screen-time {
    background-color: #f3f2f8;
    color: #666;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    overflow-y: auto;
    padding-bottom: 20px;
}

.timetype {
    display: flex;
    width: 90%;
    margin: 0 auto;
    border-radius: 10px;
    background-color: #e3e2eb;
    color: #333;
    overflow: hidden;
    font-weight: 500;

    div {
        font-size: 14px;
        padding: 5px 0;
        width: 50%;
        text-align: center;
        /* background-color: rgba(255, 255, 255, 0.05); */
    }

    .active {
        margin: 3px;
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 1) !important;

    }
}

.usetit {
    padding-left: 20px;
    margin-top: 20px;
    font-size: 13px;
    color: #666
}

.nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 16px;
    color: #007aff;
    font-size: 16px;

}

.panle {
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    padding: 10px;

    margin: 20px;
}

.title {
    color: #111;
    font-weight: 600;
}

.proflex {
    width: 100%;
    display: flex;
    margin-top: 3px;
    align-items: center;
}

.date {
    color: #aaa;
    font-size: 14px;
}

.duration {
    font-size: 28px;
    /* font-weight: 600; */
    color: #111;
    margin-top: 4px;
}

.chart-week,
.chart-hour {
    width: 100%;
    height: 200px;
}

.category-stats {
    display: flex;
    justify-content: space-between;
    margin: 0 15px 16px;
    font-size: 14px;
    color: #ccc;
}

.updates {
    margin: 0 30px -10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
}

.updatetime {
    margin-left: 30px;
    margin-bottom: 35px;
    font-size: 14px;
    color: #666;
    margin-top: -10px;
}

.updates-right {
    font-size: 14px;
    color: #007aff;
    font-weight: 500;
}

.item {
    /* display: flex;
    align-items: center; */
    gap: 4px;
}

.dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.blue {
    color: #2d7eff;
}

.green {
    color: #4caf50;
}

.orange {
    color: #ff9800;
}

.time {
    color: #999;
}

.app-list {
    /* background-color: #000;
  color: #fff; */
    padding: 0 0 20px;
}

.app-item {
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    padding: 0 0 10px;
    border-bottom: 1px solid #ececec;
    margin-bottom: 10px;
}

.left {
    display: flex;
    align-items: center;
}

.icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    margin-right: 10px;
}

.name {
    font-size: 16px;
    color: #333;
}

.right {
    /* margin-left: auto; */
    color: #aaa;
    font-size: 12px;
}


.progress-bar {
    /* margin-top: 6px; */
    margin-right: 10px;
    height: 5px;
    background: #ccc;
    border-radius: 4px;
    transition: width 0.3s;
}

.app-right {
    flex: 1;
}
</style>
