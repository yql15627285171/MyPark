<!--档案管理-->
<template>
  <div class="wrap" v-loading="loading">
    <div class="condition">
      <el-input
        v-model.trim="queryName"
        placeholder="请输入社区名"
        prefix-icon="el-icon-search"
        size="medium">
      </el-input>
      <el-button type="primary" size="medium" @click="getCommunityList(1,10,queryName)">查询</el-button>
      <el-button type="primary" size="medium" @click="showAddDialog">新增</el-button>
    </div>
    <!--弹框显示新增操作-->
    <el-dialog title="增加社区" :visible.sync="dialogFormVisible">
      <el-form label-width="100px">
        <el-form-item label="省">
          <el-select v-model="province" placeholder="请选择" size="medium">
            <el-option
              v-for="item in provinces"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="市">
          <el-select v-model="city" placeholder="请选择" size="medium">
            <el-option
              v-for="item in citys"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区">
          <el-select v-model="district" placeholder="请选择" size="medium">
            <el-option
              v-for="item in districts"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="社区">
          <el-input v-model.trim="communityName" size="medium"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAddOrUpdate">确 定</el-button>
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
          prop="communityName"
          label="社区名">
        </el-table-column>
        <el-table-column
          prop="province"
          label="省">
        </el-table-column>
        <el-table-column
          prop="city"
          label="市">
        </el-table-column>
        <el-table-column
          prop="district"
          label="区">
        </el-table-column>
        <el-table-column
          label="操作">
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
                       @click="deleteCommunityInfo(scope.row)">
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
  import area from '../../config/area'
  export default {
    data(){
      return{
        loading:false,
        dialogFormVisible:false,//是否弹框
        currentPage:1,
        queryName:'',//查询的社区名
        message:[],
        totalLength:1,//总数据长度
        province:'',//选择的省份
        city:'',
        district:'',
        communityName:'',
        id:'',//修改社区的id
        provinces:[],//省份数据源
        citys:[],
        districts:[],
        operationType:'add',//是添加还是修改的操作

      }
    },
    mounted(){
      this.provinces = area.filter(function (element) {
        return element.depth  == '1'
      })

    //  获取社区列表
      this.getCommunityList()
    },
    watch:{
      province:function (newValue) {

        if (newValue == "北京" || newValue == "上海" ||
          newValue == "天津" || newValue == "重庆"){
          this.city = newValue
          this.citys = []
        }else{
          this.city = ''
          var nodeId = area.find(element=>{
            return element.name == newValue
          }).id

          this.citys = area.filter(element=>{
            return element.parentid == nodeId
          })

        }


      },
      city:function (newValue) {
        this.district = ''

        var nodeId = area.find(element=>{
          return element.name == newValue
        }).id
        this.districts = area.filter(element=>{
          return element.parentid == nodeId
        })
      }
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

      //分页控制器页数发生变化
      handleCurrentChange:function(val){
        this.getCommunityList(val,10,this.queryName)
      },

      /**
       * 点击修改，弹出框
       */
      showDialog:function(data){
        this.dialogFormVisible = true
        this.operationType = 'update'
        this.province = data.province
        //因为省市区的修改，会在watch中清空子区域，所以要稍稍延时赋值
        setTimeout(_=>{
          this.city = data.city
        },10)
        setTimeout(_=>{
          this.district = data.district
        },20)

        this.communityName = data.communityName
        this.id = data.id
      },

      /**
       * 点击添加，弹出框
       */
      showAddDialog:function(){
        this.dialogFormVisible = true
        this.operationType = 'add'
        this.province = ''
        this.city = ''
        this.district = ''
        this.communityName = ''
      },

      /**
       * 点击确认，进行修改还是添加
       */
      sureAddOrUpdate:function(){
        if (this.operationType == 'add'){
          this.saveOrUpdateCommunityInfo(this.api.saveCommunityInfo)
        } else if (this.operationType == 'update') {
          this.saveOrUpdateCommunityInfo(this.api.updateCommunityInfo,this.id)
        }
      },

      /**
       *获取所有社区
       * comm_name 模糊查询的条件 值为空的时候是查询所有
       */
      getCommunityList:function(pageIndex=1,pageSize=10,comm_name=''){
        var token = window.sessionStorage.getItem('token')

        var params = {
          comm_name:comm_name,
          pageIndex:pageIndex,
          pageSize:pageSize
        }
        this.loading = true
        this.http.get(this.api.baseUrl + this.api.getCommunityList,params,token)
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
       * 添加或者修改社区
       */
      saveOrUpdateCommunityInfo:function (urlName,id='') {
        if (this.province == '' || this.city == ''
          || this.district=='' || this.communityName == ''){
          this.$message.warning('请填写好资料');
        } else{

          var token = window.sessionStorage.getItem('token')
          var params = {
            province:this.province,
            city:this.city,
            district:this.district,
            communityName:this.communityName,
            id:'',
          }
          this.dialogFormVisible = false
          this.loading = true
          this.http.post(this.api.baseUrl+urlName,params,token)
            .then(result=>{
              this.loading = false
              console.log(result)
              if(result.msg == 'success'){
                this.$message.success('添加成功');
                this.getCommunityList(this.currentPage,10,this.queryName)

              }else{
                this.$message.warning(result.msg);
              }
            })
        }

      },

      /**
       * 删除社区
       */
      deleteCommunityInfo:function (data) {
        this.$confirm('此操作将永久社区, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //点击确定
          var token = window.sessionStorage.getItem('token')
          var params = {
            ids:data.id
          }
          this.http.get(this.api.baseUrl + this.api.deleteCommunityInfo,params,token)
            .then(result=>{
              console.log(result)
              if (result.msg == 'success') {
                this.$message.success('删除成功');
                this.getCommunityList(this.currentPage,10,this.queryName)
              }else{
                this.$message.error(result.msg);
              }
            })

        }).catch(() => {
          //点击取消
        });

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

