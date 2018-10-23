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

//获取设备类型
function getCommonType(index) {
  var commonType = ''
  switch (index) {
    case 0:
      userStatus = 'NS';
      break;
    case 1001:
      userStatus = 'RS485';
      break;
    case 2001:
      userStatus = 'zaibo';
      break;
    case 3001:
      userStatus = 'Lora';
      break;
    case 4001:
      userStatus = 'LoraWan';
      break;
    default:
      userStatus = '未知'
  }
  return commonType
}

export default {
  install(Vue,options){
    Vue.prototype.getRouteName = getName
    Vue.prototype.getUserType = getUserType
    Vue.prototype.getUserPost = getUserPost
    Vue.prototype.getUserStatus = getUserStatus
  }
}
