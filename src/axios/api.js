export default{
  //接口文档连接 http://192.168.5.26:9008/laiot-api/swagger-ui.html

  //局域网
	baseUrl:'http://172.0.0.9:16005/renren-api/api/',

  //外网
  // baseUrl:'http://106.74.18.194:16005/renren-api/api/',

  //系统登录
  sysLogin:'sysuser/syslogin',

  getAllMenuList:'menu/getAllMenuList',

  //获取用户菜单列表
  getUserMenuList:'menu/getUserMenuList',

  //添加社区
  saveCommunityInfo:'baseCommunity/saveCommunityInfo',

  //获取社区列表
  getCommunityList:'baseCommunity/getCommunityList',

  //修改社区
  updateCommunityInfo:'baseCommunity/updateCommunityInfo',

  //删除社区
  deleteCommunityInfo:'baseCommunity/deleteCommunityInfo',

  //获取所有
  getAllUser:'sysuser/getAllUser',

  //添加平台新用户
  addSysUser:'sysuser/addSysUser',

  //删除系统用户
  deleteSysUser:'sysuser/deleteSysUser',

  //获取小区房间列表
  getCommHouseList:'baseCommHouse/getCommHouseList',

  //新增房间
  postCommHouseInfo:'baseCommHouse/postCommHouseInfo',

  //删除房间
  deleteCommHouseInfo:'baseCommHouse/deleteCommHouseInfo',

  //获取社区楼/街/层列表
  getBuildingList:'baseCommHouse/getBuildingList',

  //获取对应楼栋的房间
  getHouseByBuilding:'baseCommHouse/getHouseByBuilding',

  //电价方案
  //获取社区电费方案列表
  getSchemeList:'meterChargingScheme/getSchemeList',

  //添加方案
  saveScheme:'meterChargingScheme/saveScheme',

  //删除方案
  deleteScheme:'meterChargingScheme/deleteScheme',

  //修改方案
  updateScheme:'meterChargingScheme/updateScheme',

  //表计档案
  //获取表计档案列表
  getPageList:'meterInfo/getPageList',

  //添加表计档案
  saveMeterInfo:'meterInfo/saveMeterInfo',

  //修改表计档案
  updateMeterInfo:'meterInfo/updateMeterInfo',

  //删除表计档案
  deleteMeterInfo:'meterInfo/deleteMeterInfo',


  /**
   * 设备控制
   */

  //获取表计状态列表
  getMeterStateList:'meterInfo/getMeterStateList',

  //启用设备
  EnableDevice:'deviceCtrl/EnableDevice',

  //阀控指令
  CtrlEMRelayStatus:'deviceCtrl/CtrlEMRelayStatus',

  //读状态
  ReadEMCurrentPara:'deviceCtrl/ReadEMCurrentPara',

  /**
   * 冻结数据
   */
  //日冻结
  getDayPageList:'EM_Report/getDayPageList',

  //月冻结
  getMonthPageList:'EM_Report/getMonthPageList',

  /**
   * 远程充值
   */
  //查询状态
  queryRechargeState:'transManagement/queryRechargeState',

  //重写
  retryOperate:'transManagement/retryOperate',

  //充值
  Recharge:'transManagement/Recharge',

  //交易记录查询
  getRechargeRecord:'transManagement/getPageList',
}
