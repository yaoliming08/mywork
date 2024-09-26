<template>
  <div class="mz-cake2">
    <div class="mz-cake2-box" ref="cake2Ref"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
import { getRandomNumber } from "@/utils/mz";

const cake2Ref = ref(null);
let myChart;


let placeHolderStyle;
let option;
let dataStyle;

let { color, time, datas, total, legend, category,totalNum } = {
  totalNum:1120,
  category: [
    {
      name: "企业",
      value: 600,
      time: 0,
    },
    { name: "个体户", value: 120, time: 52 },
    { name: "机关单位", value: 200, time: 36 },
    { name: "农户", value: 50, time: 12 },
    { name: "社会团体", value: 150, time: 36 },
  ],
  color: [
    "#16bafc",
    "#0851cf",
    "#10e9e4",
    "#07a39e",
    "#fed700",
    "#fe8201",
    "#f18437",
    "#dd3d0c",
    "#3bd293",
    "#3b8523",
  ],
  datas: [600, 120, 200, 50, 150],
  legend: ["企业", "个体户", "机关单位", "农户", "社会团体"],
  time: 2,
  total: 100,
};



const initOption = function () {

  placeHolderStyle = {
  normal: {
    color: "transparent",
    label: {
      show: false,
    },
    labelLine: {
      show: false,
    },
  },
  emphasis: {
    color: "transparent",
  },
};



  dataStyle = {
    normal: {
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      shadowBlur: 40,
      borderWidth: 10,
      shadowColor: "rgba(0, 0, 0, 0)", //边框阴影
    },
  };

  option = {
    // backgroundColor:'blurScope',

    title: {
      text: `总服务金融${totalNum}亿`,
      x: "center",
      y: "center",
      textStyle: {
        fontWeight: "normal",
        fontSize: 14,
        color: "#fff",
        rich: {
          a: {
            fontSize: 14,
            padding: [0, 0, 10, 0],
          },
        },
      },
    },
    // grid: {
    //   x: 80,
    //   left: "20%",
    // },
    tooltip: {
      trigger: "item",
      show: true,
      // formatter: "{b} : <br/>{d}%",
      formatter: function (params) {
        let name = "";
        if (params.name.length > 15) {
          name += params.name.slice(0, 15) + "<br/>";
          name += params.name.slice(15, params.name.length - 1);
        } else {
          name = params.name;
        }
        return name + ":<br/>" + params.value + "%";
      },
      backgroundColor: "rgba(0,0,0,0.7)", // 背景
      padding: [8, 10], //内边距
      extraCssText: "box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);", //添加阴影
    },
    legend: {
      show: true,
      orient: "vertical",
      // icon: 'circle',
      left: "35%",
      bottom: "100px",
      // itemGap: 5,
      data: legend,
      textStyle: {
        //图例样式
        rich: {
          a: {
            color: "#fff",
            color: "#FFFFFF",
            padding: [3, 0, 0, 0],
            fontSize: 14,
          },
          // b: {
          //   fontSize: 14,
          //   color: "rgba(255,255,255,.5)",
          //   color: "#fff",
          //   padding: [0, 0, 3, 0],
          // },
        },
      },
      formatter: function (params, i) {
        let str = "";
        category.forEach((item) => {
          if (item.name === params) {
            // str = `{a|${params} ${item.value}%}`;
            if (params.length > 3) {
              params = params.slice(0, 3) + "...";
            }
            //   str = `{a|${params} ${item.value}%}\n{b|未学习${item.time}分钟}`;
            str = `{a|${params} ${item.value}亿}`;
          }
        });
        return str;
      },
    },
    series: [
      {
        name: "Line 3",
        type: "pie",
        clockWise: false,
        radius: ["60%", "66%"],
        center: ["50%", "25%"],
        itemStyle: dataStyle,
        hoverAnimation: false,
        startAngle: 90,
        data: [
          {
            value: datas[0],
            name: legend[0],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: color[0],
                  },
                  {
                    offset: 1,
                    color: color[1],
                  },
                ]),
              },
            },
          },
          {
            value: total - datas[0],
            name: "",
            tooltip: {
              show: false,
            },
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 1",
        type: "pie",
        clockWise: false,
        radius: ["50%", "56%"],
        center: ["50%", "25%"],
        itemStyle: dataStyle,
        hoverAnimation: false,
        startAngle: 90,
        label: {
          borderRadius: "10",
        },
        data: [
          {
            value: datas[1],
            name: legend[1],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: color[2],
                  },
                  {
                    offset: 1,
                    color: color[3],
                  },
                ]),
              },
            },
          },
          {
            value: total - datas[1],
            name: "",
            tooltip: {
              show: false,
            },
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 2",
        type: "pie",
        clockWise: false,
        radius: ["40%", "46%"],
        center: ["50%", "25%"],
        itemStyle: dataStyle,
        hoverAnimation: false,
        startAngle: 90,
        data: [
          {
            value: datas[2],
            name: legend[2],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: color[4],
                  },
                  {
                    offset: 1,
                    color: color[5],
                  },
                ]),
              },
            },
          },
          {
            value: total - datas[2],
            name: "",
            tooltip: {
              show: false,
            },
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 3",
        type: "pie",
        clockWise: false,
        radius: ["30%", "36%"],
        center: ["50%", "25%"],
        itemStyle: dataStyle,
        hoverAnimation: false,
        startAngle: 90,
        data: [
          {
            value: datas[3],
            name: legend[3],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: color[6],
                  },
                  {
                    offset: 1,
                    color: color[7],
                  },
                ]),
              },
            },
          },
          {
            value: total - datas[3],
            name: "",
            tooltip: {
              show: false,
            },
            itemStyle: placeHolderStyle,
          },
        ],
      },
      {
        name: "Line 3",
        type: "pie",
        clockWise: false,
        radius: ["20%", "26%"],
        center: ["50%", "25%"],
        itemStyle: dataStyle,
        hoverAnimation: false,
        startAngle: 90,
        data: [
          {
            value: datas[4],
            name: legend[4],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: color[8],
                  },
                  {
                    offset: 1,
                    color: color[9],
                  },
                ]),
              },
            },
          },
          {
            value: total - datas[4],
            name: "",
            tooltip: {
              show: false,
            },
            itemStyle: placeHolderStyle,
          },
        ],
      },
    ],
  };
};

initOption();

const setData = function () {
  console.log("line页面参数");

  let list = []
  totalNum = 0

  for (let i = 0; i < 5; i++) {
    let num = getRandomNumber(1, 100);
    category[i].value = num;

    totalNum = totalNum + num

    list.push(num);
    console.log(num, 4444);
  }

  datas = list;
  initOption();

  myChart.setOption(option);
};

onMounted(() => {
  myChart = echarts.init(cake2Ref.value);
  myChart.setOption(option, true);
});

defineExpose({ setData });
</script>

<style lang="scss" scoped>
.mz-cake2 {
  .mz-cake2-box {
    height: 100%;
    width: 100%;
  }
}
</style>
