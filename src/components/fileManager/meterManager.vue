<!--表计管理-->
<template>
    <div class="wrap">
      <div class="condition">
        <el-input
          v-model.trim="queryAssetsCode"
          placeholder="请输入资产编号关键词"
          prefix-icon="el-icon-search"
          size="medium">
        </el-input>
        <el-button type="primary" size="medium" @click="getPageList(queryAssetsCode)">查询</el-button>
        <el-button type="primary" size="medium" @click="addBtnClick">单个添加</el-button>
        <el-button type="primary" size="medium" >批量添加</el-button>
        <el-button type="primary" size="medium" >档案下发</el-button>
      </div>

      <!--弹框显示新增操作-->
      <el-dialog title="增加/修改 表计" :visible.sync="dialogFormVisible">
        <el-form :model="formData" ref="formData" label-width="100px" class="myForm">

          <el-form-item label="资产编号" prop="assetsCode" >
            <el-input v-model.lazy.trim="formData.assetsCode"
                      @change="EnableDevice"
                      size="medium"
                      placeholder="请输入"
                      :disabled="operationType!='add'"></el-input>
            <span style="color: red">{{deviceType}}</span>
          </el-form-item>
          <el-form-item label="栋/街/层" prop="building">
            <el-select
              v-model="formData.building"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="getBuildings"
              :loading="buildingLoading"
              size="medium">
              <el-option
                v-for="item in buildings"
                :key="item.building"
                :label="item.building"
                :value="item.building">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="房间号" prop="houseId">
            <el-select
              v-model="formData.houseId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="getHouses"
              :loading="houseLoading"
              size="medium">
              <el-option
                v-for="item in houses"
                :key="item.id"
                :label="item.houseNo"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="安装地址" prop="installAddress" >
            <el-input v-model="formData.installAddress" size="medium" placeholder="请输入"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm" :disabled="resetBtnDisabled">重置</el-button>
          <el-button type="primary" @click="submitForm" :disabled="sureBtnDisabled">确定</el-button>
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

          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand" >
                <el-form-item :label="item.label" v-for="(item,index) in messageName" v-if="index>4">
                  <span>{{ props.row[item.name] }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column
            type="index"
            width="50">
          </el-table-column>

          <el-table-column
            v-for="(item,index) in messageName"
            v-if="index <= 4"
            :prop="item.name"
            :label="item.label"
            :width="item.width">
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
                         @click="deleteMeterInfo(scope.row)">
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
          loading:false,
          currentPage:1,
          totalLength:1,
          queryAssetsCode:'',//搜索的资产编号
          deviceType:'',//设备类型
          message:[],
          messageName:[
            {
              label:'资产编号',
              name:'assetsCode',
            },
            {
              label:'栋/街/层',
              name:'building',
            },
            {
              label:'所属房间',
              name:'houseNo',
            },
            {
              label:'运行状态',
              name:'runStatus',
            },
            {
              label:'费率数',
              name:'RateNum'
            },
            {
              label:'付费类型',
              name:'payType'
            },
            {
              label:'软件版本',
              name:'softVer'
            },
            {
              label:'硬件版本',
              name:'hardVer'
            },
            {
              label:'安装地址',
              name:'installAddress'
            },
            {
              label:'安装时间',
              name:'installTime'
            }

          ],
          dialogFormVisible:false,
          formData:{
            assetsCode:'',//资产编号
            building:'',//栋/街/层
            houseId:'',//房间号
            installAddress:'',//安装地址
            userId:window.sessionStorage.getItem('userId')
          },
          buildings:[],//可选择的楼栋列表
          buildingLoading:false,
          houses:[],//可选择的房间列表
          houseLoading:false,
          operationType:'add',//操作类型，add 或者 update
          resetBtnDisabled:false,
          sureBtnDisabled:true,
        }
      },
      mounted(){
        this.getPageList()
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
          this.getPageList(this.queryAssetsCode,index)
        },


        //点击单个添加按钮
        addBtnClick:function () {
          this.operationType = 'add'
          // this.resetForm()
          this.dialogFormVisible = true

          setTimeout(_=>{
            this.resetForm()
          },10)

        },

        //点击修改按钮
        updateBtnClick:function(data){
          this.operationType = 'update'
          this.dialogFormVisible = true
         this.resetBtnDisabled = true
          this.formData.assetsCode = data.assetsCode
          this.EnableDevice(data.assetsCode)
        },

        /**
         * 提交表单
         */
        submitForm:function () {
          this.dialogFormVisible = false
          if (this.operationType == 'add'){
            this.saveOrUpdateMeterInfo(this.api.saveMeterInfo)
          }else if(this.operationType == 'update'){
            this.saveOrUpdateMeterInfo(this.api.updateMeterInfo)
          }
        },

        /**
         * 重置
         */
        resetForm:function () {
          this.deviceType = ''
          this.sureBtnDisabled = true
          this.$refs['formData'].resetFields()
        },

        /**
         *获取表计档案列表
         */
        getPageList:function (assetsCode='',pageIndex=1,pageSize=10) {
          var token = window.sessionStorage.getItem('token')
          var params = {
            userId:window.sessionStorage.getItem('userId'),
            assetsCode:assetsCode,
            installAddress:'',
            pageIndex:pageIndex,
            pageSize:pageSize
          }
          this.loading = true
          console.log(params)
          this.http.get(this.api.baseUrl + this.api.getPageList,params,token)
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
         * 单个添加/修改  表计
         */
        saveOrUpdateMeterInfo:function (url) {
          console.log(this.formData)
          if (this.formData.assetsCode == '' || this.formData.houseId == '' ||
            this.formData.installAddress == '') {
            this.$message.warning('请填写好信息');
            return
          }

          var token = window.sessionStorage.getItem('token')

          this.loading = true
          console.log(this.formData)
          this.http.post(this.api.baseUrl + url,this.formData,token)
            .then(result=>{
              this.loading = false
              console.log(result)
              if (result.msg == 'success') {
                this.$message.success('操作成功');
                this.getPageList(this.queryAssetsCode,this.currentPage)
              }else{
                this.$message.error(result.msg);
              }
            })
        },

        /**
         * 删除表计档案
         */
        deleteMeterInfo:function(data){

          this.$confirm('此操作将永久删除该档案, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //点击确定
            var token = window.sessionStorage.getItem('token')
            var params = {
              ids:data.id
            }
            this.loading = true

            this.http.get(this.api.baseUrl + this.api.deleteMeterInfo,params,token)
              .then(result=>{
                this.loading = false
                if (result.msg == 'success') {
                  this.$message.success('删除成功')
                  this.getPageList(this.queryAssetsCode,this.currentPage)
                }else{
                  this.$message.error(result.msg);
                }
              })

          }).catch(() => {
            //点击取消
          })


        },


        /**
         * 获取楼栋列表
         */
        getBuildings:function (buildingName) {
          if(buildingName ==''){
            this.buildings = []
            return
          }
          this.houses = []
          this.formData.houseId = ''
          this.buildingLoading = true
          this.getBuildingList(buildingName).then(result=>{
            this.buildingLoading = false
            console.log(result)
            this.buildings = result.page
          })
        },

        /**
         * 获取楼栋对应的房间
         */
        getHouses:function(houseNo){
          if(houseNo =='' || this.formData.building == ''){
            this.houses = []
            return
          }

          this.houseLoading = true

          this.getHouseByBuilding(this.formData.building,houseNo).then(result=>{
            this.houseLoading = false
            console.log(result)
            this.houses = result.page
          })

        },

        /**
         * 输入的资产编号发生改变调用
         * 根据资产编号获取对应的种类
         */
        EnableDevice:function (assetsCode) {
          var token = window.sessionStorage.getItem('token')
          var params = {
            userId:window.sessionStorage.getItem('userId'),
            DeviceId:assetsCode
          }
          console.log(params)
          this.http.get(this.api.baseUrl + this.api.EnableDevice,params,token)
            .then(result=>{
              console.log(result)
              if (result.status == 'ok'){
                this.deviceType = this.getDeviceType(result.data.DeviceType)
                this.sureBtnDisabled = false
              }else{
                this.deviceType = result.data
                this.sureBtnDisabled = true
              }
            })
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
