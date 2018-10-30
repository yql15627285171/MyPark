/**
 * 配置文件的根文件
 */

import Vue from 'vue'

/**
 *重置css样式
 */
import './css/reset.css'

/**
 * 引入字体样式
 */
import '../iconFont/iconfont.css'

/**
 *axios的配置
 */
import http from '../axios/http'
Vue.prototype.http = http
import api from '../axios/api'
Vue.prototype.api = api

/**
 * element-ui
 */
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)

/**
 * 获取路由的名字
 */
import routeName from './routeName'
Vue.use(routeName)

// iC开充值
import ICCard from './ICCard'
Vue.prototype.ICCard = ICCard


