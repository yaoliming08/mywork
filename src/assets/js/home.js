const navList = [
  {
    name: "信息归集",
    id: 1,
    src: new URL("@/assets/img/home/nav01.png", import.meta.url),
    color: "#00B7A4",
    path: "Information-aggregation",
  },
  {
    name: "融资增信",
    id: 2,
    src: new URL("@/assets/img/home/nav02.png", import.meta.url),
    color: "#9960E9",
    path: "financing-assurance",
  },
  {
    name: "政策支持",
    id: 3,
    src: new URL("@/assets/img/home/nav03.png", import.meta.url),
    color: "#5C5CE3",
    path: "policy-support",
  },
  {
    name: "融资对接",
    id: 4,
    src: new URL("@/assets/img/home/nav04.png", import.meta.url),
    color: "#008FF8",
    path: "Financing-docking",
  },
  {
    name: "融资评价",
    id: 5,
    src: new URL("@/assets/img/home/nav05.png", import.meta.url),
    color: "#0055D6",
    path: "Financing-evaluation",
  },
];

const bottomTable = [
  {
    value: "52,459",
    name: "授权服务",
    color: "#00B7A4",
    titleMsg: "获取数据单位的数据授权身份，对数据进行采集、整体和加工处理",
    src: new URL("@/assets/portal/icon/icon1.png", import.meta.url),
  },
  {
    value: "50",
    name: "数据服务",
    color: "#9960E9",
    titleMsg: "先进的数据分析工具和技术，进行深度挖掘和分析",
    src: new URL("@/assets/portal/icon/icon2.png", import.meta.url),
  },
  {
    value: "462",
    name: "数据模型",
    color: "#5C5CE3",
    titleMsg: "提供面向个性化需求的模型训练环境，如风险评估、信用评分等",
    src: new URL("@/assets/portal/icon/icon3.png", import.meta.url),
  },
  {
    value: "16,990",
    name: "智能授信",
    color: "#008FF8",
    titleMsg: " 挖掘了数据的潜在价值，又 为数据风险控制提供了强有 力的支撑",

    src: new URL("@/assets/portal/icon/icon4.png", import.meta.url),
  },
];

const solveList = [
  {
    name: "政务数据+人工智能银行",
    titleMsg: "零售业务智能化解决方案",
    src: new URL("@/assets/portal/line-bg/bg01.png", import.meta.url),
  },
  {
    name: "普惠金融",
    titleMsg: "零售业务产品及运营解决方案",
    src: new URL("@/assets/portal/line-bg/bg02.png", import.meta.url),
  },
  {
    name: "新型数据要素",
    titleMsg: "交通流通&运营解决方案",
    src: new URL("@/assets/portal/line-bg/bg03.png", import.meta.url),
  },
  {
    name: "模型风控",
    titleMsg: "零售业务智能化解决方案",
    src: new URL("@/assets/portal/line-bg/bg04.png", import.meta.url),
  },
  {
    name: "供应链金融",
    titleMsg: "企业风险管控解决方案",
    src: new URL("@/assets/portal/line-bg/bg05.png", import.meta.url),
  },
  {
    name: "公共数据模式",
    titleMsg: "全景最优解决方案",
    src: new URL("@/assets/portal/line-bg/bg06.png", import.meta.url),
  },
  {
    name: "数据共享",
    titleMsg: "统一对外开放方案",
    src: new URL("@/assets/portal/line-bg/bg07.png", import.meta.url),
  },
  {
    name: "数据驱动&场景融合",
    titleMsg: "数据场景应用解决方案",
    src: new URL("@/assets/portal/line-bg/bg08.png", import.meta.url),
  },
  {
    name: "标准化资源库",
    titleMsg: "企业级内部数据统一管理方案",
    src: new URL("@/assets/portal/line-bg/bg09.png", import.meta.url),
  },
];

const countList = [
  {
    src: new URL("@/assets/img/home/count01.png", import.meta.url),
  },
  {
    src: new URL("@/assets/img/home/count02.png", import.meta.url),
  },
  {
    src: new URL("@/assets/img/home/count03.png", import.meta.url),
  },
];

export { navList, bottomTable, countList ,solveList};
