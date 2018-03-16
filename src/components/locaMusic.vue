<template>
  <div class="locaMusic">
    <div class="locaSets">
      <div class="locaSet">
        <div class="dico iconfont icon-yinyue"></div>
        <div class="text">本地音乐 <span>(2)</span></div>
      </div>
      <div class="locaSet">
        <div class="dico iconfont icon-iconset04100"></div>
        <div class="text">歌单列表 <span>({{song.length}})--真数据</span></div>
      </div>
      <div class="locaSet">
        <div class="dico iconfont icon-download"></div>
        <div class="text">下载管理 <span>(0)</span></div>
      </div>
      <div class="locaSet">
        <div class="dico iconfont icon-tianjia"></div>
        <div class="text">我的电台 <span>(0)</span></div>
      </div>
      <div class="locaSet">
        <div class="dico iconfont icon-icon-user"></div>
        <div class="text">我的收藏 <span>(0)</span></div>
      </div>
    </div>
    <div class="found">
      <div class="iconfont icon-moreunfold dico"></div>
      <div class="text"><span>创建的歌单</span>(1)</div>
    </div>
    <div class="colls" @click="show">
      <div class="coll" >
        <div class="coll_img"><div class="mask"></div><img src="../common/image/imgDefault.png"></div>
        <div class="content" >
          <div class="text">我喜欢的音乐</div>
          <div class="num">收藏集锦</div>
        </div>
      </div>
    </div>
    <cool-folder v-if="flag" @back-cool="backCool"></cool-folder>
  </div>
</template>

<script>
  import  {mapState} from 'vuex'
  import CoolFolder from 'components/coolFolder'
    export default {
      data() {
        return {
          flag:false
        }
      },
      components:{
        CoolFolder
      },
      computed:{
        ...mapState([
          'song'
        ])
      },
      methods:{
        show() {
          this.flag = true
        },
        backCool() {
          this.flag = false
        }
      }
    }
</script>

<style scoped lang="less"  rel="stylesheet/less">
  @import "~common/less/base";
  .locaMusic{
    position: absolute;
    top:54px;
    left:0;
    bottom:0;
    right:0;
    background:white;
    .locaSets{
      width:100%;
      .locaSet {
        display: flex;
        height:40px;
        .dico{
          flex: 0 0 39px;
          font-size:24px;
          padding:6px 0 0 15px;
          color:@color;
        }
        .text{
          flex: 1;
          border-bottom:1px solid @hui;
          font-size:14px;
          padding-top:10px;
          color:black;
          span{
            font-size:12px;
            color: #8699a4;
          }
        }
      }
    }
    .found{
      display: flex;
      width:100%;
      height:22px;
      background:@hui;
      line-height:22px;
      .dico{
        flex: 0 0 12px;
        font-size:12px;
        color:@hui;
        padding:0 15px;
        color:black;
      }
      .text{
        flex:1;
        font-size:12px;
        color:black;
      }
    }
    .coll{
      display: flex;
      margin-top:4px;
      .coll_img{
        position: relative;
        flex: 0 0 55px;
        padding-left:10px;
        img{
          width:55px;
          height:55px;
        }
        .mask{
          position: absolute;
          left:10px;
          top:0;
          width:55px;
          height:55px;
          background:rgba(0,0,0,.5);
        }

      }
      .content{
        flex: 1;
        display: flex;
        justify-content:space-around;
        flex-direction: column;
        margin-left:10px;
        font-size:14px;
        color:black;
        .num{
          font-size:12px;
          color:@hui;
        }
      }
    }
  }
</style>
