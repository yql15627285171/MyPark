<template>
    <div class="wrap" v-loading="loading">
      <div class="bottom" :class="{ clear:isClear }">
        <div class="wrapForm">
          <div class="form">
            <h1 class="title">
              智慧物联管理
            </h1>
            <el-input v-model.trim="name" placeholder="请输入姓名"></el-input>
            <el-input v-model.trim="password" placeholder="请输入密码" type='password'></el-input>
            <el-button type="primary" size="large" @click="login" >登 录</el-button>
          </div>
        </div>
      </div>
      <transition name="bounce">
        <div class="logo" @click="showLogin" v-if="showLogo">
          <img src="../assets/logo.png" alt="">
        </div>
      </transition>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          isClear:false,
          showLogo:true,
          name:'', // 用户名
          password:'',// 密码
          loading:false,
        }
      },
      mounted(){

      },
      methods:{
        showLogin:function () {
          this.isClear = true
          this.showLogo = false
        },

        login:function () {
          var token = window.sessionStorage.getItem('token')
          var params = {
            username:this.name,
            password:this.password,
          }
          this.loading = true
          this.http.get(this.api.baseUrl + this.api.sysLogin,params,token)
            .then(result=>{
              this.loading = false
              console.log(result)
              if(result.msg == 'success'){
                //记录子菜单列表
                window.sessionStorage.setItem('token',result.token)
                window.sessionStorage.setItem('userId',result.userId)
                window.sessionStorage.setItem('userType',result.userType)
                this.$router.push('main')
              }else{
                this.$message.error(result.msg);
              }
            })
        }

      }

    }
</script>

<style scoped lang="scss">
  .wrap{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .bottom{

    background: url('../assets/log_bg.jpg') no-repeat ;
    background-size:100% 100%;
    height: 100%;

    filter: blur(10px);
    -webkit-filter: blur(10px);
    -moz-filter: blur(10px);
    -ms-filter: blur(10px);
    -o-filter: blur(10px);
  }

  .clear{
    animation: vagueToClear 1s linear;
    /* Firefox: */
    -moz-animation: vagueToClear 1s linear;
    /* Safari 和 Chrome: */
    -webkit-animation: vagueToClear 1s linear;
    /* Opera: */
    -o-animation: vagueToClear 1s linear;
    animation-fill-mode: forwards;
  }

  .wrapForm{
    width: 600px;
    margin: 0 auto;
    padding-top: 100px;
  }

  .form{
    width: 300px;
    height: 400px;
    margin: 100px auto;
    padding-top: 30px;
    text-align: center;
  }

  .title{
    font-size: 30px;
    color: #fff;
    margin-bottom: 10px;
  }

  .logo{
    position: absolute;
    z-index: 100;
    top:calc(50% - 150px);
    left: calc(50% - 50px);
    width: 100px;
    height: 100px;
  }

  .el-input{
    margin-top: 20px;
  }
  .el-button{
    width: 100%;
    margin-top: 30px;
  }

  /*logo动画*/
  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  /*动画*/
  @keyframes vagueToClear {
    from{
      filter: blur(10px);
      -webkit-filter: blur(10px);
      -moz-filter: blur(10px);
      -ms-filter: blur(10px);
      -o-filter: blur(10px);
    }

    to{
      filter: blur(0);
      -webkit-filter: blur(0);
      -moz-filter: blur(0);
      -ms-filter: blur(0);
      -o-filter: blur(0);
    }
  }
  @-moz-keyframes vagueToClear {
    from{
      filter: blur(10px);
      -webkit-filter: blur(10px);
      -moz-filter: blur(10px);
      -ms-filter: blur(10px);
      -o-filter: blur(10px);
    }

    to{
      filter: blur(0);
      -webkit-filter: blur(0);
      -moz-filter: blur(0);
      -ms-filter: blur(0);
      -o-filter: blur(0);
    }
  }
  @-webkit-keyframes vagueToClear {
    from{
      filter: blur(10px);
      -webkit-filter: blur(10px);
      -moz-filter: blur(10px);
      -ms-filter: blur(10px);
      -o-filter: blur(10px);
    }

    to{
      filter: blur(0);
      -webkit-filter: blur(0);
      -moz-filter: blur(0);
      -ms-filter: blur(0);
      -o-filter: blur(0);
    }
  }
  @-o-keyframes  vagueToClear{
    from{
      filter: blur(10px);
      -webkit-filter: blur(10px);
      -moz-filter: blur(10px);
      -ms-filter: blur(10px);
      -o-filter: blur(10px);
    }


    to{
      filter: blur(0);
      -webkit-filter: blur(0);
      -moz-filter: blur(0);
      -ms-filter: blur(0);
      -o-filter: blur(0);
    }
  }

</style>
