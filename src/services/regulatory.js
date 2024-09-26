import request from './request';
const interfaceName = '/yys-paas-regulatory';
//医院列表
export function getHosList(data){
  return request({
    url: interfaceName + '/screen/base/areaLevel',
    method:'post',
    data,
  })
}

//数据概览页
//概要数据
export function getAreaSummary(data){
  return request({
    url: interfaceName + '/medical/summary',
    method:'post',
    data,
  })
}
//数据概览页
export const ALL_DATA = {
  ylywDetail: '/core/medical/business/detail-summary'//医疗业务，折线图接口
}
//数据概览页 区域协同统计
export function getRegionalLine(data){
  return request({
    url: interfaceName + '/medical/service/regional',
    method:'post',
    data,
  })
}


//医疗业务统计url
export const CORE_URL = {
  chart: '/core/medical/business/detail',//获取图表数据url
  table: '/core/medical/business/detailList',//获取列表数据url
  down: interfaceName + '/core/medical/business/export',//导出url
}

// 医疗服务统计
export const MEDICAL_SERVICE = {
  chart: '/medical/service/statistics-detailLine',
  table: '/medical/service/statistics-detailList',
  down: interfaceName + '/medical/service/export'
}

// 处方审核统计
export const PRESCRIPTION_PREVIEW = {
  chart: '/prescriptionSummary/summary',
  table: '/prescriptionSummary/page',
  down: interfaceName + '/prescriptionSummary/export'
}

//合理用药统计 url
export const MEDICINE_URL = {
  chart: '/drugUse/summary',//获取图表数据url
  table: '/drugUse/page',//获取列表数据url
  down: interfaceName + '/drugUse/export',//导出url
}

//用药统计 url
export const  MEDICAL_STATISTICS = {
  chart: '/rational/drug/use/sr/statistics-detailLine',//获取图表数据url
  table: '/rational/drug/use/sr/statistics-detailList',//获取列表数据url
  down: interfaceName + '/rational/drug/use/sr/export',//导出url
  statistics:'/rational/drug/use/sr/statistics'
}



//区域协同统计 url
export const  TREAT_LINK = {
  chart: '/area/regional/summary',//获取图表数据url
  table: '/area/regional/page',//获取列表数据url
  down: interfaceName + '/area/regional/export',//导出url
  statistics:'/area/regional/statistics'
}









//抗菌药统计 url
export const ANTIBACTERIAL_STATISTICS = {
  chart: '/rational/drug/use/kjy/statistics-detailLine',//获取图表数据url
  table: '/rational/drug/use/kjy/statistics-detailList',//获取列表数据url
  statistics:'/rational/drug/use/kjy/statistics',
  down: interfaceName + '/rational/drug/use/kjy/export',//导出url
}


//预防使用及送检统计 url  preventive-effect
export const  PREVENTIVE_EFFECT = {
  chart: '/rational/drug/use/yfsy/statistics-detailLine',//获取图表数据url
  table: '/rational/drug/use/yfsy/statistics-detailList',//获取列表数据url
  statistics:'/rational/drug/use/yfsy/statistics',
  down: interfaceName + '/rational/drug/use/yfsy/export',//导出url
}
//基药统计 url   basic-medicine-statistics
export const BASIC_MEDICINE_STATISTICS = {
  chart: '/rational/drug/use/jy/statistics-detailLine',//获取图表数据url
  table: '/rational/drug/use/jy/statistics-detailList',//获取列表数据url
  down: interfaceName + '/rational/drug/use/jy/export',//导出url
  statistics:'/rational/drug/use/jy/statistics',

}

//药品销售排名 url   drug-sales
export const DRUG_SALES  = {
  chart: '/rational/drug/use/jy/statistics-detailLine',//获取图表数据url
  table: '/drugUs/rational/drug/use/jy/statistics-detailList',//获取列表数据url
  down: interfaceName + '/drugUse/export',//导出url
}

//静脉注射用药统计 url   mainline-statistics
export const MAINLINE_STATISTICS  = {
  chart: '/rational/drug/use/jmzsyySummary',//获取图表数据url
  table: '/rational/drug/use/jmzsyyPage',//获取列表数据url
  down: interfaceName + '/rational/drug/use/jmzsyyExport',//导出url
  statistics: '/rational/drug/use/jmzsyyStatistics',
}





//医保及病种统计 url   patient-his-statistics  患者医保费用统计
export const HIS_PATIENT_STATISTICS  = {
  chart: '/service/mid/hzybfy-detailLine',//获取图表数据url
  table: '/service/mid/hzybfy-detailList',//获取列表数据url
  down: interfaceName + '/service/mid/hzybfy/export',//导出url
  statistics: '/service/mid/hzybfy/statistics',
}

//医保及病种统计 url   entity-statistics  病种综合统计
export const ENTITY_STATISTICS  = {
  chart: '/service/mid/bzzhtj-detailLine',//获取图表数据url
  table: '/service/mid/bzzhtj-detailList',//获取列表数据url
  down: interfaceName + '/service/mid/bzzhtj/export',//导出url
  statistics: '/service/mid/bzzhtj/statistics',
}


//医保及病种统计 url   entity-statistics  单病种综合统计
export const ENTITY_MANAGE  = {
  table:'/service/mid/dbz-detailList',
  down:'/service/mid/dbz/export'
}


//就诊费用统计 url
export const EXPENSE_URL = {
  chart: '/medical/fee/manage/detail',//获取图表数据url
  table: '/medical/fee/manage/detailList',//获取列表数据url
  down: interfaceName + '/medical/fee/manage/export',//导出url
  hosUrl:'/medical/fee/manage/inpatient', //住院url
  outUrl:'/medical/fee/manage/outPatient' //门诊url
}

//医院经营运营 url  --  效率统计
export const HOSPITAL_OPERATION_EFFICIENCY_URL = {
  chart: '/service/operation/efficiency-detailLine',//获取图表数据url
  table: '/service/operation/efficiency-detailList',//获取列表数据url
  down: interfaceName + '/service/operation/efficiency/export',//导出url
  statistics: '/service/operation/statistics',//综合统计url
}

//医院经营运营 url  --  病床使用统计
export const HOSPITAL_OPERATION_SICKBEDUSE_URL = {
  chart: '/service/operation/sickbedUse-detailLine',//获取图表数据url
  table: '/service/operation/sickbedUse-detailList',//获取列表数据url
  down: interfaceName + '/service/operation/sickbedUse/export',//导出url
  statistics: '/service/operation/statistics',//综合统计url
}

//医院经营运营 url  --  人员统计
export const HOSPITAL_OPERATION_PERSONAL_URL = {
  chart: '/service/operation/personal-detailLine',//获取图表数据url
  table: '/service/operation/personal-detailList',//获取列表数据url
  down: interfaceName + '/service/operation/personal/export',//导出url
  statistics: '/service/operation/statistics',//综合统计url
}

//医院经营运营 url  --  业务收入统计
export const HOSPITAL_OPERATION_INCOME_URL = {
  chart: '/service/operation/income-detailLine',//获取图表数据url
  table: '/service/operation/income-detailList',//获取列表数据url
  down: interfaceName + '/service/operation/income/export',//导出url
  statistics: '/service/operation/statistics',//综合统计url
}

//医院经营运营 url  --  医院支出统计
export const HOSPITAL_OPERATION_EXPENDITRUE_URL = {
  chart: '/service/operation/expenditure-detailLine',//获取图表数据url
  table: '/service//operation/expenditure-detailList',//获取列表数据url
  down: interfaceName + '/service/operation/expenditure/export',//导出url
  statistics: '/service/operation/statistics',//综合统计url
}

//医疗质量统计
export const HOSTPITAL_QUALITY_SAFE_URL = {
  chart:'/medical/quality/safety/detail',//获取图标数据url
  table:'/medical/quality/safety/detailList',//获取列表数据url
  down:interfaceName+'/medical/quality/safety/export',//导出url
  statistics:'/medical/quality/safety/summary', //统计url
}



//中蒙藏医药相关接口
export const ZMZ_MEDICINE = {
  chart:'/mongolian/medicine/summary',//获取图标数据url
  table:'/mongolian/medicine/page',//获取列表数据url
  down:interfaceName+'/mongolian/medicine/export',//导出url
  statistics:'/mongolian/medicine/statistics', //统计url
}

//业务明细线状图数据
export function getBusinessDetail({ hosCodes, dateType, businessType,beginDate,endDate }, url) {
  return request({
    url: interfaceName + url ,
    method: 'post',
    data: {
      hosCodes,
      dateType,
      businessType,
      beginDate,
      endDate,
    }
  })
}

//获取列表参数
export function getHosOverviewList(data,url) {
  return request({
    url: interfaceName + url ,
    method: 'post',
    data,
  });
}

//医疗业务统计综述数据请求
export function getSummaryData(data){
  return request({
    url: interfaceName + '/core/medical/business/summary',
    method:'post',
    data,
  })
}

// 医疗服务综合统计饼图数据请求
export function getSummaryData2(data){
  return request({
    url: interfaceName + '/medical/service/statistics',
    method:'post',
    data
  })
}

// 处方审核统计综合统计数据请求
export function getPrescriptionStatistics(data) {
  return request({
    url: interfaceName + '/prescriptionSummary/statistics',
    method: 'post',
    data
  })
}

//获取警戒线值
export function getCordon(data){
  let formData = {
    'moduleKey': '',
    'moduleName': '',
    'paramKey': '',
    'paramName': '',
    'paramValue': '',
    ...data
  }
  return request({
    url: interfaceName + '/common/param/list' ,
    method: 'post',
    data:formData,
  });
}
//获取全部参考值
export function getCordonAll(){
  return request({
    url: interfaceName + '/common/param/all' ,
    method: 'post',
  });
}

//合理用药-综合统计
export function drugUseStatistics(data) {
  return request({
    url: interfaceName + '/rational/drug/use/overview/statistics',
    method: 'post',
    data,
  })
}

//医院运营统计模块数据请求
export function getHosBusinessData(data){
  return request({
    url: interfaceName +  HOSPITAL_OPERATION_EFFICIENCY_URL.statistics,
    method:'post',
    data,
  })
}
//获取住院概述
export function getManageInpatient(data) {
  return request({
    url: interfaceName + '/medical/fee/manage/inpatient',
    method: 'post',
    data,
  })
}

//获取门诊概述
export function getOutPatient(data) {
  return request({
    url: interfaceName + '/medical/fee/manage/outPatient',
    method: 'post',
    data,
  })
}


//获取门诊概述
export function getSummarize(data,url) {
  return request({
    url: interfaceName + url,
    method: 'post',
    data,
  })
}

//获取中蒙药业务
export function getAnaesthetic(data) {
  return request({
    url: interfaceName + '/mongolian/medicine/overview/statistics',
    method: 'post',
    data,
  })
}

//获取医疗质量统计概述
export function getQualitySafetySummary(data) {
  return request({
    url: interfaceName + '/medical/quality/safety/summary',
    method: 'post',
    data,
  })
}

//获取医疗质量统计概述
export function getFeeManage(data) {
  return request({
    url: interfaceName + '/medical/fee/manage',
    method: 'post',
    data,
  })
}

//请求医院经营运营概述
export function getHosBusinessSummary(data){
  return request({
    url:interfaceName + '/medical/service/operation',
    method:'post',
    data,
  })
}


//统计组件配置获取统计接口
export function getStatisticsData(url,data){
  return request({
    url:interfaceName + url,
    method:'post',
    data,
  })
}




//大屏地图接口






//统计组件配置获取统计接口
export function getChartData(data){
  return request({
    url:interfaceName + '/screen/base/count',
    method:'post',
    data,
  })
}


//统计组件配置获取统计详情接口
export function getChartDetail(data){
  return request({
    url:interfaceName + '/screen/base/detail',
    method:'post',
    data,
  })
}


//绩效考核报表
export function performanceReport(data) {
  return request({
    url: interfaceName + '/performance/report/page',
    method: 'post',
    data
  })
}

// 修改绩效报表数据
export function editPerformanceReport(data) {
  return request({
    url: interfaceName + '/performance/report/updateIndicator',
    method: 'post',
    data
  })
}

// 导出绩效报表数据
export function exportPerformanceReport(data) {
  return request({
    url: interfaceName + '/performance/report/downloadReportExcel',
    method: 'post',
    data,
    responseType: 'blob',
  })
}



