import axios from 'axios';

export function getPlayList(url) {       //获取推荐歌单
  return axios.get(`http://localhost:3000/playlist/detail?id=${url}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    });
}

export function getPlaymusic(url) {       //获取推荐单条歌曲
  return axios.get(`http://localhost:3000/music/url?id=${url}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    });
}

export function getDetail(url) {       //获取推荐单条歌曲详情
  return axios.get(`http://localhost:3000/song/detail?ids=${url}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    });
}

export function getLyric(id) {       //获取歌词的详细信息
  return axios.get(`http://localhost:3000/lyric?id=${id}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    });
}
