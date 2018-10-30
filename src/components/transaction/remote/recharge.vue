<!--远程充值-->
<template>
    <div class="rechargeForm" v-loading="loading">
      <el-form  label-width="100px">
        <el-form-item label='栋/街/层：'>
          <el-input disabled placeholder='请选择栋/街/层' size="medium" v-model="choseBuilding"></el-input>
        </el-form-item>
        <el-form-item label='房间号：'>
          <el-input disabled placeholder='请选择房间号' size="medium" v-model="choseHouseNo"></el-input>
        </el-form-item>
        <el-form-item label="类型：" >
          <el-select v-model="transaction"
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
        <el-button type="primary" size="medium" @click="Recharge">确定</el-button>
      </div>

    </div>
</template>

<script>
    export default {
      props:{
        choseBuilding:String,
        choseHouseNo:String
      },
      data(){
        return{
          loading:false,
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
          transaction:'',
          money:'',//金额
        }
      },
      mounted(){

      },
      methods:{
        //远程充值
        Recharge:function () {
          if (this.transaction == '' || this.money == ''){
            this.$message.warning('请填写好信息')
            return
          }

          this.$confirm(`是否要充值${this.money}元`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //点击确定
            var token = window.sessionStorage.getItem('token')

            var params = {
              userId:window.sessionStorage.getItem('userId'),
              building:this.choseBuilding,
              houseNo:this.choseHouseNo,
              TransactionAmount:this.money,
              TransactionMode:2,
              TransactionMethod:this.transaction
            }
            console.log(params)
            this.loading = true
            this.http.get(this.api.baseUrl + this.api.Recharge,params,token,110000).then(result=>{
              this.loading = false
              console.log(result)
              if (result.msg == 'success') {
                this.$message.success('充值成功')
                this.$store.dispatch('setCurrState',result.currState)
                this.$store.dispatch('setLastRecord',result.LastRecord)
                this.$emit('getCardType',result.CardType,this.choseBuilding,this.choseHouseNo)
              }else{
                this.$message.error(result.msg);
              }
            })


          }).catch(() => {
            //点击取消
          })


        }
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
