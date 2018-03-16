import axios from 'axios';
import jsonp from 'common/js/jsonp';

export  function getSearch(str) {
  return axios.get(`http://localhost:3000/search?keywords=${str}`)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    });
}

// export  function getHotKey() {
  // return jsonp('https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&uin=0&needNewCode=1&platform=h5&_=1521004217962',{
  //   param:"jsonod",
  //   prefix:"huang"
  // },function(data) {
  //   // console.log(data);
  // })
  // jsonp
// }

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&_=1521004217962'

  const options = {
    param:'jsonpCallback'
  };
  const data = Object.assign({},{
    platform:'h5',
    uin:0,
    needNewCode:1,
  });
  return jsonp(url,data,options)
}
