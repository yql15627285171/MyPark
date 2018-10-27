<!--远程充值-->
<template>
    <div class="wrap">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="查询状态" name="checkStatus">
          <check-status></check-status>
        </el-tab-pane>
        <el-tab-pane label="远程开户" name="openUser">
          <recharge></recharge>
        </el-tab-pane>
        <el-tab-pane label="远程充值" name="recharge">
          <recharge></recharge>
        </el-tab-pane>
        <el-tab-pane label="重写" name="rewrite">
          <rewrite></rewrite>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import checkStatus from './remote/checkStatus'
  import recharge from './remote/recharge'
  import rewrite from './remote/rewrite'
    export default {
      components:{
        checkStatus,
        recharge,
        rewrite
      },
      data(){
        return{
          activeName:'checkStatus'
        }
      },
      mounted(){

      },
      methods:{
        /**
         *切换tab时触发
         */
        handleClick:function(tab, event) {
          // this.$router.push(this.activeName)
        }
      }
    }
</script>

<style scoped>

  .wrap{
    height: 100%;
    padding: 20px;
    margin-top: 30px;
  }
</style>
