import { getSongDetail } from '../../../services/player'

import * as actionTypes from './constants'

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
        const song = res.data.songs[0]
        const newPlayList = [...playList]
        newPlayList.push(song)
        dispatch(changePlayListAction(newPlayList))
        dispatch(changeCurrentSongIndexAction(newPlayList.length - 1))
        dispatch(changeCurrentSongAction(song))
      })
    }

  }
}