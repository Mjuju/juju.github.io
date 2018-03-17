<template>
  <div v-show="showMusic">
    <div class="music" ref="music">
      <div class="background">
        <img :src="datas.al.picUrl" alt="">
      </div>
      <div class="top">
        <i @click="back" class="back icon iconfont icon-iconback"></i>
        <h1 class="title">{{datas.name}}</h1>
        <h2 class="username">{{datas.ar.name}}</h2>
      </div>

      <div @click="currentview" v-if="currentView" class="middle">
        <div class="middle-l">
          <div class="wrapper_cd">
            <div class="cd play" :class="play?'':'paused'">
              <img :src="datas.al.picUrl" alt="">
            </div>
          </div>
        </div>
      </div>
      <div  @click="currentview" v-else class="lyric" ref="lyricList">
        <ul ref="lyricWrap">
          <li v-for="(item,index) in lyric" v-html="item.s" v-if="lyric" :data-time="item.t" :class="index==flag?'yellow':''"></li>
        </ul>
      </div>

      <div class="bottom">
        <div class="progress-wrapper">
          <span class="time time-l">{{currentTime}}</span>
          <div class="progress-bar-wrapper">
            <div class="progress-bar">
              <div class="bar-inner" ref="banInner" @click="progressChange">
                <div class="progress" ref="progress"></div>
                <div class="progress-btn-wrapper" ref="pBtnWrapper">
                  <div class="progress-btn"></div>
                </div>
              </div>
            </div>
          </div>
          <span class="time time-r">{{duration}}</span>
        </div>
        <div class="constrl">
          <div class="left icon iconfont icon-48shangyishou" @click="isPrev"></div>
          <div class="center icon iconfont" :class="play?'icon-bofang':'icon-bofang1'" @click="switchBtn"></div>
          <div class="right icon iconfont icon-49xiayishou" @click="isNext"></div>
        </div>
      </div>

    </div>
    <div class="min-player" @click="showBMusic" ref="minMusic">
      <div class="wrap-avtor">
        <div class="min-bg"><img class="play" :class="play?'':'paused'" :src="datas.al.picUrl" alt=""></div>
        <div class="text-wrap"><div class="text">{{datas.name}}</div></div>
      </div>
      <div class="btn" @click.stop="switchBtn">
        <div class="bc iconfont" :class="play?'icon-bofang':'icon-bofang1'"></div>
        <div class="canvas">
          <cvnProgress :pcurrentTime="pcurrentTime" :pduration="pduration" ></cvnProgress>
        </div>
      </div>
      <div class="iconfont list icon-category" @click.stop="tooglemenu"></div>
    </div>
    <Menu :reveal="reveal" @p-show="pshow" @play-empty="playEmpty"></Menu>
    <audio :src="datas.url" autoplay ref="audio" @play="readyM" @error="error" @timeupdate="updateTime"
           @ended="endM"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {getPlaymusic, getDetail,getLyric} from 'api/playList'
  import {ERR_OK} from 'api/config'
  import Menu from 'components/menu'
  import {Song} from 'common/js/song'
  import cvnProgress from 'components/cvn-progress'

  export default {
    components: {
      Menu,
      cvnProgress
    },
    data() {
      return {
        datas: {
          id: null,
          url: null,
          al: {},
          ar: {},
          name: null
        },
        play: false,
        currentTime: 0,
        duration: 0,
        reveal: false,
        pcurrentTime:0,
        pduration:0,
        currentView:true,
        lyric:[],
        flag:0
      }
    },
    watch: {
      source() {
        let id = this.$store.state.source;
        let newSong = this.song.find(obj => obj.id == id);

        if (newSong) {
          this.datas = newSong
        } else {
          getPlaymusic(id).then(res => {
            if (res.code == ERR_OK) {
              this.datas.url = res.data[0].url;

              getDetail(id).then(res => {
                if (res.code == ERR_OK) {
                  this.datas.al = res.songs[0].al;
                  this.datas.ar = res.songs[0].ar[0];
                  this.datas.name = res.songs[0].name;
                  this.datas.id = id;
                  //歌曲ID同步至数组中
                  this.insertSong(Song(this.datas));
                }
              })
            }
          })
        }

        //获取歌词
        getLyric(id).then(res => {
          if(res.code == ERR_OK) {

            let arr = res.lrc.lyric.split("\n");
            let re = /\[\d*:\d*((\.|\:)\d*)*\]/g;
            let arr1 = [];

            function formatTime(num) {
              num = num.substring(1,num.length - 1);
              let arrTime = num.split(":");
              return (parseFloat(arrTime[0]*60) + parseFloat(arrTime[1])).toFixed(2)
            }

            for(var i=0;i<arr.length;i++) {
              let s = arr[i].match(re)?formatTime(arr[i].match(re)[0]):0;

              arr1.push({
                t:s,
                s:arr[i].slice(arr[i].indexOf("]")+1,arr[i].length)
              })
            }
            this.lyric = arr1.slice(0,arr1.length-1);
          }
        })

        this.currentView = true;
      }
    },
    computed: {
      activeLrc(index){
        return index==this.flag?true:false;
      },
      showMusic() {
        return this.song.length ? true : false;
      },
      ...mapState([
        'song',
        'source',
        'mode'
      ])
    },
    methods: {
      currentview(){
        this.currentView = !this.currentView
      },
      playEmpty() {
        this.$refs.audio.src = "";
        this.showBMusic();
        this.reveal = false;
      },
      pshow() {
        this.reveal = false;
      },
      tooglemenu() {
        this.reveal = true;
      },
      switchBtn() {
        this.play = !this.play;
        if (!this.play) {
          this.$refs.audio.pause();
        } else {
          this.$refs.audio.play();
        }
      },
      readyM(e) {
        this.play = true;
        //设置总时长
        this.duration = this.zero(e.target.duration);
      },
      endM() {
        this.play = false;
        let ArrList = this.song;

        if (this.mode == 'random') {
          this.random();
        } else if (this.mode == 'loop') {
          this.loop();
        } else if (this.mode == "single") {
          this.single();
        }
      },
      isPrev() {
        this.play = false;
        let id = this.$store.state.source;
        let ArrList = this.song;
        if (ArrList.length == 1) {
          this.$refs.audio.currentTime = 0;
          this.$refs.audio.play();
          this.play = true;
        } else {
          let ctIndex = null;
          //获取下一首id
          ArrList.forEach((item, index) => {
            if (item.id == id) {
              ctIndex = index - 1;
            }
          })
          if (ctIndex == -1) {
            ctIndex = ArrList.length - 1;
          }
          this.setSource(ArrList[ctIndex].id);
        }
      },
      isNext() {
        this.loop();
      },
      single() {
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
      },
      loop() {
        this.play = false;
        let id = this.$store.state.source;
        let ArrList = this.song;

        if (ArrList.length == 1) {
          this.$refs.audio.currentTime = 0;
          this.$refs.audio.play();
          this.play = true;
        } else {
          let ctIndex = null;
          //获取下一首id
          ArrList.forEach((item, index) => {
            if (item.id == id) {
              ctIndex = index + 1;
            }
          })
          if (ctIndex == ArrList.length) {
            ctIndex = 0;
          }
          this.setSource(ArrList[ctIndex].id);
        }
      },
      random() {
        let id = this.$store.state.source;
        let ArrList = this.song;
        if (ArrList.length == 1) {
          this.$refs.audio.currentTime = 0;
          this.$refs.audio.play();
          this.play = true;
        } else {
          //随机出一个数来
          do {
            var num = Math.floor(Math.random() * ArrList.length);
          } while (ArrList[num].id == id);
          this.setSource(ArrList[num].id);
        }
      },
      error() {
        console.log('手动清除SRC');
      },
      scrollLyric(ct) {
        for(var i=0;i<this.lyric.length;i++) {
          if(i != this.lyric.length - 1 && ct>=this.lyric[i].t && ct<=this.lyric[i+1].t){
            this.flag = i;
          }
        }

        if(ct >= this.lyric[this.lyric.length - 1].t){
          this.flag = this.lyric.length - 1;
        }

        if(this.flag>4){
          this.$refs.lyricWrap.style.transform = `translate3d(0,${-46*(this.flag-3)}px,0)`
        }
        // this.$refs.lyricWrap.style.transform = `translate3d(0,0,0)`;

      },
      updateTime(e) {
        this.pcurrentTime = e.target.currentTime;
        this.pduration = e.target.duration;
        this.currentTime = this.zero(e.target.currentTime);
        let salc = e.target.currentTime / e.target.duration;
        this.$refs.progress.style.width = this.$refs.banInner.offsetWidth * salc + "px";
        this.$refs.pBtnWrapper.style.left = (this.$refs.banInner.offsetWidth * salc - 8) + "px";

        //滚动歌词
        if(this.lyric.length >1 && !this.currentView){
          this.scrollLyric(this.pcurrentTime)
        }
      },
      zero(time) {
        let cur = parseInt(time);//秒数
        let temp = cur;
        let minute = parseInt(temp / 60);
        if (cur % 60 < 10) {
          return "" + minute + ":0" + cur % 60 + "";
        } else {
          return "" + minute + ":" + cur % 60 + "";
        }
      },
      progressChange(e) {
        let salc = e.offsetX / this.$refs.banInner.clientWidth;
        this.$refs.audio.currentTime = salc * this.$refs.audio.duration;
        this.$refs.progress.style.width = e.offsetX + "px";
        this.$refs.pBtnWrapper.style.left = e.offsetX - 8 + "px";
        this.$refs.audio.play();
      },
      back() {
        this.$refs.music.style.zIndex = -200;
        this.$refs.minMusic.style.zIndex = 999999;
      },
      showBMusic() {
        this.$refs.music.style.zIndex = 200000;
        this.$refs.minMusic.style.zIndex = -100;
      },
      ...mapMutations([
        'setSong',
        'setSource'
      ]),
      ...mapActions([
        'insertSong'
      ])
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "~common/less/base";

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .music {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 20000;
    background: #222;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(10px);
      img {
        width: 100%;
        height:100%;
      }
    }
    .top {
      position: relative;
      margin-bottom: 26px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
        padding: 9px;
        font-size: 22px;
        color: @color;
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 18px;
        color: #fff;
      }
      .username {
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        margin: 0;
      }
    }
    .lyric{
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      overflow: hidden;
      ul{
      transition: all 0.4s;
        li{
          text-align: center;
          line-height: 40px;
          height: 40px;
          margin-bottom: 6px;
          font-size:16px;
          color:white;
          &.yellow {
            color:yellow;
          }
        }
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        margin-top: 20px;
        .wrapper_cd {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
          .play {
            animation: rotate 14s linear infinite;
          }
          .paused {
            animation-play-state: paused;
          }
          .cd {
            position: relative;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 10px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
        .time-l {
          text-align: left;
          margin-right: 6px;
        }
        .time-r {
          text-align: right;
          margin-left: 6px;
        }
        .time {
          color: #fff;
          font-size: 12px;
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;
        }
        .progress-bar-wrapper {
          flex: 1;
          .progress-bar {
            height: 30px;
            .bar-inner {
              position: relative;
              top: 13px;
              height: 4px;
              background: rgba(0, 0, 0, 0.3);
              .progress {
                position: absolute;
                height: 100%;
                background: @color;
              }
              .progress-btn-wrapper {
                position: absolute;
                left: -8px;
                top: -13px;
                width: 30px;
                height: 30px;
                .progress-btn {
                  position: relative;
                  top: 7px;
                  /*left: 7px;*/
                  box-sizing: border-box;
                  width: 16px;
                  height: 16px;
                  border: 3px solid #fff;
                  border-radius: 50%;
                  background: @color;
                }
              }
            }
          }
        }
      }
      .constrl {
        display: flex;
        align-items: center;
        height: 50px;
        .left {
          text-align: right;
          flex: 1;
          color: rgba(255, 255, 255, .5);
          font-size: 30px;
        }
        .center {
          padding: 0 20px;
          text-align: center;
          flex: 1;
          color: rgba(255, 255, 255, .5);
          font-size: 30px;
        }
        .right {
          text-align: left;
          font-size: 30px;
          flex: 1;
          color: rgba(255, 255, 255, .5);
        }
      }
    }
  }

  .min-player {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background: #EAEAEA;
    display: flex;
    z-index: -100;
    .wrap-avtor {
      flex:1;
      display: flex;
      .min-bg {
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
        overflow: hidden;
        padding: 2px 10px;
        img {
          width: 34px;
          height: 34px;
          border-radius: 50%;
        }
        .play {
          animation: rotate 14s linear infinite;
        }
        .paused {
          animation-play-state: paused;
        }
      }
      .text-wrap {
        flex: 1;
        line-height: 40px;
        .text{
          width: 100%;
          height:40px;
          overflow: hidden;
        }
      }
    }
    .btn {
      position: relative;
      flex: 0 0 60px;
      width: 40px;
      .bc{
        position: absolute;
        font-size: 24px;
        width:24px;
        height:24px;
        border-radius: 50%;
        z-index: 10;
        left:50%;
        top:50%;
        transform: translate3d(-50%,-50%,0);
        background: @hui;
      }
      .canvas{
        position: absolute;
        left:50%;
        margin-left:-20px;
        top:0;
        width:40px;
        height:40px;
        border-radius: 50%;
        z-index: 9;
      }
    }
    .list {
      flex: 0 0 40px;
      width: 40px;
      line-height: 40px;
      font-size: 24px;
    }
  }
</style>
