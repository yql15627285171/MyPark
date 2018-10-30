<!--充值记录-->
<template>
  <div class="wrap">
    <div class="condition">
      <el-date-picker
        v-model="startDate"
        type="date"
        placeholder="开始日期">
      </el-date-picker>
      <span>至</span>
      <el-date-picker
        v-model="endDate"
        type="date"
        placeholder="结束日期">
      </el-date-picker>
      <!--<el-select  placeholder="交易方式" clearable>-->
      <!--</el-select>-->
      <!--<el-select  placeholder="交易类型" clearable>-->
      <!--</el-select>-->
      <!--<el-select  placeholder="审核状态" clearable>-->
      <!--</el-select>-->
      <el-button type="primary" size="medium" @click="getRechargeRecord">查询</el-button>
    </div>
    <div class="tableMessage" v-loading="loading">
      <el-table
        :data="message"
        :header-cell-style="tableHeadStyle"
        :cell-style="tableRowStyle"
        stripe
        border
        style="width: 100%">

        <el-table-column type="expand" width="30">
          <template slot-scope="props">
            <el-form label-position="left" inline>
              <el-form-item  v-for="(item,index) in messageName" v-if="index > 8" :label="item.label" >
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
          v-if="index <= 8"
          :label="item.label"
          :prop="item.id">
        </el-table-column>

        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.AuditState == '未审核' " @click="AuditTransaction(scope.row)" type="text" size="small">审核</el-button>
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
          currentPage:1,//当前页数
          totalLength:1,
          message:[],
          messageName:[
            {
              label:'栋/街/层',
              id:'building',
            },
            {
              label:'房间号',
              id:'houseNo',
            },
            {
              label:'交易类型',
              id:'TransactionType',
            },
            {
              label:'交易金额',
              id:'TransactionAmount',
            },
            {
              label:'交易路径',
              id:'TransactionMode',
            },
            {
              label:'交易方式',
              id:'TransactionMethod',
            },
            {
              label:'交易时间',
              id:'TransactionTime',
              width:180
            },
            {
              label:'交易状态',
              id:'OprtState',
            },
            {
              label:'审核状态',
              id:'AuditState',
            },
            {
              label:'表地址',
              id:'MeterAddr'
            },
            {
              label:'备注信息',
              id:'Memo'
            },
            {
              label:'交易单号',
              id:'TransactionOrder',
            },
            {
              label:'第三方订单号',
              id:'OtherTransactionOrder'
            },
            {
              label:'审核人',
              id:'AuditorName'
            },
            {
              label:'审核时间',
              id:'AuditTime'
            }
          ],
          startDate:'',
          endDate:'',
        }
      },
      mounted(){
        var nowTime = new Date()
        var startTime = new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 2)
        this.endDate = this.timeFormat1(nowTime)
        this.startDate = this.timeFormat1(new Date(startTime))
        this.getRechargeRecord()
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

        //分页器页数发生变化
        handleCurrentChange(index){

        },

        //查询交易记录
        getRechargeRecord:function () {
          var token = window.sessionStorage.getItem('token')

          var params ={
            userId:window.sessionStorage.getItem('userId'),
            dateBegin:this.timeFormat1(this.startDate),
            dateEnd:this.timeFormat1(this.endDate),
            pageIndex:this.currentPage,
            pageSize:10
          }
          this.loading = true
          console.log(params)
          this.http.get(this.api.baseUrl + this.api.getRechargeRecord,params,token)
            .then(result=>{
              console.log(result)
              this.loading = false
              if (result.msg == 'success') {
                this.message = result.page
                this.totalLength = result.recordes
              }else{
                this.$message.error(result.msg);
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


    .el-select{
      width: 120px;
    }
  }

  .el-pagination{
    margin-top: 20px;
    text-align: center;
  }


</style>
