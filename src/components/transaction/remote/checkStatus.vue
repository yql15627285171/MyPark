<!--远程充值查询状态-->
<template>
    <div v-loading="loading">
      <div class="condition">
        <el-form label-width="100px">
          <el-form-item label='栋/街/层：' style="height: 20px">
            <el-select v-model="choseBuild"
                       filterable
                       clearable
                       placeholder="请选择"
                       @change="buildingChange"
                       size="medium">
              <el-option
                v-for="item in buildings"
                :key="item.building"
                :label="item.building"
                :value="item.building">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='房间号：' style="height: 20px">
            <el-select v-model="choseHouse"
                       filterable
                       clearable
                       placeholder="请选择"
                       size="medium"
                       @change="houseNoChange">
              <el-option
                v-for="item in houseNos"
                :key="item.id"
                :label="item.houseNo"
                :value="item.houseNo">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" size="medium" @click="queryRechargeState">查询</el-button>
        </div>
      </div>
      <div class="message">
        <div class="title">*当前信息</div>
        <el-form label-width="100px">
          <div style="display: flex;">
            <el-form-item label='用户：' style='width:300px;height:30px'>
              <span>{{username}}</span>
            </el-form-item>

            <el-form-item label="资产号：" style='width:300px;height:30px'>
              <span>{{assetsCode}}</span>
            </el-form-item>
          </div>
          <div style="display: flex;">
            <el-form-item label='剩余金额：' style='width:300px;height:30px'>
              <span>{{currState.RemainMoney}}</span>
            </el-form-item>

            <el-form-item label="余额状态：" style='width:300px;height:30px'>
              <span>{{currState.BalanceStatu}}</span>
            </el-form-item>
          </div>
          <div style="display: flex;">
            <el-form-item label='阀控状态：' style='width:300px;height:30px'>
              <span>{{currState.RelayStatu}}</span>
            </el-form-item>

            <el-form-item label="抄读时间：" style='width:300px;height:30px'>
              <span>{{currState.RemainMoneyTime}}</span>
            </el-form-item>
          </div>
        </el-form>
      </div>

      <div class="lastOperation">
        <div class="title">*上次操作</div>
        <el-form label-width="100px">
            <el-form-item label='操作：' style='height:30px'>
              <span>{{LastRecord.Name}}</span>
            </el-form-item>
            <el-form-item label="金额：" style='height:30px'>
              <span>{{LastRecord.Money}}</span>
            </el-form-item>
            <el-form-item label='时间：' style='height:30px'>
              <span>{{LastRecord.Time}}</span>
            </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
      // props:{
      //   currState:{
      //     type: Object,
      //     // 对象或数组默认值必须从一个工厂函数获取
      //     default: function () {
      //       return {}
      //     }
      //   },//当前状态
      //   LastRecord:{
      //     type: Object,
      //     // 对象或数组默认值必须从一个工厂函数获取
      //     default: function () {
      //       return {}
      //     }
      //   }//上一次记录
      // },
      data(){
        return{
          loading:false,
          areaForm:{
            building:'',
            houseNo:'',
          },
          buildings:[],
          houseNos:[],
          choseBuild:'',
          choseHouse:'',

          username:'',//当前用户
          assetsCode:'',//资产编号
          // currState:{},
          // LastRecord:{},
        }
      },
      mounted(){
        this.getBuildings()
        console.log(this.$store)
      },
      computed:{
        currState(){
          return this.$store.state.currState
        },
        LastRecord(){
          return this.$store.state.LastRecord
        }
      },
      watch:{

      },
      methods:{

        /**
         * 重置查询状态的值
         */
        resetStatus:function(){
          this.username = ''
          this.assetsCode = ''
          this.$store.dispatch('setCurrState',{})
          this.$store.dispatch('setLastRecord',{})
        },

        /**
         * 查询状态
         */
        queryRechargeState:function(){

          var token = window.sessionStorage.getItem('token')
          var params = {
            userId:window.sessionStorage.getItem('userId'),
            building:this.choseBuild,
            houseNo:this.choseHouse
          }
          console.log(params)

          this.loading = true
          this.http.get(this.api.baseUrl + this.api.queryRechargeState,params,token,110000)
            .then(result=>{
              this.loading = false
              console.log(result)
              if (result.msg == 'success') {
                this.username = result.username
                this.assetsCode = result.assetsCode
                this.$store.dispatch('setCurrState',result.currState)
                this.$store.dispatch('setLastRecord',result.LastRecord)
                this.$emit('getCardType',result.CardType,this.choseBuild,this.choseHouse)
              }else{
                this.$message.error(result.msg)
              }
            })

        },

        /**
         * 获取栋街层列表
         */
        getBuildings:function(){
          this.getBuildingList().then(result=>{
            this.buildings = result.page
          })
        },

        /**
         * 获取对应的房间
         */
        getHouses:function () {
          console.log(this.choseBuild)
          this.getHouseByBuilding(this.choseBuild).then(result=>{
            this.houseNos = result.page
            console.log(result)
          })
        },

        buildingChange:function (value) {
          this.houseNos = []
          this.choseHouse = ''
          if (value != ''){
            this.getHouses()
          }
          this.resetStatus()
          this.$emit('resetdisabled')

        },
        houseNoChange:function (value) {
          this.resetStatus()
          this.$emit('resetdisabled')
        }
      }
    }
</script>

<style scoped lang='scss'>

  .condition{
    margin-left: 200px;
    margin-top: 20px;
    width: 500px;
    .el-select{
      width: 300px;
    }
    .el-input{
      width: 300px;
    }
    .el-button{
      margin-top: 20px;
      width: 200px;
      margin-left: 120px;
    }
  }

  .lastOperation,
  .message{
    margin-left: 200px;
    margin-top: 20px;

    .title{
      color:#409EFF;
      font-size: 16px;
      margin-bottom: 20px;
    }
  }

</style>
