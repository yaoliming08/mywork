<template>
    <view class="report-page">
        <commonHed />
        <canvas canvas-id="aUoYcBNsRogAoMZxIQIDzgAKlBYDkLXS" id="aUoYcBNsRogAoMZxIQIDzgAKlBYDkLXS" class="charts" @touchend="tap"/>
    </view>
</template>

<script setup>
import commonHed from '@/components/common-hed.vue'
import uCharts from '@qiun/ucharts/u-charts';
import { ref, reactive } from 'vue'


const cWidth = ref(300)
const cHeight = ref(300)
const uChartsInstance = reactive({})



const getServerData = () => {
    setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
            categories: ["收入稳定性", "家庭稳定性", "异常消费", "隐形负债", "日常消费", "工作稳定性"],

            series: [
                {
                    name: "各项信用",
                    data: [90, 110, 165, 195, 187, 172]
                },
            ]
        };
        drawCharts('aUoYcBNsRogAoMZxIQIDzgAKlBYDkLXS', res);
    }, 500);
}
const drawCharts = (id, data) => {
    const ctx = uni.createCanvasContext(id, null);
    uChartsInstance[id] = new uCharts({
        type: "radar",
        context: ctx,
        width: cWidth.value,
        height: cHeight.value,
        categories: data.categories,
        series: data.series,
        animation: true,
        timing: "easeOut",
        duration: 1000,
        rotate: false,
        rotateLock: false,
        background: "#FFFFFF",
        color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
        padding: [5, 5, 5, 5],
        fontSize: 13,
        fontColor: "#666666",
        dataLabel: false,
        dataPointShape: true,
        dataPointShapeType: "solid",
        touchMoveLimit: 60,
        enableScroll: false,
        enableMarkLine: false,
        legend: {
            show: false,
            position: "right",
            lineHeight: 25,
            float: "center",
            padding: 5,
            margin: 5,
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "rgba(0,0,0,0)",
            borderWidth: 0,
            fontSize: 13,
            fontColor: "#666666",
            hiddenColor: "#CECECE",
            itemGap: 10
        },
        extra: {
            radar: {
                gridType: "radar",
                gridColor: "#CCCCCC",
                gridCount: 3,
                opacity: 0.2,
                max: 200,
                labelShow: true,
                gridEval: 1,
                radius: 0,
                axisLabel: false,
                axisLabelTofix: 0,
                labelColor: "#666666",
                labelPointShow: false,
                labelPointRadius: 3,
                labelPointColor: "#CCCCCC",
                border: false,
                borderWidth: 2,
                linearType: "none"
            },
            tooltip: { 
                showBox: false,
                showArrow: true,
                showCategory: true,
                borderWidth: 0,
                borderRadius: 0,
                borderColor: "#000000",
                borderOpacity: 0.7,
                bgColor: "#000000",
                bgOpacity: 0.7,
                gridType: "solid",
                dashLength: 4,
                gridColor: "#CCCCCC",
                boxPadding: 3,
                fontSize: 13,
                lineHeight: 20,
                fontColor: "#FFFFFF",
                legendShow: true,
                legendShape: "auto",
                splitLine: true,
                horizentalLine: false,
                xAxisLabel: false,
                yAxisLabel: false,
                labelBgColor: "#FFFFFF",
                labelBgOpacity: 0.7,
                labelFontColor: "#666666"
            }
        }
    });
}
const tap = (e) => {
    uChartsInstance[e.target.id].touchLegend(e);
    uChartsInstance[e.target.id].showToolTip(e);
}



getServerData();




</script>

<style lang="scss" scoped>
.charts {
    width: 750rpx;
    height: 500rpx;
}
</style>