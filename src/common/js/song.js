/**
 * Created by Administrator on 2018/2/25.
 */

//添加一个歌曲对象
export function Song({id,url,al,ar,name}) {
    let obj = {
    id:id,
    url:url,
    al:al,
    ar:ar,
    name:name
  };

  return obj
}
