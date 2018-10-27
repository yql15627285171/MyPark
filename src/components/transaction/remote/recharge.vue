<!--远程充值-->
<template>
    <div class="rechargeForm">
      <el-form  label-width="100px">
        <el-form-item label='栋/街/层：'>
          <el-input v-model='building' disabled placeholder='请选择栋/街/层' size="medium"></el-input>
        </el-form-item>
        <el-form-item label='房间号：'>
          <el-input v-model='houseNo' disabled placeholder='请选择房间号' size="medium"></el-input>
        </el-form-item>
        <el-form-item label="类型：" >
          <el-select v-model="type"
                     placeholder="请选择交易类型"
                     clearable
                     size="medium">
            <el-option v-for="item in TransactionMethod"
                       :label="item.label" :value="item.value" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额：" >
          <el-input  v-model.trim="money" size="medium"></el-input>
        </el-form-item>
      </el-form>
      <div >
        <el-button type="primary" size="medium">确定</el-button>
      </div>

    </div>
</template>

<script>
    export default {
      data(){
        return{
          TransactionMethod:[
            {
              label:'现金',
              value:'0'
            },
            {
              label:'微信',
              value:'1'
            },
            {
              label:'支付宝',
              value:'2'
            },
            {
              label:'银联',
              value:'3'
            },
            {
              label:'补助',
              value:'4'
            },
            {
              label:'支票',
              value:'5'
            },
            {
              label:'其他',
              value:'9'
            },],// 交易方式
          building:'',//栋街层
          houseNo:'',//房间号
          type:'',//种类
          money:'',//金额
        }
      },
      mounted(){
        console.log('远程充值')
      },
      methods:{

      }
    }
</script>

<style scoped lang='scss'>

  .rechargeForm{
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
      width: 200px;
      margin-left: 120px;
    }

  }
</style>
