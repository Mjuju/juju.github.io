<template>
  <transition name="slide">
    <div ref="slides" class="wrap">
      <div ref="reSilder" class="playlist" v-if="lists.length != 0">
      <div class="header">
        <div class="playBg" :style="{backgroundImage:`url(${lists.coverImgUrl})`}"></div>
        <div class="playWrap">
          <div class="hd-left">
            <img :src="lists.coverImgUrl" alt="">
            <span class="lsthd_icon">歌单</span>
            <div class="online-num"><i class="icon-erji iconfont"></i>{{toFixed(lists.playCount)}}万</div>
          </div>
          <div class="hd-right">
            <h2 class="hd-title">{{lists.name}}</h2>
            <div class="avtor" >
              <img  :src="lists.creator.avatarUrl" alt="">
              {{lists.creator.nickname}}
            </div>
          </div>
        </div>
        <div class="back iconfont icon-iconback" @click="back"></div>
      </div>
      <div class="info">
        <div class="tag">
          标签：
          <em v-for="item in lists.tags">{{item}}</em>
        </div>
        <div class="u-intor">
            <div class="f-brk" :class="{'line-there':line}">
              <span v-for="(cc,index) in TransDepict(lists.description)">{{index==0?'简介:':''}}{{cc}}<br/></span>
            </div>
            <span class="intro_arrow iconfont" :class="[line?'icon-moreunfold1':'icon-shangjiantou']" @click="tooglClass()"></span>
        </div>
      </div>
      <div class="playSelect">
        <h3>歌曲列表</h3>
        <ul class="songs">
          <li class="song" v-for="(data,index) in lists.tracks">
              <div class="text-fl">{{index+1}}</div>
              <div class="text-fr">
                <div class="sgich_tl">
                  <div class="sgich_tl1 htext">{{data.name}}</div>
                  <div class="sgich_info htext">{{data.artists[0].name}}-{{data.album.name}}</div>
                </div>
                <div class="sgich_tr iconfont icon-bofang1" @click="onplay(data.id)" ></div>
              </div>
          </li>
        </ul>
      </div>
    </div>

      <div class="mloading" v-else>
        <Loading></Loading>
      </div>
   </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getPlayList,getPlaymusic} from 'api/playList'
  import {ERR_OK} from 'api/config'
  import  Loading from 'components/loading'
  import BScroll from 'better-scroll'
  import  {mapMutations,mapState} from 'vuex'
    export default {
      components:{
        Loading
      },
      data(){
        return {
          lists:[],
          flag:true,
        }
      },
      created(){
        this._getPlayList();
      },

      watch:{
        lists() {
          this.$nextTick(function() {
            this.initBScroll();
            if(this.song.length != 0) {
              this.$refs.reSilder.style.paddingBottom = 40 + "px";
              this.$nextTick(function() {
                this.Bscroll.refresh()
              })
            }
          })
        },
        song() {
          if(this.song.length != 0) {
            this.$refs.reSilder.style.paddingBottom = 40 + "px";
            this.$nextTick(function() {
              this.Bscroll.refresh()
            })
          }else {
            this.$refs.reSilder.style.paddingBottom = 0 + "px";
          }
        }
      },
      computed:{
        line(){
          return this.flag
        },
        ...mapState([
          'song'
        ])
      },
      methods:{
        initBScroll() {
          this.Bscroll = new BScroll(this.$refs.slides,{
            scrollY:true
          })
        },
        onplay(id) {
          //更改数据源
          this.setSource(id);
        },
        back(){
          this.$router.back()
          this.$emit('mshow')
        },
        tooglClass(){
          this.flag = !this.flag;
        },
        _getPlayList(){   //获取页面数据
          let Id = this.$store.state.playRecId;
          getPlayList(Id).then(res => {
            if(res.code == ERR_OK) {
              let that = this;
              setTimeout(function () {
                that.lists = res.result
              },100)
            }
          })
        },
        toFixed(num) {
          return (num / 10000).toFixed(1);
        },
        TransDepict(str){
          let arr= [];
          if(str){
              arr = str.split("\n");
          }
          return arr
        },
        ...mapMutations([
          'setSource'
        ])
      }

    }
</script>

<style scoped lang="less"  rel="stylesheet/less">
  @import "~common/less/base";
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
  }
  .mloading {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wrap{
    position: fixed;
    left:0;
    top:0;
    bottom: 0;
    right: 0;
    z-index: 250;
    background: #F8F8F8;
  }
  .playlist{
    width:100%;
    .header{
      position: relative;
      padding: 30px 10px 30px 15px;
      overflow: hidden;
      .back{
        position: absolute;
        left:10px;
        top:8px;
        width:20px;
        height:20px;
        color:#ccc;
        z-index:10;
      }
      .playBg{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
        filter: blur(20px);
        transform: scale(1.5);
      }
     .playWrap{
       position: relative;
       display:flex;
       z-index:2;
       .hd-left{
         position: relative;
         width: 114px;
         height: 114px;
         background-color: #e2e2e3;
         img{
           width: 100%;
         }
         .lsthd_icon{
           position: absolute;
           z-index: 3;
           top: 10px;
           left: 0;
           padding: 0 8px;
           height: 17px;
           color: #fff;
           font-size: 9px;
           text-align: center;
           line-height: 17px;
           background-color: rgba(217,48,48,.8);
           border-radius: 0 17px 17px 0;
         }
         .online-num{
           position: absolute;
           right:4px;
           top:0;
           color:white;
           font-size:12px;
         }
       }
       .hd-right{
         flex: 1 1 auto;
         width: 1%;
         margin-left: 16px;
         color: #fefefe;
         .hd-title{
           padding-top: 1px;
           font-size: 17px;
           line-height: 1.3;
           height: 44px;
         }
         .avtor{
           position: relative;
           margin-top: 20px;
           .htext;
           img{
             width: 30px;
             height: 30px;
             border-radius: 50%;
             margin-right: 5px;
             vertical-align: middle;
           }
         }
       }
     }

    }
    .info{
      position: relative;
      margin: 0 10px 0 15px;
      padding-top: 10px;
      line-height: 19px;
      color: #666;
      .tag{
        margin-bottom: 10px;
        line-height: 20px;
        margin-right: -10px;
        em{
          padding:4px 6px;
          margin-right:6px;
          background:rgba(0,0,0,.1);
          border-radius: 8px;
          font-style: normal;
        }
      }
      .u-intor{
        position: relative;
        padding-bottom: 18px;
        line-height: 19px;
        color: #666;
        .f-brk{
          word-wrap: break-word;
          word-break: break-all;
          white-space: normal;
          span{
            font-size:14px;
          }
        }
        .line-there {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .intro_arrow{
          position: absolute;
          bottom: 3px;
          right: 0;
          z-index: 3;
          width: 15px;
          height: 15px;
        }
      }
    }
    .playSelect{
        h3{
          height: 23px;
          line-height: 23px;
          padding: 0 10px;
          font-size: 12px;
          color: #666;
          background-color: #eeeff0
        }
        .songs{
          .song{
            display: flex;
            .text-fl{
              flex: 0 0 40px;
              align-items: center;
              justify-content: center;
              width: 40px;
              font-size: 17px;
              display:flex;
              color: #999;
            }
            .text-fr{
              flex: 1;
              display: flex;
              .sgich_tl{
                padding: 6px 0;
                width: 0;
                flex: 1 1 auto;
                .sgich_tl1{
                  font-size: 17px;
                }
                .sgich_info{
                  font-size: 12px;
                  color: #888;
                  margin-top:4px;
                }
              }
              .sgich_tr{
                font-size:20px;
                padding: 0 10px;
                width: 22px;
                height: 22px;
                display: flex;
                height:100%;
                justify-content: center;
                align-items: center;
                color:#aaa;
              }
            }
          }
        }
    }
  }
</style>
