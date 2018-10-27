<!--远程重写-->
<template>
  <div class="rewriteForm">
    <el-form  label-width="100px">
      <el-form-item label='栋/街/层：'>
        <el-input v-model='building' disabled placeholder='请选择栋/街/层' size="medium"></el-input>
      </el-form-item>
      <el-form-item label='房间号：'>
        <el-input v-model='houseNo' disabled placeholder='请选择房间号' size="medium"></el-input>
      </el-form-item>
    </el-form>
    <div >
      <el-button type="primary" size="medium">确定重写</el-button>
    </div>

  </div>
</template>

<script>
  export default {
    data(){
      return{
        building:'',//栋街层
        houseNo:'',//房间号
      }
    },
    mounted(){
    },
    methods:{

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
