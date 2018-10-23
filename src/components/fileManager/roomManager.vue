<!--房间管理-->
<template>
  <div class="wrap">
    <div class="condition">
      <el-input
        placeholder="请输入房间号"
        prefix-icon="el-icon-search"
        v-model="houseNo"
        size="medium">
      </el-input>
      <el-button type="primary" size="medium" @click="queryHouse">查询</el-button>
      <el-button type="primary" size="medium" @click="showAddDialog">单个添加</el-button>
      <el-button type="primary" size="medium">批量添加</el-button>
    </div>

    <!--弹框显示新增操作-->
    <el-dialog title="增加/修改房间" :visible.sync="dialogFormVisible">
      <el-form :model="formData"  ref="formData" label-width="100px" class="myForm">

        <el-form-item label="栋/街/层" prop="building" >
          <el-input v-model="formData.building" size="medium" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="房间号" prop="houseNo" >
          <el-input v-model="formData.houseNo" size="medium" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="倍率" prop="ratio" >
          <el-input v-model="formData.ratio" size="medium" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="建筑面积" prop="coveredArea" >
          <el-input v-model="formData.coveredArea" size="medium" placeholder="请输入"></el-input>
        </el-form-item>
        <!--<el-form-item label="电费方案" prop="electricityScheme" >-->
          <!--<el-select v-model="formData.electricityScheme" placeholder="请选择">-->
            <!--<el-option-->
              <!--v-for="item in electricitySchemes"-->
              <!--:key="item.id"-->
              <!--:label="item.label"-->
              <!--:value="item.id">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="submitForm">确认</el-button>
      </div>
    </el-dialog>

    <div class="tableMessage" v-loading="loading">
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
          prop="building"
          label="栋/街/层">
        </el-table-column>
        <el-table-column
          prop="houseNo"
          label="房间编号">
        </el-table-column>
        <el-table-column
          prop="ratio"
          label="电费倍率">
        </el-table-column>
        <el-table-column
          prop="coveredArea"
          label="建筑面积">
        </el-table-column>
        <!--<el-table-column-->
          <!--label="电费方案"-->
          <!--width="100">-->
          <!--<template slot-scope="scope" >-->

            <!--<el-button type="text"-->
                       <!--size="small"-->
                       <!--style="color: #55a532">-->
              <!--{{scope.row.electricityScheme}}-->
            <!--</el-button>-->

          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope" >

            <el-button type="text"
                       size="small"
                       style="color: #55a532"
                       @click="showDialog(scope.row)">
              <i class="el-icon-edit"></i>
              修改
            </el-button>
            <el-button type="text"
                       size="small"
                       style="color: #df5000"
                       @click="deleteCommHouseInfo(scope.row)">
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
            dialogFormVisible:false,//添加或者修改弹框
            currentPage:1,
            totalLength:1,
            houseNo:'',//要查询的房间号
            message:[
              // {
              //   building:'1',//栋/街/层
              //   houseNo:'1',//房间号/店铺号/公司名
              //   ratio:'1',//倍率
              //   coveredArea:'1',//建筑面积
              //   electricityScheme:'方案1',//电费收费方案
              // }
              ],
            formData:{
              userId:parseInt(window.sessionStorage.getItem('userId')),
              building:'',
              houseNo:'',
              ratio:'',
              coveredArea:'',
              // electricityScheme:'',
            },
            electricitySchemes:[
              {
                id:'1',
                label:'方案1'
              }
            ],
            operationType:'add',//操作类型
          }
        },
      mounted(){
        this.getCommHouseList()
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

        //分区控制器分页
        handleCurrentChange:function(index){
          this.getCommHouseList(index,10,this.houseNo)
        },
        /**
         * 点击单个添加 弹框
         */
        showAddDialog:function(){
          this.dialogFormVisible = true
          this.operationType = 'add'
        },

        /**
         * 提交表单
         */
        submitForm:function () {
          if (this.operationType == 'add'){
            this.postCommHouseInfo()
          } else if(this.operationType == 'update'){

          }
        },

        /**
         * 重置
         */
        resetForm:function () {
          this.$refs['formData'].resetFields()
        },

        /**
         * 点击查询按钮
         */
        queryHouse:function(){
          this.getCommHouseList(this.currentPage,10,this.houseNo)
        },

        /**
         * 添加房间
         */
        postCommHouseInfo:function () {
          var token = window.sessionStorage.getItem('token')
          this.loading = true
          this.dialogFormVisible = false
          console.log(this.formData)
          this.http.post(this.api.baseUrl + this.api.postCommHouseInfo,this.formData,token)
            .then(result=>{
              this.loading = false
              console.log(result)
              if (result.msg == 'success') {
                this.$message.success("添加成功");
                this.getCommHouseList(this.currentPage,10,this.houseNo)
              }else{
                this.$message.error(result.msg);
              }
            })
        },

        /**
         * 获取房间列表
         */
        getCommHouseList:function (pageIndex=1,pageSize=10,houseNo='') {
          var token = window.sessionStorage.getItem('token')
          var params = {
            userId:window.sessionStorage.getItem('userId'),
            houseNo:houseNo,
            pageIndex:pageIndex,
            pageSize:pageSize
          }
          this.loading = true
          this.http.get(this.api.baseUrl + this.api.getCommHouseList,params,token)
            .then(result=>{
              this.loading = false
              console.log(result)
              if (result.msg == 'success') {
                this.message = result.page
                this.totalLength = result.recordes
              }else{
                this.$message.error(result.msg);
              }
            })
        },

        /**
         * 删除房间
         */
        deleteCommHouseInfo:function (data) {

          this.$confirm('此操作将永久删除该房间, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //点击确定
            var token = window.sessionStorage.getItem('token')

            var params = {
              ids:data.id
            }
            console.log(params)
            this.http.get(this.api.baseUrl + this.api.deleteCommHouseInfo,params,token)
              .then(result=>{
                if (result.msg == 'success') {
                  this.$message.success('删除成功');
                  this.getCommHouseList(this.currentPage,10,this.houseNo)
                }else{
                  this.$message.error(result.msg);
                }
              })

          }).catch(() => {
            //点击取消
          });

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

  .el-form{
    .el-select{
      width: 300px;
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
