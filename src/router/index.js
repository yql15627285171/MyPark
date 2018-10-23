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
import equipmentControl from '@/components/transaction/equipmentControl'

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
        }

      ]
    },
    {
      path:'/',
      name:'login',
      component:login
    }
  ]
})
