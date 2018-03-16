<template>
  <div>
    <div class="tab">
      <router-link tag="div" to="/netwMusic/music" class="music" ><span>音乐</span></router-link>
      <router-link tag="div" to="/netwMusic/musicvideo" class="musicvideo"><span>视频</span></router-link>
      <router-link tag="div" to="/netwMusic/search" class="search"><span>搜索</span></router-link>
    </div>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
    export default {
    }
</script>

<style scoped lang="less"  rel="stylesheet/less">
    @import "~common/less/base";
    .tab{
        display: flex;
        height:38px;
        background:white;
        text-align: center;
        span{
          padding:0 12px 11px;
          line-height: 38px;
          box-sizing: border-box;
        }
        .router-link-active span{
          border-bottom: 1px solid @color;
        }
        .music{
          flex: 1;
        }
        .musicvideo{
          flex:1;
        }
        .search{
          flex:1;
        }
    }
</style>
