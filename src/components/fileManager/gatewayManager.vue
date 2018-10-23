<!--网关管理-->
<template>
    <div class="wrap">
      <div class="condition">
        <el-input
          v-model.trim="queryConAssetsCode"
          placeholder="请输入资产编号"
          prefix-icon="el-icon-search"
          size="medium">
        </el-input>
        <el-button type="primary" size="medium" @click="">查询</el-button>
        <el-button type="primary" size="medium" @click="showAddDialog">新增</el-button>
      </div>
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
          loading:false,
          currentPage:1,
          totalLength:1,
          queryConAssetsCode:'',//查询的资产编号
          message:[
            {
              ConAssetsCode:1,
              LogicAddr:1,
              InstallAddr:1,
              UseStatus:1,
              InstallTime:1,
              SIM:1,
              FactoryName:1,
              SoftVer:1,
              HardVer:1
            }
          ],
          messageName:[
            {
              label:'资产编号',
              name:'ConAssetsCode',
            },
            {
              label:'逻辑地址',
              name:'LogicAddr',
            },
            {
              label:'安装地址',
              name:'InstallAddr',
            },
            {
              label:'状态',
              name:'UseStatus',
            },
            {
              label:'安装时间',
              name:'InstallTime',
            },
            {
              label:'SIM卡号',
              name:'SIM',
            },
            {
              label:'厂家名',
              name:'FactoryName',
            },
            {
              label:'软件版本',
              name:'SoftVer',
            },
            {
              label:'硬件版本',
              name:'HardVer',
            }
          ],

        }
      },

      mounted(){},
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
         * 点击新增按钮
         */
        showAddDialog:function () {

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

  /*.myForm{*/

    /*.el-input{*/
      /*width: 300px;*/
    /*}*/
    /*.el-select{*/
      /*width: 300px;*/
    /*}*/
  /*}*/

  .el-pagination{
    margin-top: 20px;
    text-align: center;
  }

</style>
