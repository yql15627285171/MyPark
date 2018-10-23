export default{
  //接口文档连接 http://192.168.5.26:9008/laiot-api/swagger-ui.html

  //接口所在域名
	baseUrl:'http://106.74.18.194:16005/renren-api/api/',

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


}
