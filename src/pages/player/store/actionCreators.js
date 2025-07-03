import { getLyric, getSongDetail } from '../../../services/player'

import * as actionTypes from './constants'

import { getRandomNumber } from '../../../utils/math-utils'
import { parseLyric } from '../../../utils/parse-lyric'

export const changeIsFirstOpenAction = (isFirstOpen) => ({
  type: actionTypes.CHANGE_IS_FIRST_OPEN,
  isFirstOpen
})

const changeCurrentSongAction = (currentSong) => {
  return {
    type: actionTypes.CHANGE_CURRENT_SONG,
    currentSong
  }
}

const changePlayListAction = (playList) => ({
  type: actionTypes.CHANGE_PLAY_LIST,
  playList
})

const changeCurrentSongIndexAction = (currentSongIndex) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  currentSongIndex
})

const changeLyricAction = lyricArr => ({
  type: actionTypes.CHANGE_LYRIC,
  lyricArr
})

export const changePlayStrategyAction = playStrategy => ({
  type: actionTypes.CHANGE_PLAY_STRATEGY,
  playStrategy
})

export const changeCurrentLyricRowIndexAction = currentLyricRowIndex => ({
  type: actionTypes.CHANGE_CURRENT_LYRIC_ROW_INDEX,
  currentLyricRowIndex
})

export const switchSongAction = tag => {
  return (dispatch, getState) => {
    const playList = getState().player.get("playList")
    const playStrategy = getState().player.get("playStrategy")
    const currentSongIndex = getState().player.get("currentSongIndex")
    let nextSongIndex = -1

    switch (playStrategy) {
      case 1: // 随机播放
        let randomIndex = getRandomNumber(playList.length)
        while (randomIndex === currentSongIndex) { // 如果随机到下一个依然是当前歌曲，再继续随机，一直到下一首是新的歌曲为止
          randomIndex = getRandomNumber(playList.length)
        }
        nextSongIndex = randomIndex
        break
      default: // 顺序播放
        nextSongIndex = currentSongIndex + tag
        if (nextSongIndex >= playList.length) {
          nextSongIndex = 0 // 处于最后一首时，切换下一首跳到第一首
        }
        if (nextSongIndex < 0) {
          nextSongIndex = playList.length - 1 // 处于第一首时，切换上一首跳到最后一首
        }
    }

    const nextSong = playList[nextSongIndex]
    dispatch(changeCurrentSongIndexAction(nextSongIndex))
    dispatch(changeCurrentSongAction(nextSong))

    // 取歌词
    dispatch(getLyricAction(nextSong.id))
  }
}

export const getSongDetailAction = (ids) => {
  // getSongDetailAction只是返回一个函数，函数的参数又是一个函数，名字叫dispatch，这个dispatch最终会被react-redux调用
  return (dispatch, getState) => {// 注意getState是一个函数
    const playList = getState().player.get("playList")
    const songIndex = playList.findIndex(song => song.id === ids)

    if (songIndex > 0) {// 当前歌曲已经在播放列表中
      dispatch(changeCurrentSongIndexAction(songIndex))
      const song = playList[songIndex]
      dispatch(changeCurrentSongAction(song))
    } else {
      // 播放列表中没有此歌曲，发送请求取歌曲信息
      getSongDetail(ids).then(res => {
        console.log(res)
        const song = res.data.songs && res.data.songs[0]
        if (!song) {
          return
        }

        // 将此新歌曲添加到播放列表中
        const newPlayList = [...playList]
        newPlayList.push(song)

        // 更新各个值
        dispatch(changePlayListAction(newPlayList))
        dispatch(changeCurrentSongIndexAction(newPlayList.length - 1))
        dispatch(changeCurrentSongAction(song))
      })
    }

    // 取歌词
    dispatch(getLyricAction(ids))
  }
}

export const getLyricAction = id => {
  return dispatch => {
    getLyric(id).then(res => {
      console.log("lyric", res)
      const lyricArr = parseLyric(res.data.lrc.lyric)
      dispatch(changeLyricAction(lyricArr))
    })
  }
}