<template>
    <div class="columnar-echarts">
      <div ref="refBox"></div>

    </div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";

let myChart
let option

const refBox = ref(null)


option = {
    title: {
        text: '群体授信金额',
        textStyle:{
            color:'#fff',
        }
        
    },
    xAxis: {
        data: ['三农', '工薪', '双创', '其他']
    },
    yAxis: {
        show:false,
    },
    series: [{
        type: 'bar',
        data:[720, 282, 191, 634],
        barWidth:30,
        itemStyle:{
            color:'#57CEFF',
        }
    }]
};








onMounted(() => {
  myChart = echarts.init(refBox.value);
  myChart.setOption(option);
});


</script>

<style lang="scss" scoped>

.columnar-echarts{
    &>div{
        width: 100%;
        height: 100%;
    }
}


</style>