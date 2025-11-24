<template>
    <div class="screen-time">
        <!-- 顶部导航 -->
        <div class="header">
            <div class="headerleft">
                <div>{{ updateTime }}</div>
                <img class="headerleft_img" src='/src/assets/images/xiaom1.png' />
                <van-icon name="ellipsis" color="#333" size="14" />
            </div>
            <div><img src='/src/assets/images/xiaom.png' /></div>
        </div>
        <div class="nav-bar">
            <img class="xiaom5" src='/src/assets/images/xiaom5.png' />
            <img class="xiaom4" src='/src/assets/images/xiaom4.png' />
        </div>
        <div class="titletext">屏幕使用时长统计</div>
        <div class="timetype">
            <div class="active">日</div>
            <div>周</div>
            <div>月</div>
        </div>


        <!-- 日期与总时长 -->
        <div class="panle">
            <div class="stitle">
                <van-icon name="arrow-left" color="#111" size="16px" />
                <div>今日屏幕使用时长</div>
                <van-icon name="arrow" color="#ccc" size="16px" />
            </div>
            <div class="summary">
                <div class="duration">7小时44分钟</div>
                <div class="date">较昨日减少6小时11分钟</div>

            </div>


            <div class="chart-hour" ref="hourChartRef"></div>

        </div>

        <div class="height"></div>

        <!--  -->
        <div class="panle">
            <div class="useinfo">
                <div class="usetit">今日应用使用情况</div>
                <div class="flexdiv">
                    <div class="name"> 名称</div>
                    <div class="usearrow">
                        <van-icon name="arrow-up" color="#999" size="15px" />
                        <van-icon name="arrow-down" color="#999" size="15px" />
                    </div>
                </div>
            </div>
            <div class="app-list">
                <div class="app-item" v-for="(app, index) in apps" :key="index" @click="onAppClick(app)">
                    <div class="left">
                        <img :src="app.icon" class="icon" />
                    </div>
                    <div class="app-right">
                        <div class="namediv">
                            <div class="name">{{ app.name }}</div>
                            <div class="right">
                                <span class="time">{{ app.time }}</span>
                            </div>
                        </div>
                        <div class="proflex">
                            <div class="progress-bar" :style="{ width: app.percent + '%' }"></div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'vant/es/icon/style'


const hourChartRef = ref(null)
const updateTime = ref('11:46')
const apps = ref([

    {
        name: '微信',
        time: '2小时46分钟',
        percent: 97,
        icon: 'src/assets/images/weixin.jpg',
    },
    {
        name: '闲鱼',
        time: '1小时28分钟',
        percent: 70,
        icon: 'src/assets/images/xiaom2.png',
    },
    {
        name: '知乎',
        time: '1小时24分钟',
        percent: 40,
        icon: 'src/assets/images/xiaom3.png',
    },

])
let chartInstance = null;
onMounted(() => {

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
                data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
                axisLine: {
                    lineStyle: {
                        color: '#ececec'
                    }
                },
                axisLabel: {
                    color: '#a1a1a1',
                    fontSize: 11,
                    interval: 5 // 
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#eee',
                        type: 'dashed',
                        width: 1
                    },
                },

            },
            yAxis: {
                type: 'value',
                splitLine: { lineStyle: { color: '#ececec', type: 'line' } },
                position: 'right',
                axisLabel: {
                    color: '#aaa',
                    fontSize: 11,
                    formatter: function (value) {
                        if (value === 29 || value === 58) {
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
                max: 58,

                interval: 29
            },
            series: [

                {
                    name: '社交',
                    type: 'bar',
                    stack: 'total',
                    barWidth: '70%',

                    itemStyle: {
                        barBorderRadius: [4, 4, 0, 0],
                        color: {
                            type: 'linear',
                            x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [
                                { offset: 0, color: '#8382FD' },
                                { offset: 1, color: '#3A83FC' }
                            ],
                            global: false
                        }
                    },
                    data: [56, 0, 0, 0, 0, 0, 0, 0, 3, 16, 41, 53, 19, 0, 6, 38, 8, 48, 28, 19, 12, 15, 22, 18, 0],
                    label: {
                        show: false
                    },

                },
            ]
        };
        chartInstance.setOption(option);
    };

    initChart();
    window.addEventListener('resize', resizeChart)
})

function resizeChart() {
    chartInstance && chartInstance.resize()
}
</script>

<style scoped>
.screen-time {
    background-color: #F7F7F7;
    color: #666;
    min-height: 100vh;
    /* font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif; */
    font-family: 'MiSans';
    src: url('https://cdn.jsdelivr.net/gh/1034858080-glitch/cdn/MiSans-Regular.woff2') format('woff2');
    overflow-y: auto;
    padding-bottom: 20px;
}

.timetype {
    display: flex;
    width: 90%;
    margin: 0 auto 30px;
    border-radius: 10px;
    justify-content: space-between;
    color: #333;
    overflow: hidden;
    font-weight: 500;

    div {
        font-size: 14px;
        padding: 8px 0;
        width: 30%;
        text-align: center;
        color: #555;
    }

    .active {

        border-radius: 6px;
        color: #111;
        background-color: rgba(255, 255, 255, 1) !important;

    }
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
    padding: 10px 10px 3px;

    margin: 0 20px;
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
    background-color: #efefef;
    border-radius: 5px;
}

.date {
    color: #a1a1a1;
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 15px;
}

.duration {
    font-size: 28px;
    font-weight: 600;
    color: #111;
    margin-top: 4px;
}

.chart-week,
.chart-hour {
    width: 100%;
    height: 260px;
}

.category-stats {
    display: flex;
    justify-content: space-between;
    margin: 0 15px 16px;
    font-size: 14px;
    color: #ccc;
}

.updates {
    margin: 0 30px 10px;
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
    margin-top: 10px;
}

.updates-right {
    font-size: 14px;
    color: #007aff;
    font-weight: 500;
}


.dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
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

    margin-bottom: 15px;
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

.namediv {
    display: flex;
    justify-content: space-between;
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
    margin-right: 10px;
    height: 8px;
    background: linear-gradient(to right, #3A83FC, #8382FD);
    border-radius: 5px;
    transition: width 0.3s;
}

.app-right {
    flex: 1;
}

.headerleft {
    display: flex;
    align-items: center;

}

.headerleft_img {
    margin-left: 5px;
    margin-right: 5px;
    width: 14px !important;
    height: 13px !important;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    color: #111;
    font-size: 16px;
    /* font-weight: 600; */

    img {
        width: 92px;
        height: auto;
    }
}

.xiaom4 {
    width: 20px;
    height: auto;
}

.xiaom5 {
    width: 30px;
    height: 22px;
}

.titletext {
    font-size: 26px;
    color: #111;
    margin-left: 20px;
    margin-bottom: 10px;
}

.stitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 14px;
    color: #111;
    width: 45%;
    border-radius: 20px;
    border: 1px solid #ececec;
    padding: 5px;
}

.height {
    width: 100%;
    height: 30px;
}

.useinfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 35px;
    margin-top: 5px;
}

.usetit {
    font-size: 18px;
    color: #333;
    font-weight: 500;
}

.usearrow {
    display: flex;
    flex-direction: column;

    .van-icon-arrow-down {
        margin-top: -2px;
    }

}

.flexdiv {
    display: flex;
    align-items: center;
    font-size: 14px;


    .name {
        color: #999;
        margin-right: 5px;
    }
}
</style>
