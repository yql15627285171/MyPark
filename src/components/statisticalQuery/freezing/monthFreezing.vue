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
            label:'栋/街/层',
            id:'building',
          },
          {
            label:'房间信息',
            id:'houseNo',
          },
          {
            label:'资产编号',
            id:'deviceid',
          },
          {
            label:'表底示值_总',
            id:'fp1',
          },
          {
            label:'月用电量',
            id:'p',
          },
          {
            label:'冻结时间',
            id:'settlementdate1'
          },
          {
            label:'抄表时间',
            id:'month'
          },
          {
            label:'表底示值_尖',
            id:'fp11'
          },
          {
            label:'表底示值_峰',
            id:'fp12'
          },
          {
            label:'表底示值_平',
            id:'fp13'
          },
          {
            label:'表底示值_谷',
            id:'fp14'
          },
          {
            label:'月用电量_尖',
            id:'p1'
          },
          {
            label:'月用电量_峰',
            id:'p2'
          },
          {
            label:'月用电量_平',
            id:'p3'
          },
          {
            label:'月用电量_谷',
            id:'p4'
          }
        ],
        startMonth:'',
        endMonth:'',
      }
    },
    mounted(){
      this.startMonth = this.timeFormat3(new Date())
      this.endMonth = this.timeFormat2(new Date())

      this.getMonthPageList()
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
