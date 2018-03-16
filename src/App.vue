<template>
  <div id="app">
      <myheaders></myheaders>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <player></player>
  </div>
</template>

<script>
  import myheaders from 'components/myheader'
  import Player from 'components/player'
export default {
  name: 'App',
  components:{
    myheaders,
    Player
  }
}
</script>

<style>
</style>
