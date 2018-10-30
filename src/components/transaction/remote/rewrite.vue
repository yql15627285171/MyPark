<!--远程重写-->
<template>
  <div class="rewriteForm" v-loading="loading">
    <el-form  label-width="100px">
      <el-form-item label='栋/街/层：'>
        <el-input v-model="choseBuilding" disabled placeholder='请选择栋/街/层' size="medium"></el-input>
      </el-form-item>
      <el-form-item label='房间号：'>
        <el-input v-model="choseHouseNo" disabled placeholder='请选择房间号' size="medium"></el-input>
      </el-form-item>
    </el-form>
    <div >
      <el-button type="primary" size="medium" @click="retryOperate">确定重写</el-button>
    </div>

  </div>
</template>

<script>
  export default {
    props:{
      choseBuilding:String,
      choseHouseNo:String,
    },
    data(){
      return{
        loading:false,
      }
    },
    mounted(){

    },
    methods:{
      //重写
      retryOperate:function () {
        var token = window.sessionStorage.getItem('token')
        var params = {
          userId:window.sessionStorage.getItem('userId'),
          building:this.choseBuilding,
          houseNo:this.choseHouseNo,
        }
        this.loading = true

        this.http.get(this.api.baseUrl + this.api.retryOperate,params,token,110000)
          .then(result=>{
            this.loading = false
            console.log(result)
            if (result.msg == 'success') {
              this.$message.success('重写成功')
              this.$store.dispatch('setCurrState',result.currState)
              this.$store.dispatch('setLastRecord',result.LastRecord)
              this.$emit('getCardType',result.CardType,this.choseBuilding,this.choseHouseNo)
            }else{
              this.$message.error(result.msg)
            }

          })


      }
    }
  }
</script>

<style scoped lang='scss'>

  .rewriteForm{
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
