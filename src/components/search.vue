<template>
  <div class="search">
      <div class="searchWrap">
        <i class="iconfont icon-sousuo icon_1"></i>
        <input type="text" class="text" placeholder="搜索歌曲,歌手,专辑" v-model="speech">
        <i class="iconfont icon-shanchu icon_2" v-show="data.length" @click="deleteData"></i>
      </div>
      <div class="sh_hot">
        <div class="title">热门搜索</div>
        <ul class="lexicon">
          <li v-for="item in hotkey" v-if="hotkey.length" @click="replace(item.k)">{{item.k}}</li>
        </ul>
      </div>
      <div class="search-list" v-show="data.length" ref="silder">
        <ul>
          <li class="item" v-for="item in data" @click="onplay(item.id)">
            <i class="iconfont icon-icon_add"></i>
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
      <div class="history"></div>
  </div>
</template>

<script>
  import {getSearch,getHotKey} from 'api/search'
  import {ERR_OK} from 'api/config'
  import BScroll from 'better-scroll'
  import  {mapMutations} from 'vuex'
    export default {
      data(){
        return {
          speech:"",
          data: [],
          hotkey:[]
        }
      },
      watch:{
        speech(){
          var that = this;
          setTimeout(function() {
            that._getSearch();
          },300)

          if(this.Bscroll){
            this.$nextTick(function() {
              this.Bscroll.refresh()
            })
          }else{
            this.initBScroll();
          }
        }
      },
      created(){
        this._getHotKey();
      },
      methods:{
        onplay(id) {
          //更改数据源
          this.setSource(id);
        },
        initBScroll(){
          this.Bscroll = new BScroll(this.$refs.silder,{
            scrollY:true,
            click:true
          })
        },
        _getSearch() {
          getSearch(this.speech).then( res => {
            if(res.code == ERR_OK) {
              this.data = res.result.songs;
              console.log(this.data);
            }
          })
        },
        _getHotKey(){
          getHotKey().then(res => {

            this.hotkey = res.data.hotkey;
            this.hotkey.length = 10;
            console.log(this.hotkey);
          })
        },
        replace(str){
          this.speech = str;
        },
        deleteData(){
          //清空搜索框
          this.data = [];
          this.speech = "";
        },
        ...mapMutations([
          'setSource'
        ])
      }
    }
</script>

<style scoped lang="less"  rel="stylesheet/less">
  @import "~common/less/base";
  .search{
    position: absolute;
    left:0;
    top:38px;
    bottom:0;
    right:0;
    background:#fcfcfd;
    .searchWrap{
      position:relative;
      padding:10px;
      height:40px;
      border-bottom: 1px solid @hui;
      .icon_1{
        position: absolute;
        left:8px;
        top:14px;
        font-size: 28px;
      }
      .icon_2{
        position: absolute;
        right:16px;
        top:16px;
        font-size: 20px;
      }
      .text{
        width:100%;
        height:34px;
        padding:0 24px;
        background: #ebecec;
        box-sizing: border-box;
        border-radius: 12px;
        outline: none;
      }
    }
    .sh_hot{
      padding:0 10px;
      .title{
        padding:10px 0;
        font-size:12px;
        color:#666;
      }
      .lexicon{
        li{
          float: left;
          padding:10px 16px;
          border-radius: 14px;
          background: white;
          border:1px solid @hui;
          margin:0 10px 10px 0;
          color:black;
        }
      }
    }
    .search-list{
      position: absolute;
      left:0;
      top:61px;
      width: 100%;
      height:100%;
      background:#fcfcfd;
      overflow: hidden;
      .item{
        height:40px;
        padding: 0 10px;
        display: flex;
        border-bottom: 1px solid @hui;
        i{
          flex-basis:30px;
          display: flex;
          align-items: center;
        }
        p{
          flex: 1;
          line-height: 40px;
          .htext;
        }
      }
    }
  }
</style>
