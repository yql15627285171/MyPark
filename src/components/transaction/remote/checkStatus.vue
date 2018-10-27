<!--远程充值查询状态-->
<template>
    <div>
      <div class="condition">
        <el-form label-width="100px">
          <el-form-item label='栋/街/层：' style="height: 20px">
            <el-input v-model='areaForm.building' size="medium" placeholder='请选择栋数'></el-input>
          </el-form-item>
          <el-form-item label='房间号：' style="height: 20px">
            <el-input v-model='areaForm.building' size="medium" placeholder='请选择栋数'></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" size="medium">查询</el-button>
        </div>
      </div>
      <div class="message">
        <div class="title">*当前信息</div>
        <el-form label-width="100px">
          <div style="display: flex;">
            <el-form-item label='用户：' style='width:300px;height:30px'>
              <span>ss</span>
            </el-form-item>

            <el-form-item label="资产号：" style='width:300px;height:30px'>
              <span>ss</span>
            </el-form-item>
          </div>
          <div style="display: flex;">
            <el-form-item label='剩余金额：' style='width:300px;height:30px'>
              <span>ss</span>
            </el-form-item>

            <el-form-item label="余额状态：" style='width:300px;height:30px'>
              <span>ss</span>
            </el-form-item>
          </div>
          <div style="display: flex;">
            <el-form-item label='阀控状态：' style='width:300px;height:30px'>
              <span>ss</span>
            </el-form-item>

            <el-form-item label="抄读时间：" style='width:300px;height:30px'>
              <span>ss</span>
            </el-form-item>
          </div>
        </el-form>
      </div>

      <div class="lastOperation">
        <div class="title">*上次操作</div>
        <el-form label-width="100px">
            <el-form-item label='操作：' style='height:30px'>
              <span>ss</span>
            </el-form-item>
            <el-form-item label="金额：" style='height:30px'>
              <span>ss</span>
            </el-form-item>
            <el-form-item label='时间：' style='height:30px'>
              <span>ss</span>
            </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          areaForm:{
            building:'',
            houseNo:'',
          },
          buildings:[],
          houseNos:[],
        }
      },
      mounted(){},
      methods:{}
    }
</script>

<style scoped lang='scss'>

  .condition{
    margin-left: 200px;
    margin-top: 20px;
    width: 500px;
    .el-select{
      width: 300px;
    }
    .el-input{
      width: 300px;
    }
    .el-button{
      margin-top: 20px;
      width: 200px;
      margin-left: 120px;
    }
  }

  .lastOperation,
  .message{
    margin-left: 200px;
    margin-top: 20px;

    .title{
      color:#409EFF;
      font-size: 16px;
      margin-bottom: 20px;
    }
  }

</style>
