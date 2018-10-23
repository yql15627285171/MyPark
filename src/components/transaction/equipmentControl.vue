<!-- 电表 -->
<template>
  <div class="wrap" v-loading="loading">
    <div class="condition">
      <div class="right">
        <div>
          <i class="el-icon-edit-outline"></i>
          <span>拉闸</span>
        </div>
        <div>
          <i class="el-icon-edit-outline"></i>
          <span>合闸</span>
        </div>
        <div>
          <i class="el-icon-edit-outline"></i>
          <span>报警</span>
        </div>
        <div>
          <i class="el-icon-edit-outline"></i>
          <span>取消报警</span>
        </div>
        <div>
          <i class="el-icon-edit-outline"></i>
          <span>保电</span>
        </div>
        <div>
          <i class="el-icon-edit-outline"></i>
          <span>取消保电</span>
        </div>
        <div>
          <i class="el-icon-edit-outline"></i>
          <span>读状态</span>
        </div>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="showTableData"
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
            <el-form-item  v-for="(item,index) in tableHead" v-if="index > 8" :label="item.label" >
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
        v-for="(item,index) in tableHead"
        v-if="index <= 8"
        :label="item.label"
        :prop="item.id"
      >
      </el-table-column>

    </el-table>


      <!-- <span class="demonstration">显示总数</span> -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="total, prev, pager, next,jumper"
      :total="partOfTableData.length">
    </el-pagination>


  </div>
</template>
<script>
  export default{
    data(){
      return{

        loading:false,//菊花

        tableHead:[
          {
            label:'表地址',
            id:'MeterAddr'
          },
          {
            label:'房间信息',
            id:'HouseName',
          },
          {
            label:'安装地址',
            id:'InstallAddr'
          },
          {
            label:'倍率',
            id:'CT'
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
            id:'BalanceStatu',
          },
          {
            label:'阀控状态',
            id:'RelayStatu'
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
            label:'读取金额状态时间',
            id:'BalanceStatuTime',
          },
          {
            label:'读取阀控状态时间',
            id:'RunStatusTime'
          },
          {
            label:'费率1电价',
            id:'R1'
          },
          {
            label:'费率2电价',
            id:'R2'
          },
          {
            label:'费率3电价',
            id:'R3'
          },
          {
            label:'费率4电价',
            id:'R4'
          },
          {
            label:'集中器地址',
            id:'LogicAddr'
          }
        ],
        tableData:[],

        partOfTableData:[],

        showTableData:[],

        currentPage:1,//当前页数

        selectionData:[],

        requestCount:0,//多个表读状态的时候进行的计数
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
      //表格选择项发生变化
      //data是选择项组成的数组
      handleSelectionChange(data){

      },
      //分页器页数发生变化
      handleCurrentChange(index){

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

  .right{
    float: right;
    div {
      margin-left: 20px;
      font-size: 14px;
      cursor: pointer;
      display: inline-block
    }
  }

  .condition{
    overflow: hidden
  }

  .el-pagination{
    margin-top: 20px;
    text-align: center;
  }





</style>
