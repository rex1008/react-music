const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric (lyricString) {
  const lines = lyricString.split("\n")

  const lyricArr = []
  for (const line of lines) {
    if (line) {
      const result = parseExp.exec(line)
      if (!result) {// 不符合 [00:02.29]你怎么回忆我  这样的歌词行格式的，直接忽略
        continue
      }
      const time1 = result[1] * 60 * 1000
      const time2 = result[2] * 1000
      const time3 = result[3].length === 3 ? result[3]*1 : result[3]*10
      const time = time1 + time2 + time3
      const lyric = line.replace(parseExp, "").trim()
      const lineObj = {time, lyric}
      lyricArr.push(lineObj)
    }
  }
  return lyricArr
}