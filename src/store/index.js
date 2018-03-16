import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playRecId: 11,
    song: [],
    source: null,
    mode:'random'
  },
  getters: {},
  mutations: {
    ics(state, id) {
      state.playRecId = id;
    },
    SET_SONG(state, newAarr) {
      state.song = newAarr;
    },
    setSource(state, id) {
      console.log(id);
      state.source = id;
    },
    setMode(state,str){
      state.mode = str;
    },
    spliceSong(state,arrSong){    //替换掉song数组
      state.song = arrSong;
    }
  },
  actions: {
    insertSong({commit, state}, obj) {   //新增歌曲进song
      let newAarr = state.song;
      let flag = false;
      newAarr.forEach(function (e) {
        if ((e.id != undefined) && e.id == obj.id) {
          flag = true;
        }
      });
      if(!flag){
      newAarr.push(Object.assign(obj,{flag: newAarr.length}));
      commit('SET_SONG', newAarr)
      }
      console.log(state.song);
    }
  }
})
