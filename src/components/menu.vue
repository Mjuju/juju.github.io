<template>
  <div class="menu" ref="menu" v-show="reveal" @click="fadeout">
    <div class="menuWrap">
      <div class="top">
        <div class="mode"><span @click.stop="toogleMode">{{playMode}}({{song.length}})</span></div>
        <div class="Collection" @click.stop="deletes" >清空收藏</div>
        <div class="deleteAll iconfont icon-delete" @click.stop="delArrSong()"></div>
      </div>
      <div class="content" ref="scroll">
        <ul>
          <li class="song" v-for="(item,index) in song">
            <span @click.stop="playSource(item.id)">{{item.name}}-{{item.ar.name}}</span>
            <div class="Collection iconfont icon-xin" ref="colles" @click.stop="collect(item.id,$event)"></div>
            <div class="deleteAll iconfont icon-iconset0127"  @click.stop="deleteSong(index)"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState,mapMutations} from "vuex"
  import BScroll from 'better-scroll'
  import {addOfflLine,AllremoveLine,searchoffLine,deleteoffLine,getOfflLine} from 'common/js/cache'
  export default {
    props: {
      reveal: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        state:["随机播放","列表循环","单曲循环"],
        modeState:["random","loop","single"]
      }
    },
    computed:{
      playMode() {
        if(this.mode == "random") {
          return this.state[0]
        }else if(this.mode == "loop") {
          return this.state[1]
        }else if(this.mode == "single") {
          return this.state[2]
        }
      },
      ...mapState([
        'song',
        'mode'
      ])
    },
    mounted(){
      this._initScroll()
    },
    watch:{
      song(){
        var that = this;
        setTimeout(function() {
          //浏览器的每次渲染大概为16-20ms

          that.Bscroll.refresh()
        },20);

        this.$nextTick(function() {
          //等待dom更新后,执行
          this.song.forEach((item,index) => {
            if(searchoffLine(item.id)){
              //由于vue采用的是虚拟dom,实际的dom并没有更新,可能会产生bug

              this.$refs.colles[index].classList.add("cLove")
            }else {
              this.$refs.colles[index].classList.remove("cLove")
            }
          })
        })

      }
    },
    methods:{
      deletes(){
        AllremoveLine()
      },
      collect(id,event){
        //利用事件对象下的currentTarget找到执行对象

        //检索是否有无
        if(searchoffLine(id)){
          //如有已经有了
          deleteoffLine(id)
          event.currentTarget.classList.remove("cLove")

        }else {

          //如果没有的话,歌曲添加进收藏列表
          addOfflLine(id,this.song);
          event.currentTarget.classList.add("cLove")
        }

      },
      _initScroll(){
        this.Bscroll = new BScroll(this.$refs.scroll,{
          scrollY:true,
          click:true,
          bounce: false
        })
      },
      playSource(id) {      //点击切换歌曲
        this.setSource(id);
      },
      delArrSong() {    //清空所有歌曲
        this.spliceSong([]);
        this.$emit("play-empty")
      },
      deleteSong(index) {     //删除掉歌曲列表中歌曲
        let songArr = this.song;

        songArr.splice(index,1);

        if(songArr.length == 0) {
          this.$emit("play-empty");
        }
        this.spliceSong(songArr)
      },
      toogleMode(){
        var index;
        this.modeState.find((value,ind) => {
          if(this.mode == value) {
            index = ind + 1;
            if(index == this.modeState.length) {
              index = 0;
            }
          }
        });
        //改变播放模式
        this.setMode(this.modeState[index])
      },
      fadeout(){
        this.$emit("p-show")
      },
      ...mapMutations([
        'setMode',
        'spliceSong',
        'setSource'
      ])
    }
  }
</script>

<style scoped lang="less"  rel="stylesheet/less">
  @import "~common/less/base";
  .menu{
    position: fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    background: rgba(0,0,0,.6);
    z-index:100000000;
    .menuWrap{
      position: absolute;
      bottom:0;
      width:100%;
      height:50%;
      background:white;
      .top{
        width:100%;
        height:40px;
        font-size:0;
        line-height: 40px;
        border-bottom:1px solid @hui;
        .mode{
          width:60%;
          height: 40px;
          text-align: left;
          display:inline-block;
          font-size:14px;
          span{
            display: inline-block;
            padding: 0 10px;
          }
        }
        .Collection {
          width:20%;
          height:40px;
          display:inline-block;
          font-size:14px;
          text-align: center;
        }
        .deleteAll{
          width:20%;
          height:40px;
          display:inline-block;
          font-size:14px;
          text-align: center;
        }
      }
      .content {
        position: absolute;
        top:40px;
        bottom:0;
        left:0;
        right:0;
        background: @hui;
        overflow: hidden;
        .song{
          width:100%;
          display: flex;
          height:28px;
          line-height:28px;
          border-bottom:1px solid blanchedalmond;
          span{
            width:60%;
            padding-left:10px;
            .htext
          }
          .Collection {
            width:20%;
            text-align: center;
          }
          .cLove{
            color:#FF9797;
          }
          .deleteAll{
            width:20%;
            text-align: center;
          }
        }
      }
    }
  }
</style>
