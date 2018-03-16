<template>
    <div class="recList">
      <column></column>
      <div class="recWrap">
        <div class="content" v-for="(item,index) in recList"   @click="getPlayLists(item.id)">
          <div class="bg">
            <img v-lazy="item.picUrl" alt="">
            <div class="online-num"><i class="icon-erji iconfont"></i>{{toFixed(item.playCount)}}万</div>
          </div>
          <p class="text">{{item.name}}</p>
        </div>
      </div>
    </div>
</template>

<script>
  import Column from 'components/column'
  import {getRecList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {mapMutations} from 'vuex'

  export default {
    components: {
      Column
    },
    data() {
      return {
        recList:[]
      }
    },
    created(){
      this._getRecList();
    },
    methods:{
      getPlayLists(url){
        this.ics(url);
        this.$router.push({
          path:`/netwMusic/music/${url}`
        })

        //通知父组件被点击了
        this.$emit('select-type')
      },
      _getRecList() {
          getRecList().then(res => {
            if(res.code == ERR_OK) {
              this.recList = res.result;
              // this.recList.length = 6;
            }
          })
      },
      toFixed(num) {
        return (num / 10000).toFixed(1);
      },
      ...mapMutations([
        'ics'
      ])
    }
  }
</script>

<style scoped lang="less"  rel="stylesheet/less">
  @import "~common/less/base";
  .recList{
    width:100%;
    .recWrap{
      width:100%;
      display: flex;
      flex-wrap: wrap;
      div.content:nth-child(3n) {
         margin-right:0;
      }
      .content{
        min-width: 98px;
        min-height:150px;
        font-size:12px;
        flex:1;
        margin-right: 4px;
        .bg{
          position: relative;
          width:100%;
          img{
            width:100%;
          }
          .online-num{
            position: absolute;
            right:4px;
            top:0;
            color:white;
            font-size:12px;
          }
        }
        .text{
          overflow:hidden;
          text-overflow: ellipsis;
          display:-webkit-box;
          -webkit-line-clamp:2;
          -webkit-box-orient:vertical;
          padding: 6px 2px 0px 6px;
          line-height: 1.2;
          font-size: 13px;
          margin-bottom:2px;
          font-size:12px;
        }
      }
    }
  }
</style>
