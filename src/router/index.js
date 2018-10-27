import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import main from '@/components/main'
import choseLists from '@/components/choseLists'

/**
 * 超级管理员
 */
//社区管理
import communityManager from '@/components/superAdmin/communityManager'
//账户管理
import accountManager from '@/components/superAdmin/accountManager'
/**
 * 收费方案
 */
//电费方案
import electricityScheme from '@/components/chargeScheme/electricityScheme'
/**
 * 档案管理
 */
//区域、房间管理
import roomManager from '@/components/fileManager/roomManager'
//网关管理
import gatewayManager from '@/components/fileManager/gatewayManager'
//表计管理
import meterManager from '@/components/fileManager/meterManager'
/**
 * 事务办理
 */
//设备控制
import equipmentControl from '@/components/transaction/equipmentControl'
import remoteRecharge from '@/components/transaction/remoteRecharge'
/**
 * 统计查询
 */
//冻结数据
import freezingData from '@/components/statisticalQuery/freezingData'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'main',
      component: main,
      redirect:'/main/choseLists',
      children:[
        {
          path:'choseLists',
          name:'choseLists',
          component:choseLists
        },
        {
          path:'communityManager',
          name:'communityManager',
          component:communityManager,
        },
        {
          path:'accountManager',
          name:'accountManager',
          component:accountManager,
        },
        {
          path:'electricityScheme',
          name:'electricityScheme',
          component:electricityScheme
        },
        {
          path:'roomManager',
          name:'roomManager',
          component:roomManager,
        },
        {
          path:'gatewayManager',
          name:'gatewayManager',
          component:gatewayManager,
        },
        {
          path:'meterManager',
          name:'meterManager',
          component:meterManager,
        },
        {
          path:'equipmentControl',
          name:'equipmentControl',
          component:equipmentControl
        },
        {
          path:'remoteRecharge',
          name:'remoteRecharge',
          component:remoteRecharge
        },
        {
          path:'freezingData',
          name:'freezingData',
          component:freezingData,
        }

      ]
    },
    {
      path:'/',
      name:'login',
      component:login
    },
  ]
})
