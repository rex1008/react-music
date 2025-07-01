export function getCount(count) {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + "万";
  } else {
    return Math.floor(count / 10000000) / 10 + "亿";
  }
}

export function getSizeImage(imgUrl, size) {
  return `${imgUrl}?param=${size}x${size}`
}

export function formatDate(time, fmt) {
  let date = new Date(time);

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};

export function formatMonthDay(time) {
  return formatDate(time, "MM月dd日");
}

export function formatMinuteSecond(time) {
  return formatDate(time, "mm:ss");
}

export function getPlaySong(id) {
  //return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
  if (id === 167876) {
    return "https://er-sycdn.kuwo.cn/e276774b833790ea705cafe1aa2f78c1/68640ce8/resource/30106/trackmedia/M500001wPVuM2m2Vto.mp3"
  } else if (id === 411214279) {
    return "https://m704.music.126.net/20250702013057/9063399341df302d577c28bf430667cd/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/28481684897/91af/f1ab/2d5c/ed65b4e2771bae7fdc247dda34f2d2fa.mp3?vuutv=2GSqIaQL5/v8A7UvfgIlDQQdwT2jEpfQUjGmiLRaZ3y7AcRnST21agTPrBfs+xPO/6qZVoVvnJNAiQXK7utZ4pXYf35mCRWylGHjh3ht8VQ=&authSecret=00000197c6f3d11d04d80a3b194f436c"
  } else if (id === 2711834126) {
    return "https://music.163.com/song/media/outer/url?id=2711834126"
  } else if (id === 2712753039) {
    return "https://music.163.com/song/media/outer/url?id=2712753039"
  }
}