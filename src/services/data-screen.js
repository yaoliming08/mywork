import request from './request';
const interfaceName = '/yys-paas-regulatory';

//概要数据
export function getBaseStatistics(data){
  return request({
    url: interfaceName + '/screen/base/statistics',
    method:'post',
    data,
  })
}

//区域排名
export function getTop(data){
  return request({
    url: interfaceName + '/screen/base/top/' + data.num,
    method:'post',
    data,
  })
}

//折线图
export function getSummary(data){
  return request({
    url:  interfaceName +'/screen/base/summary',
    method:'post',
    data,
  })
}

//医院列表
export function getScreenHosList(data) {
  return request({
    url: interfaceName + '/common/hospital/getHospitalList',
    method: 'post',
    data
  })
}
