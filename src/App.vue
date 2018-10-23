<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

  .el-table{
    margin-top: 20px;
    text-align: center;
  }

  .el-table .color-row {
    background: #f0f9eb;
    padding: 0;
  }

  .demo-table-expand {
    font-size: 0;
    display: flex;
    flex-wrap: wrap;
  }
  .demo-table-expand label {
    width: 130px;
    color: #99a9bf;
    margin-left: 40px
  }
  .demo-table-expand .el-form-item {
    margin: 0;
    width: 45%;
    text-align: left;
  }

  .el-table__expanded-cell[class*=cell]{
    padding: 0 50px;
  }

</style>
