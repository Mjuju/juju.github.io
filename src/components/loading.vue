<template>
  <div class="loading">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
    export default {
    }
</script>

<style scoped lang="less"  rel="stylesheet/less">
  .loading{
    width: 80px;
    height: 40px;
    margin: 0 auto;
    span{
      display: inline-block;
      width: 8px;
      height: 100%;
      border-radius: 4px;
      background: lightgreen;
      -webkit-animation: load 1.04s ease infinite;
    }
  }
  @-webkit-keyframes load{
    0%,100%{
      height: 40px;
      background: lightgreen;
    }
    50%{
      height: 60px;
      margin-top: -20px;
      background: lightblue;
    }
  }
  .loading span:nth-child(2){
    -webkit-animation-delay:0.13s;
  }
  .loading span:nth-child(3){
    -webkit-animation-delay:0.26s;
  }
  .loading span:nth-child(4){
    -webkit-animation-delay:0.39s;
  }
  .loading span:nth-child(5){
    -webkit-animation-delay:0.52s;
  }
</style>
