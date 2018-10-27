<!--月冻结-->
<template>
  <div>
    <div class="condition">
      <el-date-picker
        v-model="startMonth"
        type="month"
        placeholder="开始日期">
      </el-date-picker>
      <span>至</span>
      <el-date-picker
        v-model="endMonth"
        type="month"
        placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary" size="medium" @click="getMonthPageList">查询</el-button>
    </div>
    <div class="tableMessage" v-loading="loading">
      <el-table
        ref="multipleTable"
        :data="message"
        :header-cell-style="tableHeadStyle"
        :cell-style="tableRowStyle"
        stripe
        border
        style="width: 100%">

        <el-table-column type="expand" width="30">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand" >
              <el-form-item  v-for="(item,index) in messageName" v-if="index > 6" :label="item.label" >
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
          v-if="index <= 6"
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
  </div>
</template>

<script>
  export default {
    data(){
      return{
        loading:false,
        currentPage:1,
        totalLength:0,
        message:[
          //楼栋
          //房间
          //资产编号
          //表底示值_总
          //日用电量
          //冻结时间
          //抄表时间
          //表底示值_尖
          //表底示值_峰
          //表底示值_平
          //表底示值_谷
          //日用电量_尖
          //日用电量_峰
          //日用电量_平
          //日用电量_谷
        ],
        messageName:[
          {
            label:'房间信息',
            id:'FifthHouseRegionName',
          },
          {
            label:'月结时间',
            id:'FreezeMonth',
          },
          {
            label:'月用电总量',
            id:'MonthPowerTotal',
          },
          {
            label:'结算日时间',
            id:'FreezeDate',
          },
          {
            label:'结算日总值',
            id:'FreezeTotal',
          },
          {
            label:'结算日时间',
            id:'LastFreezeDate',
          },
          {
            label:'上结算日总值',
            id:'LastFreezeTotal',
          },
          {
            label:'集中器地址',
            id:'LogicAddr',
          },
          {
            label:'表计地址',
            id:'MeterAddr',
          },
          {
            label:'结算日值_尖',
            id:'Freeze1',
          },
          {
            label:'结算日值_峰',
            id:'Freeze2',
          },
          {
            label:'结算日值_平',
            id:'Freeze3',
          },
          {
            label:'结算日值_谷',
            id:'Freeze4',
          },
          {
            label:'上结算日值_尖',
            id:'LastFreeze1',
          },
          {
            label:'上结算日值_峰',
            id:'LastFreeze2',
          },
          {
            label:'上结算日值_平',
            id:'LastFreeze3',
          },
          {
            label:'上结算日值_谷',
            id:'LastFreeze4',
          },
          {
            label:'月用电量_尖',
            id:'MonthPower1',
          },
          {
            label:'月用电量_峰',
            id:'MonthPower2',
          },
          {
            label:'月用电量_平',
            id:'MonthPower3',
          },
          {
            label:'月用电量_谷',
            id:'MonthPower4',
          }
        ],
        startMonth:'',
        endMonth:'',
      }
    },
    mounted(){
      this.startMonth = this.timeFormat3(new Date())
      this.endMonth = this.timeFormat2(new Date())
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
        this.getMeterStateList()
      },

      //月冻结数据
      getMonthPageList:function () {
        var token = window.sessionStorage.getItem('token')

        var params = {
          userId:window.sessionStorage.getItem('userId'),
          dateBegin:this.timeFormat2(this.startMonth) ,
          dateEnd:this.timeFormat2(this.endMonth),
          pageIndex:this.currentPage,
          pageSize:10,
        }

        console.log(params)
        this.loading = true

        this.http.get(this.api.baseUrl + this.api.getMonthPageList,params,token)
          .then(result=>{
            this.loading = false
            console.log(result)
            if (result.msg == 'success') {
              this.message = result.page
              this.totalLength = result.recordes
            }else{
              this.$message.error(result.msg)
            }
          })
      }

    },
  }
</script>

<style scoped lang='scss'>

  .condition{
    .el-button{
      margin-left: 20px;
    }
  }

  .el-pagination{
    margin-top: 20px;
    text-align: center;
  }
</style>
