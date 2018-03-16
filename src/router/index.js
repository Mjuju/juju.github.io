import Vue from 'vue'
import Router from 'vue-router'
import LocaMusic from 'components/locaMusic'
import NetwMusic from 'components/netwMusic'
import Music from 'components/music'
import Search from 'components/search'
import MusicVideo from 'components/musicvideo'
import playList from 'components/playList'

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      redirect:'/locaMusic'//默认首页跳转页面
    },
    {
      path: '/locaMusic',
      component: LocaMusic
    },
    {
      path: '/netwMusic',
      component: NetwMusic,
      children:[
        { path: 'music',
          component: Music,
          children:[{
            path:':id',
            component: playList
           }
          ]
        },
        {
          path: 'search',
          component: Search
        },
        {
          path: 'musicvideo',
          component: MusicVideo
        }
      ]
    }
  ]
})
