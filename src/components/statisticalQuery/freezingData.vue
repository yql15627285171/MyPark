<!---->
<template>
    <div class="wrap">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="日冻结数据" name="dayFreezing">
          <day-freezing></day-freezing>
        </el-tab-pane>
        <el-tab-pane label="月冻结数据" name="monthFreezing">
          <month-freezing></month-freezing>
        </el-tab-pane>
      </el-tabs>

    </div>
</template>

<script>
  import dayFreezing from './freezing/dayFreezing'
  import monthFreezing from './freezing/monthFreezing'
    export default {
      components:{
        dayFreezing,
        monthFreezing
      },
      data(){
        return{
          activeName: 'dayFreezing'
        }
      },
      mounted(){
        // this.$router.push('dayFreezing')
      },
      methods:{
        /**
         *切换tab时触发
         */
        handleClick(tab, event) {
          // this.$router.push(this.activeName)
        }
      },
    }
</script>

<style scoped lang='scss'>

  .wrap{
    height: 100%;
    padding: 20px;
    margin-top: 30px;
  }

</style>
