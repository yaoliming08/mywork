<template>
  <div class="pic-echarts">
    <div class="pic-left">
      <p class="pic-left-title">{{ picObj.title }}（{{ picObj.unit }}）</p>
      <h3>{{ picObj.value }}（{{ picObj.unit }}）</h3>
      <p>{{ picObj.title2 }}（{{ picObj.unit2 }}）</p>
      <p>{{ picObj.value2 }}</p>
    </div>
    <div class="pic-right">
      <div ref="picRefs" class="pic-right-box">
        
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";

const props = defineProps({
  picObj: {
    type: Object,
    required: true,
  },
});

let myChart;

const picRefs = ref(null);
let option = {
  series: [
    {
      name: "",
      type: "pie",
      center: ["50%", "50%"],
      radius: ["90%", "75%"],
      avoidLabelOverlap: false, //是否启用防止标签重叠策略
      hoverAnimation: false, //动画效果
      label: {
        show: false,
        position: "center",
        formatter: props.picObj.isCircle
          ? props.picObj.value3 + props.picObj.unit3
          : "{d}%", // 显示百分比，
      },
      data: [
        {
          value: props.picObj.value3,
          itemStyle: {
            color: "#1FBFCE",
          },
          label: {
            normal: {
              show: true,
            },
          },
        },
        {
          value: props.picObj.isCircle ? 0 : 100 - props.picObj.value3,
          itemStyle: {
            color: "#305E71",
          },
        },
      ],
    },
  ],
};

onMounted(() => {
  myChart = echarts.init(picRefs.value);
  myChart.setOption(option);
});
</script>

<style lang="scss" scoped>

.pic-echarts {
  // background-color: #2e3246;
  padding: 10px 10px 20px 10px;
  display: flex;
  .pic-left {
    flex: 1;
    .pic-left-title {
      // font-size: 14px;
    }
    h3 {
      font-size: 20px;
      font-weight: 500;
      color: #36ebfd;
      padding-top: 2px;
    }
    p {
      &:last-child {
        margin-top: 10px;
      }
    }
  }

  .pic-right {
    width: 150px;
    .pic-right-box {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
