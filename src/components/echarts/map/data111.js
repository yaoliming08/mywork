// [["太原", BJData]].forEach(function (item, i) {
//   series.push(
//     {
//       type: "map",
//       map: "china",
//       geoIndex: 1,
//       layoutCenter: ["50%", "50%"],
//       layoutSize: "125%",
//       selectedMode: "single",
//       roam: false,
//       itemStyle: {
//         normal: {
//           areaColor: "#00177B",
//           borderColor: "#0073DA",
//           borderWidth: 1,
//         },
//         emphasis: {
//           label: {
//             show: false,
//           },
//           areaColor: "#00177B",
//         },
//       },
//       data: [
//         {
//           name: "山西",
//           selected: false,
//           itemStyle: {
//             areaColor: {
//               type: "radial",
//               x: 0.5,
//               y: 0.5,
//               r: 0.5,
//               colorStops: [
//                 {
//                   offset: 0,
//                   color: "rgba(0,255,255, 0.1)",
//                 },
//                 {
//                   offset: 1,
//                   color: "rgba(0,255,255, 0.7)",
//                 },
//               ],
//               global: false, // 缺省为 false
//             },
//           },
//         }, // selected:true 默认选中
//       ],
//     },
//     {
//       type: "lines",
//       zlevel: 2,
//       effect: {
//         show: true,
//         period: 4,
//         trailLength: 0.02,
//         symbol: "arrow",
//         symbolSize: 5,
//       },
//       lineStyle: {
//         normal: {
//           color: "#00FAFA",
//           width: 2,
//           opacity: 0.6,
//           curveness: 0.2,
//         },
//       },

//       data: convertData(item[1]),
//     },
//     {
//       type: "effectScatter",
//       coordinateSystem: "geo",
//       zlevel: 2,
//       rippleEffect: {
//         period: 4,
//         brushType: "stroke",
//         scale: 4,
//       },
//       label: {
//         normal: {
//           show: true,
//           position: "inside",
//           backgroundColor: "rgba(1,247,248, 0.1)",
//           formatter: "{b}",
//           padding: [10, 12],
//           borderRadius: 0,
//           borderWidth: 1,
//           borderColor: "rgba(0,0,0,0.1)",
//           color: "#FFFFFF",
//         },
//         emphasis: {
//           show: true,
//         },
//       },
//       symbol: "circle",
//       symbolSize: function (val) {
//         return 1;
//       },
//       itemStyle: {
//         normal: {
//           show: false,
//           color: "#fff",
//           shadowBlur: 10,
//         },
//       },
//       data: item[1].map(function (dataItem) {
//         console.log()
//         return {
//           name: dataItem[0].name,
//           value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value]),
//         };
//       }),
//     },
//     //被攻击点
//     {
//       type: "scatter",
//       coordinateSystem: "geo",
//       zlevel: 2,
//       rippleEffect: {
//         period: 4,
//         brushType: "stroke",
//         scale: 4,
//       },
//       label: {
//         normal: {
//           show: true,
//           position: "right",
//           color: "#00ffff",
//           formatter: "{b}",
//           textStyle: {
//             color: "#00ffff",
//           },
//         },
//         emphasis: {
//           show: true,
//         },
//       },
//       symbol: "circle",
//       symbolSize: 1,
//       itemStyle: {
//         normal: {
//           color: "#fff",
//           shadowBlur: 1,
//         },
//       },
//       data: [
//         {
//           name: item[0],
//           value: geoCoordMap[item[0]].concat([100]),
//         },
//       ],
//     }
//   );
// });

var BJData = [
  [
    {
      name: "上海",
      value: 100,
    },
    {
      name: "太原",
    },
  ],
  [
    {
      name: "广州",
      value: 70,
    },
    {
      name: "太原",
    },
  ],
  [
    {
      name: "哈尔滨",
      value: 30,
    },
    {
      name: "太原",
    },
  ],
  [
    {
      name: "青岛",
      value: 50,
    },
    {
      name: "太原",
    },
  ],
  [
    {
      name: "南昌",
      value: 20,
    },
    {
      name: "太原",
    },
  ],
  [
    {
      name: "银川",
      value: 10,
    },
    {
      name: "太原",
    },
  ],
  [
    {
      name: "拉萨",
      value: 80,
    },
    {
      name: "太原",
    },
  ],
  [
    {
      name: "西安",
      value: 55,
    },
    {
      name: "太原",
    },
  ],
  [
    {
      name: "乌鲁木齐",
      value: 90,
    },
    {
      name: "太原",
    },
  ],
];

// const convertData = function (data) {
//   var res = [];
//   for (var i = 0; i < data.length; i++) {
//     var dataItem = data[i];
//     var fromCoord = geoCoordMap[dataItem[0].name];
//     var toCoord = geoCoordMap[dataItem[1].name];
//     if (fromCoord && toCoord) {
//       res.push([
//         {
//           coord: fromCoord,
//           value: dataItem[0].value,
//         },
//         {
//           coord: toCoord,
//         },
//       ]);
//     }
//   }
//   return res;
// };
