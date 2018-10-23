<!--电价方案-->
<template>
  <div class="wrap">
    <div class="condition">
      <el-input
        placeholder="请输入方案名"
        prefix-icon="el-icon-search"
        size="medium">
      </el-input>
      <el-button type="primary" size="medium">查询</el-button>
      <el-button type="primary" size="medium" @click="dialogFormVisible = true">新增</el-button>
    </div>

    <!--弹框显示新增操作-->
    <el-dialog title="增加账户" :visible.sync="dialogFormVisible">
      <el-form :model="formData"  ref="formData" label-width="100px" class="myForm">

        <el-form-item label="方案名" prop="schemeName" >
          <el-input v-model="formData.schemeName" size="medium" placeholder="请输入方案名"></el-input>
        </el-form-item>

        <el-form-item label="方案类型" prop="shcemeType">
          <el-radio-group v-model="formData.shcemeType">
            <el-radio :label="0">单费率</el-radio>
            <el-radio :label="1">复费率</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="单费率价" prop="singlePrice">
          <el-input v-model="formData.singlePrice" size="medium" placeholder="请输入" :disabled="formData.shcemeType != 0"></el-input>
        </el-form-item>

        <el-form-item label="复费率价1" prop="price1">
          <el-input v-model="formData.price1" size="medium" placeholder="请输入" :disabled="formData.shcemeType != 1"></el-input>
        </el-form-item>
        <el-form-item label="复费率价2" prop="price1">
          <el-input v-model="formData.price2" size="medium" placeholder="请输入" :disabled="formData.shcemeType != 1"></el-input>
        </el-form-item>
        <el-form-item label="复费率价3" prop="price1">
          <el-input v-model="formData.price3" size="medium" placeholder="请输入" :disabled="formData.shcemeType != 1"></el-input>
        </el-form-item>
        <el-form-item label="复费率价4" prop="price1">
          <el-input v-model="formData.price4" size="medium" placeholder="请输入" :disabled="formData.shcemeType != 1"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="submitForm">确认</el-button>
      </div>
    </el-dialog>

    <div class="tableMessage">
      <el-table
        stripe
        border
        :data="message"
        style="width: 100%"
        :header-cell-style="tableHeadStyle"
        :cell-style="tableRowStyle">

        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="方案名">
        </el-table-column>
        <el-table-column
          prop="type"
          label="种类">
        </el-table-column>
        <el-table-column
          prop="price1"
          label="价格1">
        </el-table-column>
        <el-table-column
          prop="price2"
          label="价格2">
        </el-table-column>
        <el-table-column
          prop="price3"
          label="价格3">
        </el-table-column>
        <el-table-column
          prop="price4"
          label="价格4">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope" >

            <el-button type="text"
                       size="small"
                       style="color: #55a532"
                       @click="dialogFormVisible = true">
              <i class="el-icon-edit"></i>
              修改
            </el-button>
            <el-button type="text"
                       size="small"
                       style="color: #df5000">
              <i class="el-icon-delete"></i>
              删除
            </el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          loading:false,
          dialogFormVisible:false,
          message:[
            {
              name:'方案1',
              type:'单费率',
              price1:1,
              price2:1,
              price3:1,
              price4:1,

            }
          ],
          formData:{
            shcemeName:'',
            shcemeType:0,
            singlePrice:'',//单费率
            price1:'',
            price2:'',
            price13:'',
            price4:'',
          },//表单参数
          singleDisabled:false,//单费率输入框能否输入
        }
      },
      watch:{
        formData:function(newValue){
          console.log("lll")
        }
      },
      mounted(){},
      methods:{
        //设置表格
        tableHeadStyle:function ({row, column, rowIndex, columnIndex}) {
          return 'background:#409EFF;color:#fff;text-align:center'
        },
        //表格体
        tableRowStyle:function ({row, column, rowIndex, columnIndex}) {
          return 'text-align:center;padding:2px;'
        },

        /**
         * 提交表单
         */
        submitForm:function () {
          var token = window.sessionStorage.getItem('token')
          this.dialogFormVisible = true
          // this.loading = true
          // this.http.post(this.api.baseUrl + this.api.addSysUser,this.formData,token)
          //   .then(result=>{
          //     this.loading = false
          //     console.log(result)
          //   })
        },

        /**
         * 重置
         */
        resetForm:function () {
          this.$refs['formData'].resetFields()
        },

        /**
         * 新增方案
         */
        addScheme:function () {

        }
      }

    }
</script>

<style scoped lang='scss'>

  .wrap{
    height: 100%;
    padding: 20px;
    margin-top: 30px;
  }

  .condition{
    display: flex;

    .el-button{
      margin-left: 20px;
    }

    .el-input{
      width: 300px;
    }
  }
</style>
