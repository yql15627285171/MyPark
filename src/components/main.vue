<template>
  <div class="wrap">
    <el-container>
      <el-header >
        <div class="header-left" >社区物联</div>
        <div class="header-right" >
          <router-link to="/main/choseLists">
            <el-tooltip  effect="dark" content="返回首页" placement="bottom">
              <span class="fa fa-home" ></span>
            </el-tooltip>
          </router-link>
          <router-link to="/">
            <el-tooltip  effect="dark" content="退出登录" placement="bottom">
              <span class="fa fa-logout" style="font-size: 26px"></span>
            </el-tooltip>
          </router-link>
        </div>
      </el-header>
      <el-main >

        <div class="navigator">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in breadcrumbItems"  :to="{name:item.name}">{{item.label}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>


        <transition name="custom-classes-transition"
                    mode="out-in"
                    enter-active-class="animated  zoomIn"
                    >
         <keep-alive>
            <router-view @clickLists="addRoute"></router-view>
         </keep-alive>
        </transition>

      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          breadcrumbItems:[
            { label: '主页',name:'choseLists'},
          ],
          // transitionName:'moveTop'
        }
      },
      mounted(){
        console.log(this.$route.name)
      },
      activated(){
        console.log('取消')
        this.breadcrumbItems.splice(1,this.breadcrumbItems.length)
      },
      watch:{
        $route(to,from){
          if (to.path == '/main/choseLists'){
            this.breadcrumbItems=[
              { label: '主页',name:'choseLists'},
            ]
            // this.transitionName = ''
          }

        }
      },
      methods:{
        //回调
        addRoute:function (breadcrumbItem) {
          this.breadcrumbItems.push(breadcrumbItem)
        },

        //删除tag事件
        handleClose(tag) {
          this.tags.splice(this.tags.indexOf(tag), 1);
        },

      },

    }
</script>

<style scoped lang='scss'>
  .wrap{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
  }

  .el-container{
    height: 100%;
  }

  .el-header, .el-footer {
    background-color: #242a2f;
    color: #fff;
    text-align: center;
    line-height: 60px;
    .header-left{
      float: left;
      margin-left: 20px;
      font-size: 26px;
    }
    .header-right{
      float: right;
      margin-right: 20px;

      .fa{
        font-size: 30px;
        cursor: pointer;
        outline: none;
        color: #ffffff;
      }
    }
  }

  .el-main{
    min-height: calc(100% - 120px);
    padding: 0;
    position: relative;
    background-color: #fff;

    .navigator{
      /*margin:20px 0 0 20px;*/
      padding: 20px 0 0 20px;
    }
  }

  .moveTop-enter-active, .moveTop-leave-active {
    transition: all .5s;
  }
  .moveTop-enter, .moveTop-leave-to {
    /*opacity: 0;*/
    /*transform: scale(0);*/
    transform: translateY(-100px) scale(0)
  }


</style>
