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
      <el-button type="primary" size="medium" @click="addBtnClick">新增</el-button>
    </div>

    <!--弹框显示新增操作-->
    <el-dialog title="增加账户" :visible.sync="dialogFormVisible">
      <el-form :model="formData"  ref="formData" label-width="100px" class="myForm">

        <el-form-item label="方案名" prop="shcemeName" >
          <el-input v-model="formData.shcemeName" size="medium" placeholder="请输入方案名"></el-input>
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
        <el-form-item label="复费率价2" prop="price2">
          <el-input v-model="formData.price2" size="medium" placeholder="请输入" :disabled="formData.shcemeType != 1"></el-input>
        </el-form-item>
        <el-form-item label="复费率价3" prop="price3">
          <el-input v-model="formData.price3" size="medium" placeholder="请输入" :disabled="formData.shcemeType != 1"></el-input>
        </el-form-item>
        <el-form-item label="复费率价4" prop="price4">
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
          prop="feeName"
          label="方案名">
        </el-table-column>
        <el-table-column
          prop="fee1"
          label="价格1">
        </el-table-column>
        <el-table-column
          prop="fee2"
          label="价格2">
        </el-table-column>
        <el-table-column
          prop="fee3"
          label="价格3">
        </el-table-column>
        <el-table-column
          prop="fee4"
          label="价格4">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope" >

            <el-button type="text"
                       size="small"
                       style="color: #55a532"
                       @click="updateBtnClick(scope.row)">
              <i class="el-icon-edit"></i>
              修改
            </el-button>
            <el-button type="text"
                       size="small"
                       style="color: #df5000"
                       @click="deleteScheme(scope.row)">
              <i class="el-icon-delete"></i>
              删除
            </el-button>

          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next,jumper"
        :total="totalLength">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          loading:false,
          dialogFormVisible:false,
          totalLength:1,//总数量
          currentPage:1,//当前页面
          message:[],
          formData:{
            shcemeName:'',
            shcemeType:0,
            singlePrice:'',//单费率
            price1:'',
            price2:'',
            price3:'',
            price4:'',
            id:'',//方案id
          },//表单参数
          singleDisabled:false,//单费率输入框能否输入
          operationType:'add',//操作类型 add update
        }
      },
      mounted(){
        this.getSchemeList()
      },
      methods:{
        //设置表格
        tableHeadStyle:function ({row, column, rowIndex, columnIndex}) {
          return 'background:#409EFF;color:#fff;text-align:center'
        },
        //表格体
        tableRowStyle:function ({row, column, rowIndex, columnIndex}) {
          return 'text-align:center;padding:2px;'
        },

        //页面控制器页数改变
        handleCurrentChange:function(index){

        },

        /**
         * 提交表单
         */
        submitForm:function () {
          if (this.operationType == 'add'){
            this.saveOrUpdateScheme(this.api.saveScheme)
          } else if(this.operationType == 'update'){
            this.saveOrUpdateScheme(this.api.updateScheme)
          }
        },

        /**
         * 重置
         */
        resetForm:function () {
          this.$refs['formData'].resetFields()
        },

        /**
         * 获取方案列表
         */
        getSchemeList:function(){
          var token = window.sessionStorage.getItem('token')
          var params = {
            userId:window.sessionStorage.getItem('userId')
          }
          this.loading = true
          this.http.get(this.api.baseUrl + this.api.getSchemeList,params,token)
            .then(result=>{
              this.loading = false
              console.log(result)
              if(result.msg == 'success'){
                this.message = result.page
                this.totalLength = result.recordes
              }else{
                this.$message.error(result.msg);
              }
            })

        },

        /**
         * 点击新增按钮
         */
        addBtnClick:function(){
          this.dialogFormVisible = true
          this.operationType = 'add'
          this.formData.id = ''
        },

        /**
         * 点击修改按钮
         */
        updateBtnClick:function(data){
          this.dialogFormVisible = true
          this.operationType = 'update'

          this.formData.shcemeName = data.feeName
          this.formData.id = data.id
          if (data.fee1 == data.fee2 && data.fee2 == data.fee3 && data.fee3 == data.fee4){
            //单费率
            this.formData.shcemeType = 0
            this.formData.singlePrice = data.fee1
            this.formData.price1 = ''
            this.formData.price2 = ''
            this.formData.price3 = ''
            this.formData.price4 = ''
          } else{
            //复费率
            this.formData.shcemeType = 1
            this.formData.singlePrice = ''
            this.formData.price1 = data.fee1
            this.formData.price2 = data.fee2
            this.formData.price3 = data.fee3
            this.formData.price4 = data.fee4
          }
        },

        /**
         * 新增、修改 方案
         */
        saveOrUpdateScheme:function (url) {
          if (this.formData.shcemeType == 0 ){
            //单费率
            if(this.formData.shcemeName.length == 0 || this.formData.singlePrice.length == 0){
              this.$message.warning('请填写完整的参数');
              return
            }
          }else{
            if(this.formData.shcemeName.length == 0 || this.formData.price1.length == 0 ||
              this.formData.price2.length == 0 || this.formData.price3.length == 0 ||
              this.formData.price4.length == 0){
              this.$message.warning('请填写完整的参数');
              return
            }
          }

          var token = window.sessionStorage.getItem('token')
          var params = {
            userId:window.sessionStorage.getItem('userId'),
            feeName:this.formData.shcemeName,
            fee1:this.formData.shcemeType == 0 ? this.formData.singlePrice : this.formData.price1,
            fee2:this.formData.shcemeType == 0 ? this.formData.singlePrice : this.formData.price2,
            fee3:this.formData.shcemeType == 0 ? this.formData.singlePrice : this.formData.price3,
            fee4:this.formData.shcemeType == 0 ? this.formData.singlePrice : this.formData.price4,
            id:this.formData.id,
          }
          this.dialogFormVisible = false
          this.loading = true
          this.http.post(this.api.baseUrl + url,params,token)
            .then(result=>{
              this.loading = false
              console.log(result)
              if(result.msg == 'success'){
                this.$message.success('操作成功');
                this.getSchemeList()
              }else{
                this.$message.error(result.msg);
              }
            })


        },

        /**
         * 删除方案
         */
        deleteScheme:function (data) {

          this.$confirm('此操作将永久删除该方案', '是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //点击确定
            var token = window.sessionStorage.getItem('token')
            var params = {
              ids:data.id
            }
            this.http.get(this.api.baseUrl + this.api.deleteScheme,params,token)
              .then(result=>{
                console.log(result)
                if (result.msg == 'success') {
                  this.$message.success('删除成功');
                  this.getSchemeList()
                }else{
                  this.$message.error(result.msg);
                }
              })

          }).catch(() => {
            //点击取消
          });
        },

        /**
         * 修改方案
         */
        updateScheme:function () {

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

  .el-pagination{
    margin-top: 20px;
    text-align: center;
  }

</style>
