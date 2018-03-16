<template>
    <div class="nav">
      <div class="item">
        <div class="icoImgWrap">
          <i class="ico iconfont icon-diantai"></i>
        </div>
        <h5 class="text">私人FM</h5>
      </div>

      <div class="item">
        <div class="icoImgWrap">
          <i class="ico iconfont icon-iconset0209"></i>
        </div>
        <h5 class="text">每日推荐</h5>
      </div>

      <div class="item">
        <div class="icoImgWrap">
          <i class="ico iconfont icon-swticonyinle2"></i>
        </div>
        <h5 class="text">歌单</h5>
      </div>
      <div class="item">
        <div class="icoImgWrap">
          <i class="ico iconfont icon-paixingbang"></i>
        </div>
        <h5 class="text">排行榜</h5>
      </div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style scoped lang="less"  rel="stylesheet/less">
  @import "~common/less/base";
  .nav{
    display: flex;
    width:100%;
    height:60px;
    padding:8px 0;
    border-bottom:1px solid @hui;
    .item{
      flex:1;
      text-align: center;
      .icoImgWrap{
        width:30px;
        height:30px;
        border: 1px solid @color;
        border-radius: 50%;
        margin:0 auto;
        .ico{
          /*position: absolute;*/
          /*left:50%;*/
          /*top:50%;*/
          /*transform: translate3d(-50%,-50%,0);*/
          display: block;
          transform: translateY(50%);
          color:@color;
        }
      }
      .text{
        font-size: 12px;
        margin-top:10px;
        color:black;
      }
    }
  }
</style>
