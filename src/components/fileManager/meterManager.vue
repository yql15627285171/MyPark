<!--表计管理-->
<template>
    <div class="wrap">
      <div class="condition">
        <el-input
          v-model.trim="queryMeterAssetsCode"
          placeholder="请输入资产编号"
          prefix-icon="el-icon-search"
          size="medium">
        </el-input>
        <el-button type="primary" size="medium" @click="">查询</el-button>
        <el-button type="primary" size="medium" @click="showAddDialog">单个添加</el-button>
        <el-button type="primary" size="medium" >批量添加</el-button>
        <el-button type="primary" size="medium" >档案下发</el-button>
      </div>

      <!--弹框显示新增操作-->
      <el-dialog title="增加/修改 表计" :visible.sync="dialogFormVisible">
        <el-form :model="formData" ref="formData" label-width="100px" class="myForm">

          <el-form-item label="资产编号" prop="MeterAssetsCode" >
            <el-input v-model.lazy.trim="formData.MeterAssetsCode"
                      @change="valueChange"
                      size="medium"
                      placeholder="请输入"
                      :disabled="operationType!='add'"></el-input>
          </el-form-item>
          <el-form-item label="栋/街/层" prop="FifthRegionName" >
            <el-input v-model="formData.FifthRegionName" size="medium" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="房间号" prop="HouseRegionName" >
            <el-input v-model="formData.HouseRegionName" size="medium" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="集中器地址" prop="LogicAddr" >
            <el-input v-model="formData.LogicAddr" size="medium" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="安装地址" prop="InstallAddr" >
            <el-input v-model="formData.InstallAddr" size="medium" placeholder="请输入"></el-input>
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
                         @click="showChangeDialog">
                <i class="el-icon-edit"></i>
                修改
              </el-button>
              <el-button type="text"
                         size="small"
                         style="color: #df5000"
                         @click="">
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
          queryMeterAssetsCode:'',//搜索的资产编号
          message:[
            {
              MeterAddr:1,
              FifthRegionName:1,
              HouseRegionName:'1',
              LogicAddr:'1',
              RunStatus:'1',
              MeterKindId:'1',
              MeterAssetsCode:'1',
              Seq:'1',
              MeasureId:'1',
              BaudRate:'1',
              CommPort:'1',
              CommProtocol:'1',
              CommPwd:'1',
              RateNum:'1',
              IntegerNum:'1',
              CollectorAddr:'1',
              BigClassNo:'1',
              SmallClassNo:'1',
              PayType:'1',
              SoftVer:'1',
              HardVer:'1',
              InstallAddr:'1',
              InstallTime:'1'
            }
          ],
          messageName:[
            {
              label:'表地址',
              name:'MeterAddr',
            },
            {
              label:'所属区域',
              name:'FifthRegionName',
            },
            {
              label:'所属房间',
              name:'HouseRegionName',
            },
            {
              label:'所属集中器',
              name:'LogicAddr',
            },
            {
              label:'运行状态',
              name:'RunStatus',
            },
            {
              label:'表计类型',
              name:'MeterKindId',
            },
            {
              label:'资产编号',
              name:'MeterAssetsCode',
            },
            {
              label:'表装置序号',
              name:'Seq',
            },
            {
              label:'测量点符号',
              name:'MeasureId',
            },
            {
              label:'波特率',
              name:'BaudRate',
            },
            {
              label:'端口号',
              name:'CommPort'
            },
            {
              label:'协议',
              name:'CommProtocol'
            },
            {
              label:'通信密码',
              name:'CommPwd'
            },
            {
              label:'费率数',
              name:'RateNum'
            },
            {
              label:'示数整数位个数',
              name:'IntegerNum'
            },
            {
              label:'示数整数位个数',
              name:'IntegerNum'
            },
            {
              label:'采集器地址',
              name:'CollectorAddr'
            },
            {
              label:'用户大类号',
              name:'BigClassNo'
            },
            {
              label:'用户小类号',
              name:'SmallClassNo'
            },
            {
              label:'付费类型',
              name:'PayType'
            },
            {
              label:'软件版本',
              name:'SoftVer'
            },
            {
              label:'硬件版本',
              name:'HardVer'
            },
            {
              label:'安装地址',
              name:'InstallAddr'
            },
            {
              label:'安装时间',
              name:'InstallTime'
            }

          ],
          dialogFormVisible:false,
          formData:{
            MeterAssetsCode:'',//资产编号
            FifthRegionName:'',//栋/街/层
            HouseRegionName:'',//房间号
            LogicAddr:'',//集中器地址
            InstallAddr:'',//安装地址

          },
          operationType:'add',//操作类型，add 或者 update
        }
      },
      mounted(){

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

        },


        /**
         *
         */
        valueChange:function(){
          console.log('输入值改变了')
        },

        //点击单个添加按钮
        showAddDialog:function () {
          this.operationType = 'add'
          this.dialogFormVisible = true
        },

        //点击修改按钮
        showChangeDialog:function(){
          this.operationType = 'update'
          this.dialogFormVisible = true
        },

        /**
         * 提交表单
         */
        submitForm:function () {
          this.dialogFormVisible = false
          if (this.operationType == 'add'){

          }else if(this.operationType == 'update'){

          }
        },

        /**
         * 重置
         */
        resetForm:function () {
          this.$refs['formData'].resetFields()
        },
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
