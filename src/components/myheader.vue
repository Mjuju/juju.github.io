<template>
  <div class="header">
    <div class="entry iconfont icon-category"></div>
    <div class="operate">
      <router-link tag="div" class="tab-link locaMusic iconfont icon-yinyue" to="/locaMusic"></router-link>
      <router-link tag="div" class="tab-link netwMusic iconfont icon-iconset04100" to="/netwMusic"></router-link>
    </div>
  </div>
</template>

<script>
    export default {
    }
</script>

<style scoped lang="less"  rel="stylesheet/less">
  @import "~common/less/base";
  .header {
    position: relative;
    width:100%;
    height:54px;
    background:@color;
    color:white;
    .entry{
      position: absolute;
      font-size:26px;
      width:54px;
      height:54px;
    }
    .entry.icon-category:before {
      position: absolute;
      left:15px;
      top:10px;
    }
    .operate{
      width:80px;
      margin:0 auto;
      display: flex;
      height:100%;
      .tab-link{
        padding-top:10px;
        width:40px;
        height:44px;
        font-size:26px;
        font-weight: normal;
        color:rgba(255,255,255,.5);
      }
      .tab-link.router-link-active{
        color:rgba(255,255,255,1);
      }
      .netwMusic{
        margin-left: 20px;
      }
    }
  }
</style>
