<template>
  <div class="column">
    <span class="bLeft"></span>
    <strong>推荐歌单<i class="iconfont icon-more column-more"></i></strong>
  </div>
</template>

<script>
    export default {
    }
</script>

<style scoped lang="less"  rel="stylesheet/less">
  @import "~common/less/base";

  .column {
    width:100%;
    height:18px;
    padding:8px 0;
    display: flex;
    .bLeft{
      width:2px;
      height:16px;
      background:@color;
      margin-right:10px;
    }
    strong{
      font-size:14px;
      line-height: 16px;
      .column-more{
        color:#ccc;
      }
    }
  }

</style>
