<template>
    <div class="netwMusic">
      <tab></tab>
    </div>
</template>

<script type="text/ecmascript-6">
    import Tab from 'components/tab'
    export default {
      components:{
        Tab
      },
      activated() {       //解决了父路由切换后,子路由戴来的缓存问题
        this.$router.push({path:'/netwMusic/music'})
      }
    }
</script>

<style scoped lang="less"  rel="stylesheet/less">
  .netwMusic{
    position: absolute;
    top:54px;
    left:0;
    bottom:0;
    right:0;
    background:red;
  }
</style>
