<!-- 电表 -->
<template>
  <div class="wrap" v-loading="loading">
    <div class="condition">
      <div class="left">
        <el-input
          placeholder="请输入资产编号关键字"
          prefix-icon="el-icon-search"
          v-model="queryAssetsCode"
          size="medium">
        </el-input>
        <el-button type="primary" size="medium" @click="getMeterStateList">查询</el-button>
      </div>
      <div class="right">
        <div @click="CtrlEMRelayStatus(1)">
          <i class="el-icon-edit-outline"></i>
          <span>拉闸</span>
        </div>
        <div @click="CtrlEMRelayStatus(2)">
          <i class="el-icon-edit-outline"></i>
          <span>合闸</span>
        </div>
        <div @click="CtrlEMRelayStatus(3)">
          <i class="el-icon-edit-outline"></i>
          <span>报警</span>
        </div>
        <div @click="CtrlEMRelayStatus(4)">
          <i class="el-icon-edit-outline"></i>
          <span>取消报警</span>
        </div>
        <div @click="CtrlEMRelayStatus(5)">
          <i class="el-icon-edit-outline"></i>
          <span>保电</span>
        </div>
        <div @click="CtrlEMRelayStatus(6)">
          <i class="el-icon-edit-outline"></i>
          <span>取消保电</span>
        </div>
        <div @click="ReadEMCurrentPara">
          <i class="el-icon-edit-outline"></i>
          <span>读状态</span>
        </div>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="message"
      :header-cell-style="tableHeadStyle"
      :cell-style="tableRowStyle"
      stripe
      border
      style="width: 100%"
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
        width="30">
      </el-table-column>


      <el-table-column type="expand" width="30">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand" >
            <el-form-item  v-for="(item,index) in messageName" v-if="index > 7" :label="item.label" >
              <span>{{ props.row[item.id] }}</span>
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
        v-if="index <= 7"
        :label="item.label"
        :prop="item.id">
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
</template>
<script>
  export default{
    data(){
      return{
        loading:false,//菊花
        queryAssetsCode:'',
        messageName:[
          {
            label:'资产编号',
            id:'assetsCode'
          },
          {
            label:'栋/街/层',
            id:'building',
          },
          {
            label:'房间号',
            id:'houseNo',
          },
          {
            label:'安装地址',
            id:'installAddress'
          },
          {
            label:'当前电量',
            id:'CurrentPower',
          },
          {
            label:'剩余金额',
            id:'RemainMoney'
          },
          {
            label:'余额状态',
            id:'BalanceState',
          },
          {
            label:'阀控状态',
            id:'RunStatus'
          },
          {
            label:'读取电量时间',
            id:'CurrentPowerTime'
          },
          {
            label:'读取金额时间',
            id:'RemainMoneyTime',
          },
          {
            label:'读取阀控状态时间',
            id:'RunStatusTime'
          },
          {
            label:'费率1电价',
            id:'RatePrice1'
          },
          {
            label:'费率2电价',
            id:'RatePrice2'
          },
          {
            label:'费率3电价',
            id:'RatePrice3'
          },
          {
            label:'费率4电价',
            id:'RatePrice4'
          }
        ],
        message:[],
        currentPage:1,//当前页数
        totalLength:1,
        requestCount:0,//多个表读状态的时候进行的计数
        selectionData:[],
      }
    },
    mounted(){
      this.getMeterStateList()
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
      //表格选择项发生变化
      //data是选择项组成的数组
      handleSelectionChange(data){
        this.selectionData = data
      },

      //分页器页数发生变化
      handleCurrentChange(index){
        this.getMeterStateList()
      },

      /**
       * 获取表计的状态列表
       */
      getMeterStateList:function(){
        var token = window.sessionStorage.getItem('token')

        var params = {
          userId:window.sessionStorage.getItem('userId'),
          assetsCode:this.queryAssetsCode,
          installAddress:'',
          pageIndex:this.currentPage,
          pageSize:10
        }

        this.loading = true
        console.log(params)

        this.http.get(this.api.baseUrl + this.api.getMeterStateList,params,token)
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
       * 阀控指令
       * CtrlType 1拉闸 2合闸 3报警 4解除报警 5保电 6解除保电
       */
      CtrlEMRelayStatus:function (index) {

        if (this.selectionData.length != 1){
          this.$message.warning('有且只能选择一个设备进行操作')
          return
        }

        var token = window.sessionStorage.getItem('token')
        var params = {
          userId:window.sessionStorage.getItem('userId'),
          DeviceId:this.selectionData[0].assetsCode,
          CtrlType:index,
        }
        this.loading = true
        console.log(params)
        this.http.get(this.api.baseUrl+this.api.CtrlEMRelayStatus,params,token,110000)
          .then(result=>{
            this.loading = false
            console.log(result)
            if (result.msg == 'success') {
              this.$message.success('操作成功')
              this.getMeterStateList()
            }else{
              this.$message.error(result.msg)
            }
          })
      },

      /**
       * 读状态
       */
      ReadEMCurrentPara:function () {

        if (this.selectionData.length != 1){
          this.$message.warning('有且只能选择一个设备进行操作')
          return
        }

        var token = window.sessionStorage.getItem('token')
        var params = {
          userId:window.sessionStorage.getItem('userId'),
          DeviceId:this.selectionData[0].assetsCode,
        }
        this.loading = true
        console.log(params)
        this.http.get(this.api.baseUrl + this.api.ReadEMCurrentPara,params,token,110000)
          .then(result=>{
            this.loading = false
            console.log(result)
            if (result.msg == 'success') {
              this.$message.success('操作成功')
              this.getMeterStateList()
            }else{
              this.$message.error(result.msg)
            }
          })
      }

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
    overflow: hidden;

    .right{
      float: right;
      div {
        margin-left: 20px;
        font-size: 14px;
        cursor: pointer;
        display: inline-block
      }
    }

    .left{
      float: left;
      display: flex;

      .el-button{
        margin-left: 20px;
      }
    }
  }

  .el-pagination{
    margin-top: 20px;
    text-align: center;
  }





</style>
