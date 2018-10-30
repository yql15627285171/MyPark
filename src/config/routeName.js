import HTTP from '@/axios/http'
import API from '@/axios/api'

//获取路由名
function getName(name) {
  let routeName = ''
  switch (name) {
    case '社区管理':
      routeName='communityManager';
      break;
    case '账户管理':
      routeName='accountManager';
      break;
    case '区域管理':
      routeName='roomManager';
      break;
    case '电费方案':
      routeName='electricityScheme';
      break;
    case '表计管理':
      routeName='meterManager';
      break;
    case '网关管理':
      routeName='gatewayManager';
      break;
    case '设备控制':
      routeName='equipmentControl';
      break;
    case '冻结查询':
      routeName='freezingData';
      break;
    case '远程充值':
      routeName='remoteRecharge';
      break;
    case '充值记录':
      routeName='rechargeRecord';
      break;
    default:
      routeName='choseLists'
  }

  return routeName
}

//获取用户类型名
function getUserType(index) {
  var userType = ''
  switch (index) {
    case 0:
      userType = '企业';
      break;
    case 1:
      userType = '业务员';
      break;
    case 2:
      userType = '社区';
      break;
    case 3:
      userType = '技术支持';
      break;
    case 4:
      userType = '平台维护';
      break;
    case 5:
      userType = '超级管理员';
      break;
    default:
      userType = '未知'
  }
  return userType
}

//获取岗位名
function getUserPost(index) {
  var userPost = ''
  switch (index) {
    case 0:
      userPost = '主管';
      break;
    case 1:
      userPost = '销售员';
      break;
    default:
      userPost = '未知'
  }
  return userPost
}

//获取使用状态名
function getUserStatus(index) {
  var userStatus = ''
  switch (index) {
    case 0:
      userStatus = '禁用';
      break;
    case 1:
      userStatus = '正常';
      break;
    default:
      userStatus = '未知'
  }
  return userStatus
}

//获取网关类型
function getCommonType(index) {
  var commonType = ''
  switch (index) {
    case 1001:
      commonType = 'RS485';
      break;
    case 2001:
      commonType = 'zaibo';
      break;
    case 3001:
      commonType = 'Lora';
      break;
    case 4001:
      commonType = 'LoraWan';
      break;
    default:
      commonType = '未知'
  }
  return commonType
}

//获取设备类型
function getDeviceType(index) {
  var deviceType = ''
  switch (index) {
    case 1001:
      deviceType = '集中器';
      break;
    case 1501:
      deviceType = '网关';
      break;
    case 2001:
      deviceType = '电表';
      break;
    case 2501:
      deviceType = '水表';
      break;
    case 3001:
      deviceType = '路灯';
      break;
    default:
      deviceType = '未知'
  }
  return deviceType
}

//获取社区的楼栋列表
function getBuildingList(building=''){
  var token = window.sessionStorage.getItem('token')
  var params = {
    userId:window.sessionStorage.getItem('userId'),
    building:building
  }

  return  new Promise((resolve, reject)=>{

    HTTP.get(API.baseUrl + API.getBuildingList,params,token)
      .then(result=>{
        resolve(result)
      })
  })

}

//获取对应楼栋的房间列表
function getHouseByBuilding(building='',houseNo='') {
  var token = window.sessionStorage.getItem('token')
  var params = {
    userId:window.sessionStorage.getItem('userId'),
    Building:building,
    houseNo:houseNo
  }

  console.log(params)

  return  new Promise((resolve, reject)=>{

    HTTP.get(API.baseUrl + API.getHouseByBuilding,params,token)
      .then(result=>{
        resolve(result)
      })
  })
}

//XXXX-XX-XX 年月日格式
function timeFormat1(date){
  try {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    return [year, month, day].map(formatNumber).join('-')
  }catch (e) {
    return date
  }
}

//XXXX-XX 年月格式
function timeFormat2(date){
  try {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    return [year, month].map(formatNumber).join('-')
  }catch (e) {
    return date
  }
}

//XXXX-XX 上一个月的年月
function timeFormat3(date){
  try {
    var year = date.getFullYear()
    var month = date.getMonth()
    var day = date.getDate()
    return [year, month].map(formatNumber).join('-')
  }catch (e) {
    return date
  }
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export default {
  install(Vue,options){
    Vue.prototype.getRouteName = getName
    Vue.prototype.getUserType = getUserType
    Vue.prototype.getUserPost = getUserPost
    Vue.prototype.getUserStatus = getUserStatus
    Vue.prototype.getCommonType = getCommonType
    Vue.prototype.getDeviceType = getDeviceType
    Vue.prototype.getBuildingList = getBuildingList
    Vue.prototype.getHouseByBuilding = getHouseByBuilding
    Vue.prototype.timeFormat1 = timeFormat1
    Vue.prototype.timeFormat2 = timeFormat2
    Vue.prototype.timeFormat3 = timeFormat3
  }
}
