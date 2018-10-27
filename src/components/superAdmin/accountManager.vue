<!--管理员管理-->
<template>
  <div class="wrap">
    <div class="condition">
      <el-input
        placeholder="请输入客户名"
        prefix-icon="el-icon-search"
        v-model="queryName"
        size="medium">
      </el-input>
      <el-button type="primary" size="medium">查询</el-button>
      <el-button type="primary" size="medium" @click="showAddAccountDialog">新增</el-button>
    </div>

    <!--弹框显示新增操作-->
    <el-dialog title="增加账户" :visible.sync="dialogFormVisible">
      <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="myForm">

        <el-form-item label="用户名" prop="userName" >
          <el-input v-model="formData.userName" size="medium" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password1">
          <el-input v-model="formData.password1" size="medium" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="formData.password2" size="medium" type="password" placeholder="请确认密码"></el-input>
        </el-form-item>

        <el-form-item label="社区" prop="communityId">
          <el-select
            v-model.trim.lazy="formData.communityId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入社区名关键词"
            :remote-method="getCommunityList"
            :loading="communityListLoading">
            <el-option
              v-for="item in communitys"
              :key="item.id"
              :label="item.communityName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户岗位" prop="userPost">
          <el-radio-group v-model="formData.userPost">
            <el-radio :label="0">主管</el-radio>
            <el-radio :label="1">销售员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户类型" prop="userType">
          <el-radio-group v-model="formData.userType">
            <el-radio :label="0">企业</el-radio>
            <el-radio :label="1">业务员</el-radio>
            <el-radio :label="2">社区</el-radio>
            <el-radio :label="3">技术支持</el-radio>
            <el-radio :label="4">平台维护</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formData.mobile" size="medium" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" size="medium" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" prop="address">
          <el-input v-model="formData.address" size="medium" placeholder="请输入联系地址"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bankAccountNo">
          <el-input v-model="formData.bankAccountNo" size="medium" placeholder="请输入银行卡号"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="Idtype">
          <el-radio-group v-model="formData.Idtype">
            <el-radio :label="0">二代身份证</el-radio>
            <el-radio :label="1">护照</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="证件号码" prop="Idnumber">
          <el-input v-model="formData.Idnumber" size="medium" placeholder="请输入证件号码"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="formData.sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
            <el-radio :label="2">未知</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="固定电话" prop="telephone">
          <el-input v-model="formData.telephone" size="medium" placeholder="请输入固定电话"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="submitForm">立即创建</el-button>
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
          v-for="item in messageName"
          :prop="item.name"
          :label="item.label"
          :width="item.width">
        </el-table-column>

        <el-table-column
          label="操作">
          <template slot-scope="scope" >

            <!--<el-button type="text"-->
                       <!--size="small"-->
                       <!--style="color: #55a532"-->
                       <!--@click="showDialog(scope.row)">-->
              <!--<i class="el-icon-edit"></i>-->
              <!--修改-->
            <!--</el-button>-->
            <el-button type="text"
                       size="small"
                       style="color: #df5000"
                       @click="deleteSysUser(scope.row)">
              <i class="el-icon-delete"></i>
              删除
            </el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="total, prev, pager, next,jumper"
      :total="totalLength">
    </el-pagination>

  </div>
</template>

<script>
  export default {
    data(){
      return{
        currentPage:1,//当前页
        totalLength:1,//总记录数
        queryName:'',//查询的用户名
        message:[
          // {
          //   username:'1',//用户名
          //   mobile:'1',//手机号
          //   communityName:'1',//社区名
          //   userType:'1',//用户类型
          //   userPost:'1',//用户岗位
          //   status:'1',//状态
          //   createTime:'1',//创建时间
          // }
        ],
        messageName:[
          {
            label:'用户名',
            name:'username',
          },
          {
            label:'社区名',
            name:'communityName'
          },
          {
            label:'手机号',
            name:'mobile',
          },
          {
            label:'用户类型',
            name:'userType',
          },
          {
            label:'用户岗位',
            name:'userPost',
          },
          {
            label:'状态',
            name:'status',
          },
          {
            label:'创建时间',
            name:'createTime',
            width:200,
          }
        ],
        dialogFormVisible:false,
        loading:false,
        formData:{
          userName:'',
          password1:'',//密码N
          password2:'',//确认密码
          communityId:'',//社区id
          email:'',
          mobile:'',
          userType:-1,//用户类型
          userPost:-1,//用户岗位
          status:'',//状态
          address:'',//联系地址
          bankAccountNo:'',//银行卡号
          Idtype:'',//证件类型
          Idnumber:'',//证件号码
          sex:'',
          telephone:'',//固定电话
        },//表单内容
        rules:{
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password1:[
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          password2:[
            { required: true, message: '请确认密码', trigger: 'blur' },
          ],
          mobile: [
            { min: 11, max: 11, message: '长度不符合', trigger: 'blur' }
          ],
          userPost: [
            { required: true, message: '请选择用户类型', trigger: 'blur' },
          ],
          userType: [
            { required: true, message: '请选择用户类型', trigger: 'blur' },
          ],
          communityId:[
            { required: true, message: '请选择社区', trigger: 'blur' },
          ]

        },//校验规则
        communityListLoading:false,
        communitys:[],//社区列表
        operationType:'add',//操作类型，有更新和添加

      }
    },
    mounted(){
      this.getAllUser()
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
      //分页
      handleCurrentChange:function(index){
        this.getAllParentUser(index,10)
      },

      /**
       * 提交表单
       */
      submitForm:function () {
        if (this.operationType == 'add'){
          this.addSysUser()
        }
      },

      /**
       * 重置
       */
      resetForm:function () {
        this.$refs['formData'].resetFields()
      },

      //显示添加账户对话
      showAddAccountDialog:function(){
        this.dialogFormVisible = true
        this.operationType = 'add'
      },

      /**
       * 添加系统用户
       */
      addSysUser:function () {
        if (this.formData.username == '' || this.formData.password1 == '' || this.formData.password2 == ''
          ||this.formData.communityId == '' || this.formData.userType == -1 || this.formData.userPost == -1) {
          this.$message.warning('请填写好信息')
          return
        }else if(this.formData.password1 != this.formData.password2){
          this.$message.warning('确认密码不正确')
          return
        }
        this.dialogFormVisible = false
        var token = window.sessionStorage.getItem('token')

        this.loading = true

        var params = {
          userName:this.formData.userName,
          password:this.formData.password1,
          communityId:this.formData.communityId,
          email:this.formData.email,
          mobile:this.formData.mobile,
          userType:this.formData.userType,
          userPost:this.formData.userPost,
          status:this.formData.status,
          address:this.formData.address,
          bankAccountNo:this.formData.bankAccountNo,
          Idtype:this.formData.Idtype,
          Idnumber:this.formData.Idnumber,
          sex:this.formData.sex,
          telephone:this.formData.telephone,
        }

        console.log(params)

        this.http.post(this.api.baseUrl + this.api.addSysUser,params,token)
          .then(result=>{
            this.loading = false
            console.log(result)
            if (result.msg == 'success') {
              this.$message.success("添加成功");
              this.getAllUser(this.currentPage,10)
            }else{
              this.$message.error(result.msg);
            }
          })

      },

      /**
       * 删除系统用户
       */
      deleteSysUser:function(data){

        this.$confirm('此操作将永久社区, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //点击确定
          var token = window.sessionStorage.getItem('token')
          this.loading = true
          var params = {
            userIds:data.userId
          }
          this.http.get(this.api.baseUrl + this.api.deleteSysUser,params,token)
            .then(result=>{
              this.loading = false
              if (result.msg == 'success') {
                this.$message.success('删除成功')
                this.getAllUser(this.currentPage,10)
              }else{
                this.$message.error(result.msg);
              }
            })

        }).catch(() => {
          //点击取消
        })

      },

      /**
       * 获取用户列表
       */
      getAllUser:function(pageIndex=1,pageSize=10){
        var token = window.sessionStorage.getItem('token')

        var params = {
          userName:this.queryName,
          pageIndex:pageIndex,
          pageSize:pageSize
        }
        this.loading = true
        console.log(this.api.baseUrl + this.api.getAllUser)
        this.http.get(this.api.baseUrl + this.api.getAllUser,params,token)
          .then(result=>{
            console.log(result)
            this.loading = false
            if (result.msg == 'success') {
              this.message = result.userList
              for(let i = 0 ; i < this.message.length ; i++){
                this.message[i].userType = this.getUserType(this.message[i].userPost)
                this.message[i].userPost = this.getUserPost(this.message[i].userPost)
                this.message[i].status = this.getUserStatus(this.message[i].status)
                this.message[i].createTime = this.message[i].createTime.substring(0,19)
              }
            }else{
              this.$message.error(result.msg);
            }
          })

      },

      /**
       *获取所有社区
       * comm_name 模糊查询的条件 值为空的时候是查询所有
       */
      getCommunityList:function(comm_name){

        if(comm_name ==''){
          this.communitys = []
          return
        }

        var token = window.sessionStorage.getItem('token')

        var params = {
          comm_name:comm_name,
          pageIndex:1,
          pageSize:10000
        }
        console.log(params)
        this.communityListLoading = true
        this.http.get(this.api.baseUrl + this.api.getCommunityList,params,token)
          .then(result=>{
            this.communityListLoading = false
            if (result.msg == 'success') {
              this.communitys = result.page

            }else{
              this.$message.error(result.msg);
            }
          })
      },


    },
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

  .myForm{

    .el-input{
      width: 300px;
    }
    .el-select{
      width: 300px;
    }
  }

  .el-pagination{
    margin-top: 20px;
    text-align: center;
  }

</style>
