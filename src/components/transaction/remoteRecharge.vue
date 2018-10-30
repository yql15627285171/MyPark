<!--远程充值-->
<template>
    <div class="wrap">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="查询状态" name="checkStatus">
          <check-status @getCardType="getCardType"
                        @resetdisabled="resetdisabled">
          </check-status>
        </el-tab-pane>
        <el-tab-pane label="远程开户" name="openUser" :disabled="disabled1">
          <recharge :choseBuilding="choseBuilding" :choseHouseNo="choseHouseNo"></recharge>
        </el-tab-pane>
        <el-tab-pane label="远程充值" name="recharge" :disabled="disabled2">
          <recharge :choseBuilding="choseBuilding" :choseHouseNo="choseHouseNo"></recharge>
        </el-tab-pane>
        <el-tab-pane label="重写" name="rewrite" :disabled="disabled3">
          <rewrite :choseBuilding="choseBuilding" :choseHouseNo="choseHouseNo" @getCardType="getCardType"></rewrite>
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
          activeName:'checkStatus',
          disabled1:true,
          disabled2:true,
          disabled3:true,
          choseBuilding:'',
          choseHouseNo:'',
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
        },

        //只有开户功能
        showOpenUser:function(){
          this.disabled1 = false
          this.disabled2 = true
          this.disabled3 = true
        },

        //只有远程功能
        showRecharge:function(){
          this.disabled1 = true
          this.disabled2 = false
          this.disabled3 = true
        },

        //只有重写功能
        showRewrite:function(){
          this.disabled1 = true
          this.disabled2 = true
          this.disabled3 = false
        },

        //重置功能
        resetdisabled:function(){
          this.disabled1 = true
          this.disabled2 = true
          this.disabled3 = true
        },

        //获取卡的类型
        getCardType:function (type,building,houseNo) {
          this.choseBuilding = building
          this.choseHouseNo = houseNo
          if (type == '开户卡') {
            this.showOpenUser()
          }if(type == '重写卡'){
            this.showRewrite()
          }else if(type == '充值卡'){
            this.showRecharge()
          }
        },

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
