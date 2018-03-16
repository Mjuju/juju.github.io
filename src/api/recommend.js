import axios from 'axios';
import jsonp from 'jsonp'

export function getBanner() {       //获取首页banner
  return axios.get('http://127.0.0.1:3000/banner')
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    });
}

export function getRecList() {       //获取推荐歌单
  return axios.get('http://127.0.0.1:3000/personalized')
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    });
}

