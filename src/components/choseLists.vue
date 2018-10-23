<template>
  <div class="content-lists" v-loading="loading">
    <template v-for="(item,index) in lists">
      <div class="first-grade-item">
        <div @click="showSecondGradeList(index)" class="first-item">
          <span :class="item.icon"></span>
          <span class="el-label">{{item.name}}</span>
        </div>
      </div>

      <div class="second-grade-item"
           v-if="(index % 5 == 4 || index == lists.length -1) && showSecondGrade[Math.floor(index / 5)]"
            style="margin-top: -5px">
        <transition-group name="list"  tag="div" mode="out-in">
          <div v-for="(child,secondIndex) in secondGradeMessage" v-bind:key="secondIndex" @click="jumpRoute(child.name)">
            {{child.name}}
            <div class="el-icon el-icon-arrow-right" style="float: right"></div>
          </div>
        </transition-group>

      </div>
    </template>
  </div>
</template>

<script>
    import routeName from "../config/routeName";

    export default {
      data(){
        return{
          lists:[{}],
          showSecondGrade:[true,false,false],
          secondGradeMessage:[],//二级列表的内容
          lastIndex:0,//上一次点击一级菜单的序列，从0开始，默认为0
          loading:false,
        }
      },
      mounted(){

        document.getElementsByClassName('first-item')[0].classList.add("activated")
        this.getUserMenuList()
        // this.getAllMenuList()
      },
      methods:{

        //点击一级列表事件
        showSecondGradeList:function (index) {
          // this.$emit('clickLists')
          //二级菜单显示在哪个块
          var bgIndex = Math.floor(index / 5)

          if(index == this.lastIndex){
            //点击的一级列表连续两次都相同,状态取反
            this.showSecondGrade.splice(bgIndex,1,!this.showSecondGrade[bgIndex])
          }else{
            //不相同的时候
            this.showSecondGrade.splice(Math.floor(this.lastIndex / 5),1,false)
            this.showSecondGrade.splice(bgIndex,1,true)
            //设置二级列表内容

            this.secondGradeMessage = []
            console.log(this.lists[index].list)
            setTimeout(_=>{
              this.secondGradeMessage = this.lists[index].list
            },10)

            document.getElementsByClassName('first-item')[this.lastIndex].classList.remove("activated")
            document.getElementsByClassName('first-item')[index].classList.add("activated")

          }

          this.lastIndex = index
        },

        /**
         * 点击二级惨淡跳转路由
         */
        jumpRoute:function(name){
          var routeName = this.getRouteName(name)
          this.$router.push(routeName)

          var params = {
            label:name,
            name:routeName
          }
          this.$emit('clickLists',params)
        },

        /**
         * 获取菜单
         */
        getUserMenuList:function () {
          var token = window.sessionStorage.getItem('token')

          var params = {
            // userId:parseInt(window.sessionStorage.getItem('userId'))
            userId:1
          }
          console.log(params)
          this.loading = true
          this.http.get(this.api.baseUrl + this.api.getUserMenuList,params,token)
            .then(result=>{
              this.loading = false
              console.log(result)
              if (result.msg == 'success') {
                this.lists = result.menuList
                if (window.sessionStorage.getItem('userType') != '5'){
                  this.lists.shift()
                }
                this.secondGradeMessage = this.lists[0].list
              }else{
                this.$message.error(result.msg);
              }
            })
        },


      }
    }
</script>

<style scoped lang='scss'>

  /*点击或者鼠标经过的样式*/
  .activated{
    color:#409EFF;
    .fa{
      font-size: 45px;
    }
    .el-label{
      font-size: 16px;
    }

  }

  .content-lists{
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;

    .first-grade-item{
      width: 20%;
      div{
        height: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 10px 0;
        .fa{
          font-size: 40px;
        }
        .el-label{
          font-size: 14px;
        }
        &:hover{
          @extend .activated
        }
      }

    }

    .second-grade-item{
      width: 100%;
      background-color: #f0f0f0;
      padding: 20px 8%;

      div{
        display: flex;
        flex-wrap: wrap;
        width: 90%;

        div{
          width: 23%;
          margin: 0 10px;
          height: 50px;
          line-height: 50px;
          padding-left: 20px;
          display: inline-block;
          div{
            color: #f0f0f0;
          }
          &:hover{
            background-color: #fff;
            div{
              color: black;
            }

          }
        }
      }

    }

  }

  /*二级菜单的动画*/
  .list-enter-active{
    transition: all 1s;
  }
  /*.list-leave-active{*/
  /*transition: all 0s;*/
  /*}*/
  .list-enter, .list-leave-to {
    opacity: 0;
  }

</style>
