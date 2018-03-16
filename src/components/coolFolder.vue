<template>
  <transition  name="fade">
    <div class="coolFolder" >
    <div class="title">
      <div class="back iconfont icon-back" @click="coolShow"></div>
      <span>收藏夹</span>
    </div>
    <div class="list"  ref="slid">
      <ul class="song" v-if="songs">
        <li v-for="item in songs" v-if="item" >
          <div class="avtor" >
            <img v-lazy="item.picUrl" alt="" >
          </div>
          <div class="left">
            <div class="name">{{item.name}}</div>
            <div class="songMusic">{{item.musicName}}</div>
          </div>
          <div class="right iconfont icon-bofang1" @click="onplay(item.id)"></div>
        </li>
      </ul>
    </div>
  </div>
  </transition>
</template>

<script>
  import {getDetail} from 'api/playList'
  import {getOfflLine} from 'common/js/cache'
  import {ERR_OK} from 'api/config'
  import BScroll from 'better-scroll'
  import  {mapMutations} from 'vuex'

    export default {
        data(){
          return {
            songs:[],
            songArr:[]
          }
        },
        watch:{
          songs() {
            if(!this.Bscroll){
              this.initBScroll()
            }else {
              this.$nextTick(function() {
                this.Bscroll.refresh();
              })
            }
          }
        },
        created(){
          this._getDetail()
        },
        mounted(){
        },
        computed:{
        },
        methods:{
          onplay(id) {
            //更改数据源
            this.setSource(id);
          },
          _getDetail(){
            //获取歌曲的详细信息

            this.songArr = getOfflLine();
            if(!this.songArr) return;
            this.songArr.forEach( (item,index) => {
              getDetail(item).then( res => {
                if( res.code == ERR_OK) {
                  let obj = {
                    id:res.songs[0].id,
                    name:res.songs[0].name,
                    musicName:res.songs[0].ar[0].name,
                    picUrl:res.songs[0].al.picUrl
                };
                  //这里的数据数异步获取回来的,那么想要保证按照数组的顺序来而已使用$set方法
                  this.$set(this.songs,index,obj)
                }
              })
            })
          },
          initBScroll() {
            this.Bscroll = new BScroll(this.$refs.slid,{
              scrollY:true,
              click:true
            })
          },
          coolShow() {
            this.$emit("back-cool")
          },
          ...mapMutations([
            'setSource'
          ])
        }
    }
</script>

<style scoped lang="less"  rel="stylesheet/less">
    @import "~common/less/base";

    .fade-enter-active, .fade-leave-active{
      transition: all 0.6s;
      transform-origin:  0 0;
      opacity: 1;
    }
    .fade-enter, .fade-leave-to{
      transform-origin:  0 0;
      transform: scale(0);
      opacity: 0;
    }

    .coolFolder {
      position: fixed;
      left:0;
      top:0;
      right:0;
      bottom:0;
      background:#ccc;
      z-index:8888;
      .title{
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size:20px;
        .back{
          position: absolute;
          left:0;
          top:0;
          width:40px;
          height:40px;
        }
      }
      .list{
        position: absolute;
        left:0;
        top:40px;
        bottom: 0;
        right:0;
        background:#f5f6f7;
        overflow: hidden;
        z-index:909090909090909;
        .song{
          width:100%;
          li{
            height:60px;
            display: flex;
            border-bottom: 1px solid @hui;
            .avtor{
              flex: 0 0 60px;
              padding: 4px;

              img{
                width:100%;
                height:100%;
              }
            }
            .left{
              display: flex;
              flex:1;
              height:100%;
              flex-direction: column;
              width: 0;
              .name,.songMusic{
                flex:1;
                width:100%;
                display: flex;
                align-items: center;
                .htext;
              }
            }
            .right{
              flex:0 0 60px;
              height:100%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size:20px;
            }
          }
        }
      }
    }
</style>
